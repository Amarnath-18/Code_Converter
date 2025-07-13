const express = require('express');
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Google Gemini AI - delay initialization to ensure env vars are loaded
let genAI = null;

const getGeminiInstance = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};


// AI-powered code conversion using Google Gemini

// AI-powered code conversion with streaming using Google Gemini
const convertCodeWithAIStream = async (sourceCode, sourceLang, targetLang, res) => {
  try {
    // Get the Gemini instance (lazy initialization)
    const geminiAI = getGeminiInstance();

    // Get the generative model for streaming
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert code converter. Convert the following ${sourceLang} code to ${targetLang}.

Rules:
1. Provide ONLY the converted code, no explanations
2. Maintain the same functionality and logic
3. Follow ${targetLang} best practices and conventions
4. Do not include markdown formatting or code blocks
5. Preserve comments but translate them to ${targetLang} comment style

Source ${sourceLang} code:
${sourceCode}

Convert to ${targetLang}:`;

    // Set up streaming headers
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // Generate content with streaming
    const result = await model.generateContentStream(prompt);
    let fullContent = '';

    // Process each chunk as it arrives
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        fullContent += chunkText;
        
        // Clean the chunk and send it
        let cleanChunk = chunkText.replace(/```[\w]*\n/g, '').replace(/```/g, '');
        cleanChunk = cleanChunk.replace(/^\s*```.*$/gm, '');
        
        // Send the chunk to the client
        res.write(cleanChunk);
      }
    }

    // End the response
    res.end();
    
    return fullContent;
  } catch (error) {
    console.error('Gemini API streaming error:', error);
    
    // Send error through the stream
    res.write(`\n\n// Error: ${error.message}\n`);
    res.end();
    
    throw error;
  }
};

// @route   POST /api/converter/convert
// @desc    Convert code with streaming response using Gemini AI
// @access  Private
router.post('/convert', auth, async (req, res) => {
  try {
    const { sourceCode, sourceLang, targetLang } = req.body;

    // Validation
    if (!sourceCode || !sourceLang || !targetLang) {
      return res.status(400).json({ 
        message: 'Source code, source language, and target language are required' 
      });
    }

    if (sourceLang === targetLang) {
      return res.status(400).json({ 
        message: 'Source and target languages cannot be the same' 
      });
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: 'Gemini AI service not configured. Please contact administrator.' 
      });
    }

    // Convert the code using Gemini AI with streaming
    await convertCodeWithAIStream(sourceCode, sourceLang, targetLang, res);

  } catch (error) {
    console.error('Code conversion streaming error:', error);
    
    // If response hasn't been sent yet, send error
    if (!res.headersSent) {
      if (error.message.includes('API key')) {
        return res.status(500).json({ 
          message: 'Gemini AI service authentication failed' 
        });
      }
      
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return res.status(429).json({ 
          message: 'Gemini AI service quota exceeded. Please try again later.' 
        });
      }
      
      res.status(500).json({ 
        message: 'An error occurred during AI code conversion. Please try again.' 
      });
    }
  }
});

// @route   GET /api/converter/languages
// @desc    Get supported languages (Gemini AI supports all languages)
// @access  Private
router.get('/languages', auth, (req, res) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript', supported: true },
    { value: 'python', label: 'Python', supported: true },
    { value: 'java', label: 'Java', supported: true },
    { value: 'cpp', label: 'C++', supported: true },
    { value: 'csharp', label: 'C#', supported: true },
    { value: 'php', label: 'PHP', supported: true },
    { value: 'ruby', label: 'Ruby', supported: true },
    { value: 'go', label: 'Go', supported: true },
    { value: 'rust', label: 'Rust', supported: true },
    { value: 'swift', label: 'Swift', supported: true },
    { value: 'kotlin', label: 'Kotlin', supported: true },
    { value: 'typescript', label: 'TypeScript', supported: true },
    { value: 'scala', label: 'Scala', supported: true },
    { value: 'r', label: 'R', supported: true },
    { value: 'matlab', label: 'MATLAB', supported: true },
    { value: 'sql', label: 'SQL', supported: true },
    { value: 'html', label: 'HTML', supported: true },
    { value: 'css', label: 'CSS', supported: true },
    { value: 'bash', label: 'Bash', supported: true },
    { value: 'powershell', label: 'PowerShell', supported: true }
  ];

  res.json({
    message: 'All languages supported with Gemini AI-powered conversion',
    languages,
    aiPowered: true,
    aiProvider: 'Google Gemini'
  });
});

// @route   GET /api/converter/test
// @desc    Test Gemini AI connection
// @access  Private
router.get('/test', auth, async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: 'Gemini API key not configured',
        success: false 
      });
    }

    // Simple test with Gemini using the same model as the main converter
    const geminiAI = getGeminiInstance();
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    
    res.json({
      message: 'Gemini AI connection successful',
      success: true,
      testResponse: response.text().trim(),
      apiProvider: 'Google Gemini',
      model: 'gemini-1.5-flash'
    });
    
  } catch (error) {
    console.error('Gemini test error:', error);
    res.status(500).json({
      message: 'Gemini AI connection failed',
      success: false,
      error: error.message,
      details: {
        status: error.status,
        code: error.code
      }
    });
  }
});

module.exports = router;
