

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, Play, Copy, Check, Home, Star, Clock, Users, Eye, EyeOff, Code, Lightbulb, AlertCircle, Trophy, ChevronDown, ChevronUp } from 'lucide-react';

const CourseContentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set([0]));
  const [showHint, setShowHint] = useState(false);

  const course = {
    title: "React Fundamentals",
    description: "Master React components, hooks, and state management",
    totalLessons: 12,
    duration: "8 hours",
    level: "Beginner",
    students: 15420
  };

  const lessons = [
    {
      id: 0,
      title: "Introduction to React",
      duration: "15 min",
      type: "lesson",
      sections: [
        {
          type: "content",
          title: "What is React?",
          content: `React is a popular JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta), React has revolutionized how developers think about building interactive UIs.

**Key Features of React:**
- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updates and rendering
- **Declarative**: Describe what the UI should look like for any given state
- **Learn Once, Write Anywhere**: Use React for web, mobile, and desktop applications`
        },
        {
          type: "info",
          title: "Why Learn React?",
          content: `React is one of the most in-demand skills in web development today. Here's why:

• **High Demand**: React developers are among the most sought-after in the job market
• **Versatile**: Use React for web apps, mobile apps (React Native), and even desktop apps
• **Strong Community**: Large ecosystem with extensive resources and third-party libraries
• **Backed by Meta**: Continuous development and long-term support guaranteed`
        },
        {
          type: "code",
          title: "Your First React Component",
          language: "jsx",
          content: `import React from 'react';

// A simple React component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
function App() {
  return (
    <div>
      <Welcome name="Sarah" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

export default App;`,
          explanation: "This example shows a simple React component that takes a 'name' prop and displays a greeting. Notice how we can reuse the same component with different props."
        },
        {
          type: "tip",
          content: "Components are the building blocks of React applications. Start thinking in components - break your UI into small, reusable pieces!"
        }
      ]
    },
    {
      id: 1,
      title: "JSX Syntax",
      duration: "20 min",
      type: "lesson",
      sections: [
        {
          type: "content",
          title: "Understanding JSX",
          content: `JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code directly in your JavaScript files.

**Key Points about JSX:**
- JSX is not HTML - it's a syntax extension for JavaScript
- It gets compiled to regular JavaScript function calls
- You can embed JavaScript expressions using curly braces {}
- JSX elements must have a closing tag or be self-closing`
        },
        {
          type: "code",
          title: "JSX Examples",
          language: "jsx",
          content: `// JSX allows you to write HTML-like syntax in JavaScript
const element = <h1>Hello, World!</h1>;

// You can embed JavaScript expressions in JSX
const name = 'John';
const greeting = <h1>Hello, {name}!</h1>;

// JSX can contain multiple elements (must be wrapped in a parent)
const content = (
  <div>
    <h1>Welcome to React</h1>
    <p>Let's learn JSX together!</p>
    <button onClick={() => alert('Clicked!')}>
      Click me!
    </button>
  </div>
);

// JSX attributes use camelCase
const styledElement = (
  <div 
    className="container" 
    style={{backgroundColor: 'blue', color: 'white'}}
  >
    Styled content
  </div>
);`,
          explanation: "JSX makes React components more readable and allows you to use familiar HTML-like syntax while having the full power of JavaScript."
        }
      ]
    },
    {
      id: 2,
      title: "Components & Props",
      duration: "25 min",
      type: "lesson",
      sections: [
        {
          type: "content",
          title: "React Components",
          content: `Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

**Two Types of Components:**
- **Function Components**: Simple functions that return JSX
- **Class Components**: ES6 classes that extend React.Component (legacy approach)

**Props (Properties):**
Props are how you pass data from parent to child components. They are read-only and help make components reusable.`
        },
        {
          type: "code",
          title: "Function Component with Props",
          language: "jsx",
          content: `// UserCard component that accepts props
function UserCard({ name, email, avatar, isOnline }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <div className="user-info">
        <h3>{name}</h3>
        <p>{email}</p>
        <span className={isOnline ? 'online' : 'offline'}>
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </span>
      </div>
    </div>
  );
}

// Using the UserCard component
function UserList() {
  return (
    <div>
      <UserCard 
        name="Alice Johnson"
        email="alice@example.com"
        avatar="/avatars/alice.jpg"
        isOnline={true}
      />
      <UserCard 
        name="Bob Smith"
        email="bob@example.com"
        avatar="/avatars/bob.jpg"
        isOnline={false}
      />
    </div>
  );
}`,
          explanation: "This example shows how to create a reusable UserCard component that accepts props for customization. The same component can display different users with different data."
        }
      ]
    }
  ];

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const navigateLesson = (direction) => {
    if (direction === 'next' && currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      markLessonComplete(currentLesson + 1);
    } else if (direction === 'prev' && currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const currentLessonData = lessons[currentLesson];
  const progress = ((completedLessons.size) / lessons.length) * 100;

  const SectionRenderer = ({ section, index }) => {
    switch (section.type) {
      case 'content':
        return (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="prose prose-lg max-w-none">
              {section.content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-gray-700 mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('•')) {
                  return (
                    <li key={i} className="text-gray-600 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  );
                } else if (paragraph.startsWith('-')) {
                  return (
                    <li key={i} className="text-gray-600 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-800">{section.title}</h3>
            </div>
            <div className="text-blue-700">
              {section.content.split('\n').map((line, i) => {
                if (line.startsWith('•')) {
                  return (
                    <li key={i} className="ml-4 mb-1">
                      {line.substring(2)}
                    </li>
                  );
                } else if (line.trim()) {
                  return <p key={i} className="mb-2">{line}</p>;
                }
                return null;
              })}
            </div>
          </div>
        );

      case 'code':
        const codeId = `code-${index}`;
        return (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                <span className="text-gray-300 text-sm font-medium">{section.language}</span>
                <button
                  onClick={() => copyToClipboard(section.content, codeId)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  {copiedCode === codeId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === codeId ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-gray-300 overflow-x-auto text-sm">
                <code>{section.content}</code>
              </pre>
            </div>
            {section.explanation && (
              <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{section.explanation}</p>
              </div>
            )}
          </div>
        );

      case 'tip':
        return (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">{section.content}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white shadow-lg flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 truncate">{course.title}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.totalLessons} lessons
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLesson(index)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                currentLesson === index ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {completedLessons.has(index) ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                    <span className="text-sm text-gray-500">Lesson {index + 1}</span>
                  </div>
                  <h3 className={`font-medium ${currentLesson === index ? 'text-blue-700' : 'text-gray-800'}`}>
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4" />
                <span>/</span>
                <span>Courses</span>
                <span>/</span>
                <span className="text-gray-800">{course.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500 mb-2 block">
                    Lesson {currentLesson + 1} of {lessons.length}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentLessonData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {currentLessonData.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()} students
                    </div>
                  </div>
                </div>
                
                {!completedLessons.has(currentLesson) && (
                  <button
                    onClick={() => markLessonComplete(currentLesson)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4 inline mr-2" />
                    Mark Complete
                  </button>
                )}
              </div>
            </div>

            {/* Lesson Sections */}
            <div className="space-y-6">
              {currentLessonData.sections.map((section, index) => (
                <SectionRenderer key={index} section={section} index={index} />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={() => navigateLesson('prev')}
                disabled={currentLesson === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  currentLesson === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Lesson
              </button>

              <button
                onClick={() => navigateLesson('next')}
                disabled={currentLesson === lessons.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  currentLesson === lessons.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next Lesson
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;