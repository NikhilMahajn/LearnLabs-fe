import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Menu, X, BookOpen, Copy, Check,
  Home, Star, Clock, Users, Lightbulb, AlertCircle
} from 'lucide-react';
import { live_url } from '../App';
import { useParams } from 'react-router-dom';

const CourseContentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set([0]));
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const [course, setCourse] = useState({
    title: "Default Course",
    description: "Default course description",
    totalLessons: 12,
    duration: "8 hours",
    level: "Beginner",
  });

  const [chapters, setChapterList] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetch_course_by_id(course_id) {
      const data = await fetch(`${live_url}/course/${course_id}`);
      const jsonData = await data.json();
      setCourse(jsonData);
    }
    fetch_course_by_id(id);
  }, [id]);

  // First effect: Fetch chapters
useEffect(() => {
  async function fetch_chapters(course_id) {
    try {
      const data = await fetch(`${live_url}/course/chapters/${course_id}`);
      const jsonData = await data.json();
      setChapterList(jsonData);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setLoading(false);
    }
  }
  
  fetch_chapters(id);
}, [id]);

// Second effect: Fetch sections when chapters are loaded
useEffect(() => {
  async function fetch_sections() {
    if (chapters && chapters.length > 0 && chapters[currentLesson]) {
      try {
        console.log(chapters[currentLesson]);
        const chapter_data = await fetch(`${live_url}/course/chapters/${chapters[currentLesson].id}/sections`);
        const chapter_json = await chapter_data.json();
        setLessons(chapter_json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setLoading(false);
      }
    }
  }
  
  fetch_sections();
}, [chapters, currentLesson]); // Runs when chapters or currentLesson changes

  const progress = lessons.length > 0 ? ((completedLessons.size) / lessons.length) * 100 : 0;
  const currentLessonData = lessons[currentLesson] || null;

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
                } else if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
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

  // ✅ Guard: show loader if no lesson available yet
  if (loading || !currentLessonData) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

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
          {chapters.map((lesson, index) => (
            <button
              key={lesson.id || index}
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
                  <p className="text-sm text-gray-500">{lesson.estimated_duration}</p>
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
                      {10} students
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
              {lessons.map((section, index) => (
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
