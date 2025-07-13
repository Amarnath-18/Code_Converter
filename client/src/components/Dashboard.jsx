import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MdCode, 
  MdAutoAwesome, 
  MdSpeed, 
  MdSecurity,
  MdCloud,
  MdIntegrationInstructions,
  MdArrowForward
} from 'react-icons/md';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      icon: <MdAutoAwesome className="w-8 h-8" />,
      title: "AI-Powered Conversion",
      description: "Convert code between languages with advanced AI assistance and smart suggestions."
    },
    {
      icon: <MdSpeed className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant results with our optimized conversion engine and real-time preview."
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your code is processed securely with enterprise-grade encryption and privacy."
    },
    {
      icon: <MdCloud className="w-8 h-8" />,
      title: "Cloud Integration",
      description: "Save and sync your conversions across devices with cloud storage integration."
    },
    {
      icon: <MdIntegrationInstructions className="w-8 h-8" />,
      title: "Smart Suggestions",
      description: "Get intelligent code suggestions and best practices recommendations."
    },
    {
      icon: <MdCode className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Support for 20+ programming languages with syntax highlighting and validation."
    }
  ];

  const stats = [
    { label: "Languages Supported", value: "20+" },
    { label: "Conversions Completed", value: "50K+" },
    { label: "Active Users", value: "5K+" },
    { label: "Success Rate", value: "99.9%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                <MdCode className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to <span className="text-blue-600 dark:text-blue-400">CodeCraft Pro</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your code across programming languages with the power of AI. 
              Experience seamless conversion with intelligent suggestions and real-time validation.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welcome, {user?.name}!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {user?.email}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                User ID: {user?.id}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/converter"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-4 px-8 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center text-lg"
              >
                <MdCode className="w-6 h-6 mr-2" />
                Start Converting Code
                <MdArrowForward className="w-5 h-5 ml-2" />
              </Link>
              
              <button
                onClick={logout}
                className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-medium py-4 px-8 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to convert, optimize, and enhance your code across multiple programming languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Code?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust CodeCraft Pro for their code conversion needs.
          </p>
          <Link 
            to="/converter"
            className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-4 px-8 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 inline-flex items-center text-lg"
          >
            <MdCode className="w-6 h-6 mr-2" />
            Get Started Now
            <MdArrowForward className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
