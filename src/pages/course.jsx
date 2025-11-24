import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Menu, X, BookOpen, Copy, Check,
  Home, Star, Clock, Users, Lightbulb, AlertCircle
} from 'lucide-react';
import { live_url } from '../App';
import { useParams } from 'react-router-dom';
import SectionRenderer from '../components/course/CourseContent';
import { useAuth } from '../context/authContext';
import api from '../api/axios';

const CourseContentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([]));
  const [loading, setLoading] = useState(true);
  const [chapters, setChapterList] = useState([]);
  const [lessons, setLessons] = useState([]);

  const { id } = useParams();

  const [course, setCourse] = useState({
    title: "Default Course",
    description: "Default course description",
    totalLessons: 12,
    duration: "8 hours",
    level: "Beginner",
  })

  const topRef = useRef(null)
  const {isAuthenticated,user_id} = useAuth();

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const res = await api.get(`/course/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (id) fetchCourseById();
  }, [id]);

  useEffect(() => {
    async function fetch_chapters(course_id) {
      try {
        const res = await api.get(`${live_url}/course/chapters/${course_id}`);
        setChapterList(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setLoading(false);
      }
    }

    fetch_chapters(id); 

    const interval = setInterval(() => {
      fetch_chapters(id);
    }, 30000); 

    return () => clearInterval(interval);
  }, [id]); 

  useEffect(() => {
    async function fetch_sections() {
      if (chapters && chapters.length > 0 && chapters[currentLesson]) {
        try {
          const res = await api.get(`${live_url}/course/chapters/${chapters[currentLesson].id}/sections`);
          setLessons(res.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sections:', error);
          setLoading(false);
        }
      }
    }
    
    fetch_sections();
  }, [chapters, currentLesson]); // Runs when chapters or currentLesson changes

  // Set completed chapters

  useEffect(() => {
  async function fetchCompleted() {
    if (!isAuthenticated) return;

    try {
      const res = await api.get(`${live_url}/progress/get-progress`,{
        params: {
          user_id: user_id,
          course_id: id
        }
      });
            
      const completedSet = new Set(res.data.map(item => item.chapter_id));

      setCompletedLessons(completedSet);
    } catch (e) {
      console.log("Error fetching completed: ", e);
    }
  }

  fetchCompleted();
}, [isAuthenticated, id, user_id]);


  const progress = lessons.length > 0 ? ((completedLessons.size) / lessons.length) * 100 : 0;
  const currentLessonData = lessons[currentLesson] || null;


  const markLessonComplete = async (lessonId) => {
    if (!isAuthenticated) {
      alert("Please login to save progress");
      return;
    }

    const chapterId = chapters[lessonId].id;

    setCompletedLessons(prev => new Set([...prev, chapterId]));

    try {
      await api.post(`${live_url}/progress/save`, {
        user_id: user_id,
        course_id: course.id,
        chapter_id: chapterId,
        status: true
      });
      } catch (error) {
          console.error("Error saving progress: ", error);
      }
    };


  const navigateLesson = (direction) => {
    if (direction === 'next' && currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      markLessonComplete(currentLesson);
    } else if (direction === 'prev' && currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
    topRef.current?.scrollIntoView();
  };

  

  if (loading || !currentLessonData) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
    {/* Sidebar */}
    <div 
      className={`${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  } fixed lg:relative z-30 w-80 transition-transform duration-300 bg-white shadow-lg flex flex-col h-screen`}
    >
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate pr-2">
            {course.title}
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
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

        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{course.duration / 60} Hrs</span>
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((lesson, index) => (
          <button
            key={lesson.id || index}
            onClick={() => {
              setCurrentLesson(index);
              // Close sidebar on mobile after selecting lesson
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
            className={`w-full text-left p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
              currentLesson === index ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {completedLessons.has(lesson.id) ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm text-gray-500 block mb-1">
                  Lesson {index + 1}
                </span>
                <h3 className={`text-sm sm:text-base font-medium mb-1 ${
                  currentLesson === index ? 'text-blue-700' : 'text-gray-800'
                }`}>
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{lesson.estimated_duration} Minutes</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Overlay for mobile */}
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      ></div>
    )}

    {/* Main Content */}
    <div className="flex-1 flex flex-col min-w-0" >
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-3 sm:p-4 flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs - hide on very small screens */}
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-hidden">
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="flex-shrink-0">/</span>
              <span className="flex-shrink-0">Courses</span>
              <span className="flex-shrink-0">/</span>
              <span className="text-gray-800 truncate">{course.title}</span>
            </div>
            
            {/* Mobile title - show only on small screens */}
            <div className="sm:hidden text-sm font-medium text-gray-800 truncate">
              {course.title}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="p-2 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="flex-1 overflow-y-auto">
        <div ref={topRef}></div>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Lesson Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <span className="text-xs sm:text-sm text-gray-500 mb-2 block">
                  Lesson {currentLesson + 1} of {lessons.length}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {currentLessonData.title}
                </h1>
                <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>10 students</span>
                  </div>
                </div>
              </div>

              {!completedLessons.has(chapters[currentLesson].id) && (
                <button
                  onClick={() => markLessonComplete(currentLesson)}
                  className="w-full lg:w-auto px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>

          {/* Lesson Sections */}
          <div className="space-y-4 sm:space-y-6">
            {lessons.map((section, index) => (
              <SectionRenderer key={index} section={section} index={index} />
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigateLesson('prev')}
                disabled={currentLesson === 0}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base order-1 ${
                  currentLesson === 0
                    ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                    : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                <span className="hidden xs:inline">Previous Lesson</span>
                <span className="xs:hidden">Previous</span>
              </button>

              {/* Progress indicator - visible on tablet and desktop */}
              <div className="hidden sm:flex items-center justify-center text-sm text-gray-500 order-2">
                <span className="font-medium">{currentLesson + 1}</span>
                <span className="mx-2">/</span>
                <span>{lessons.length}</span>
              </div>

              <button
                onClick={() => navigateLesson('next')}
                disabled={currentLesson === lessons.length - 1}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-medium order-3 ${
                  currentLesson === lessons.length - 1
                    ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                <span className="hidden xs:inline">Next Lesson</span>
                <span className="xs:hidden">Next</span>
                <ChevronRight className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CourseContentPage;
