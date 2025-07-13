# 🚀 AI-Powered Code Converter - MERN Stack Application

A modern, full-stack MERN application that converts code between 20+ programming languages using Google Gemini AI. Features enterprise-level authentication, beautiful UI with dark mode, and a VS Code-like editor experience.

## 🌟 Key Features

### 🤖 AI-Powered Code Conversion
- **Google Gemini AI Integration**: Intelligent code conversion with context understanding
- **20+ Programming Languages**: JavaScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, TypeScript, Scala, R, MATLAB, SQL, HTML, CSS, Bash, PowerShell
- **Real-time Streaming**: Live code conversion with streaming responses
- **Smart Context Analysis**: AI understands code structure and maintains functionality
- **Error Handling**: Comprehensive error detection and user feedback

### 🎨 Professional Monaco Editor
- **VS Code Experience**: Full-featured Monaco Editor (same as VS Code)
- **Syntax Highlighting**: Advanced syntax highlighting for all supported languages
- **IntelliSense & Autocomplete**: Smart code suggestions and autocomplete
- **Multiple Themes**: Light, Dark, and High Contrast modes
- **Advanced Features**: 
  - Bracket pair colorization
  - Code folding and minimap
  - Find & replace functionality
  - Font size adjustment
  - Copy and download converted code

### 🔐 Secure Authentication System
- **JWT-based Authentication**: Secure token-based user authentication
- **Password Encryption**: bcryptjs for secure password hashing
- **Input Validation**: Express-validator for robust form validation
- **Protected Routes**: Middleware-protected API endpoints
- **MongoDB Integration**: User data stored securely in MongoDB

### 🎯 Modern User Interface
- **Dark/Light Mode Toggle**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional Dashboard**: Modern welcome page with feature showcase
- **Enhanced Forms**: Beautiful authentication forms with icons and validation
- **Smooth Animations**: Tailwind CSS transitions and hover effects
- **React Icons**: Comprehensive icon library integration

### 🛡️ Enterprise-Level Features
- **Context API State Management**: Centralized theme and authentication state
- **Route Protection**: Public and private route management
- **Error Boundaries**: Comprehensive error handling and user feedback
- **localStorage Persistence**: Theme and user preferences saved locally
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Variables**: Secure API key and configuration management

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0**: Latest React with modern hooks and features
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with dark mode support
- **Monaco Editor**: VS Code's editor for web applications
- **React Router DOM**: Client-side routing and navigation
- **React Icons**: Beautiful icon library
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database for user data
- **Mongoose**: Elegant MongoDB object modeling
- **Google Gemini AI**: Advanced AI for code conversion
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing library
- **CORS**: Cross-origin resource sharing middleware

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Autoprefixer
- **Nodemon**: Auto-restart development server
- **Environment Variables**: Secure configuration management

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MernTrainiing
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   Create `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

5. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📱 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Access Code Converter**: Navigate to the code converter from the dashboard
3. **Select Languages**: Choose source and target programming languages
4. **Enter Code**: Write or paste code in the Monaco editor
5. **Convert**: Click convert to get AI-powered code translation
6. **Download/Copy**: Save or copy the converted code

## 🎨 Features in Detail

### Theme System
- Automatic system theme detection on first visit
- Persistent theme storage in localStorage
- Smooth transitions between light and dark modes
- Consistent theming across all components

### Code Conversion
- Supports 20+ programming languages
- Maintains code structure and functionality
- Handles complex code patterns and libraries
- Provides explanations for converted code
- Real-time streaming for large code blocks

### Security
- JWT token authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Protected API routes
- Secure CORS configuration

## 🔧 Build & Deployment

### Development
```bash
# Client development server
npm run dev

# Server development with auto-restart
npm run dev
```

### Production Build
```bash
# Build client for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using MERN Stack and Google Gemini AI**
