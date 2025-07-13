import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Editor from '@monaco-editor/react';
import { 
  MdSwapHoriz, 
  MdContentCopy, 
  MdDownload, 
  MdClear,
  MdPlayArrow,
  MdCode,
  MdAutoAwesome
} from 'react-icons/md';

const CodeConverter = () => {
  const [sourceCode, setSourceCode] = useState('// Enter your code here\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}');
  const [convertedCode, setConvertedCode] = useState('');
  const [sourceLang, setSourceLang] = useState('javascript');
  const [targetLang, setTargetLang] = useState('python');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fontSize] = useState(14);

  useAuth(); // Ensure user is authenticated
  const { isDark } = useTheme();

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'scala', label: 'Scala' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' }
  ];

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setError('Please enter some code to convert');
      return;
    }

    if (sourceLang === targetLang) {
      setError('Source and target languages cannot be the same');
      return;
    }

    setLoading(true);
    setError('');
    setConvertedCode('');

    try {
      const response = await fetch('http://localhost:5000/api/converter/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({
          sourceCode,
          sourceLang,
          targetLang
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to convert code');
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedCode = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedCode += chunk;
        
        // Update the converted code in real-time
        setConvertedCode(accumulatedCode);

        // Small delay to make the streaming visible
        await new Promise(resolve => setTimeout(resolve, 30));
      }

    } catch (error) {
      console.error('Conversion error:', error);
      setError(error.message || 'Failed to convert code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSourceCode('');
    setConvertedCode('');
    setError('');
  };

  const handleSwapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    if (convertedCode) {
      setSourceCode(convertedCode);
      setConvertedCode('');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadCode = (code, filename) => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadExample = () => {
    const examples = {
      javascript: `// JavaScript Example
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log(doubled);`,
      
      python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(doubled)`,
      
      java: `// Java Example
public class Example {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`
    };
    
    setSourceCode(examples[sourceLang] || examples.javascript);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Code Converter
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Convert code between programming languages with AI-powered streaming
            </p>
          </div>

          {/* Language Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Source Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapLanguages}
                  className="flex items-center px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  title="Swap languages"
                >
                  <MdSwapHoriz className="w-6 h-6" />
                </button>
              </div>

              {/* Target Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={loadExample}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <MdCode className="w-4 h-4 mr-2" />
                Load Example
              </button>
              
              <button
                onClick={handleClear}
                className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <MdClear className="w-4 h-4 mr-2" />
                Clear
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Code Editors */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Source Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <MdCode className="w-5 h-5 mr-2" />
                  Source ({languages.find(l => l.value === sourceLang)?.label})
                </h3>
                <button
                  onClick={() => copyToClipboard(sourceCode)}
                  className="flex items-center px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <MdContentCopy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              </div>
              <div className="h-96">
                <Editor
                  height="100%"
                  language={sourceLang === 'cpp' ? 'cpp' : sourceLang}
                  value={sourceCode}
                  onChange={(value) => setSourceCode(value || '')}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: true },
                    wordWrap: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                  }}
                />
              </div>
            </div>

            {/* Converted Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <MdAutoAwesome className="w-5 h-5 mr-2" />
                  Converted ({languages.find(l => l.value === targetLang)?.label})
                  {loading && (
                    <span className="ml-2 flex items-center">
                      <div className="animate-pulse h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Converting...</span>
                    </span>
                  )}
                </h3>
                <div className="flex space-x-2">
                  {convertedCode && (
                    <>
                      <button
                        onClick={() => copyToClipboard(convertedCode)}
                        className="flex items-center px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      >
                        <MdContentCopy className="w-4 h-4 mr-1" />
                        Copy
                      </button>
                      <button
                        onClick={() => downloadCode(convertedCode, `converted.${targetLang === 'cpp' ? 'cpp' : targetLang}`)}
                        className="flex items-center px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                      >
                        <MdDownload className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="h-96 relative">
                <Editor
                  height="100%"
                  language={targetLang === 'cpp' ? 'cpp' : targetLang}
                  value={convertedCode || '// Converted code will appear here...'}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: true },
                    wordWrap: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    readOnly: true,
                    smoothScrolling: true,
                  }}
                />
                {loading && (
                  <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 bg-opacity-90 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                      <div className="text-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium block">
                          Converting code...
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Watch the magic happen!
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleConvert}
              disabled={loading || !sourceCode.trim()}
              className="flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg mx-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Converting...
                </>
              ) : (
                <>
                  <MdPlayArrow className="w-6 h-6 mr-2" />
                  Convert Code
                </>
              )}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {loading ? 
                'Watch your code transform in real-time!' : 
                'AI-powered conversion with real-time streaming'
              }
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MdAutoAwesome className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced AI understands your code and converts it accurately.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MdCode className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Editor</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional code editor with syntax highlighting and IntelliSense.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MdPlayArrow className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">Watch your code convert live with streaming technology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeConverter;