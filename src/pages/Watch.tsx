import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import type { Lecture, ApiResponse, Question, QuizResult } from "../types";
import { ChevronLeft, MessageSquare, GraduationCap, ListVideo } from "lucide-react";
import { Skeleton } from "../components/ui/Skeleton";

export default function Watch() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [activeTab, setActiveTab] = useState<"qna" | "quiz">("qna");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    api
      .get<ApiResponse<Lecture>>(`/lectures/${lectureId}`)
      .then((res) => setLecture(res.data.data))
      .catch((err) => console.error("API Error:", err));
  }, [lectureId]);

if (!lecture)
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col">
      {/* Skeleton Top Nav */}
      <div className="h-16 border-b border-white/5 flex items-center px-6 gap-4">
        <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
        <div className="space-y-2">
          <Skeleton className="h-2 w-20 bg-white/5" />
          <Skeleton className="h-4 w-48 bg-white/5" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Skeleton */}
        <div className="flex-1 bg-black">
          <div className="w-full aspect-video bg-white/5 animate-pulse flex items-center justify-center">
             <ListVideo className="w-12 h-12 text-white/10" />
          </div>
          <div className="p-10 space-y-6">
            <Skeleton className="h-10 w-1/3 bg-white/5" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-2/3 bg-white/5" />
            </div>
          </div>
        </div>

        {/* Right: Sidebar Skeleton */}
        <div className="w-full lg:w-100 bg-[#0e0e11] border-l border-white/5 p-8 space-y-8">
           <div className="flex gap-4 border-b border-white/5 pb-6">
              <Skeleton className="h-8 flex-1 bg-white/5" />
              <Skeleton className="h-8 flex-1 bg-white/5" />
           </div>
           <Skeleton className="h-32 w-full bg-white/5 rounded-2xl" />
           <Skeleton className="h-12 w-full bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );

  const startQuiz = async () => {
    try {
      const res = await api.get<ApiResponse<Question[]>>(
        `/lectures/${lectureId}/questions`
      );
      setQuestions(res.data.data);
      setQuizStarted(true);
      setResult(null);
    } catch (err) {
      console.error("Failed to load questions");
    }
  };

  const submitQuiz = async () => {
    try {
      const res = await api.post<ApiResponse<QuizResult>>(`/quiz/submit`, {
        lecture_id: lectureId,
        answers: selectedAnswers,
      });
      setResult(res.data.data);
      setQuizStarted(false);
    } catch (err) {
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      {/* 1. COMPACT TOP NAV */}
      <nav className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0c] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            to={`/course/${lecture.course_id}`}
            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="hidden sm:block h-8 w-px bg-white/10 mx-2"></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-0.5">
              Session Recording
            </p>
            <h1 className="text-sm font-bold truncate max-w-50 md:max-w-md">
              {lecture.title}
            </h1>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* 2. MAIN CONTENT: VIDEO PLAYER */}
        <div className="flex-1 bg-black flex flex-col overflow-y-auto custom-scrollbar">
          {/* PLAYER WRAPPER */}
          <div className="w-full bg-black relative aspect-video shadow-2xl group">
            <iframe
              src={`https://drive.google.com/file/d/${lecture.gdrive_id}/preview`}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="autoplay"
            ></iframe>

                <div 
      className="absolute top-0 right-0 w-40 h-16 bg-transparent z-20" 
      onContextMenu={(e) => e.preventDefault()}
      title="External links disabled"
    ></div>

 



             {/* <div 
      className="absolute top-0 right-0 w-full h-20 z-10 bg-transparent" 
      onContextMenu={(e) => e.preventDefault()}
    ></div>

     <div 
      className="absolute inset-0 z-0 bg-transparent"
      onContextMenu={(e) => e.preventDefault()}
    ></div> */}
          </div>

          <div className="p-8 md:p-12 max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-600/20">
                HD Recording
              </span>
              <span className="text-slate-500 text-xs font-bold">
                {lecture.duration} Total Duration
              </span>
            </div>
            <h2 className="text-3xl font-black mb-6 tracking-tight text-white">
              {lecture.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-400 leading-relaxed text-lg italic border-l-2 border-indigo-600 pl-6">
                {
                  "Welcome to this session. Please have your study materials ready. You can participate in the discussion or take the module quiz using the sidebar tabs."
                }
              </p>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SIDEBAR */}
        <div className="w-full lg:w-100 bg-[#0e0e11] border-l border-white/5 flex flex-col h-full lg:h-auto">
          {/* Tabs Navigation */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab("qna")}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                activeTab === "qna"
                  ? "text-indigo-400 bg-white/5 border-b-2 border-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Discussion
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                activeTab === "quiz"
                  ? "text-indigo-400 bg-white/5 border-b-2 border-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Module Quiz
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "quiz" ? (
              <div className="h-full">
                {!quizStarted && !result && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-600/20">
                      <GraduationCap className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Test Your Knowledge
                    </h3>
                    <p className="text-xs text-slate-500 mb-8 px-6 leading-relaxed">
                      Assess your understanding of the topics covered in this
                      lecture.
                    </p>
                    <button
                      onClick={startQuiz}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
                    >
                      Begin Assessment
                    </button>
                  </div>
                )}

                {/* If Quiz is in progress (Mapped from your previous logic) */}
                {quizStarted && questions.length > 0 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Question logic here... */}
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                      <span>Progress</span>
                      <span className="text-indigo-400">
                        {Math.round(
                          ((currentQuestionIndex + 1) / questions.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <h4 className="text-lg font-bold leading-snug">
                      {questions[currentQuestionIndex].question_text}
                    </h4>
                    <div className="space-y-3">
                      {questions[currentQuestionIndex].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [questions[currentQuestionIndex].id]: option.id,
                            })
                          }
                          className={`w-full text-left p-5 rounded-2xl border text-sm font-bold transition-all ${
                            selectedAnswers[
                              questions[currentQuestionIndex].id
                            ] === option.id
                              ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                              : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          {option.option_text}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={
                        currentQuestionIndex < questions.length - 1
                          ? () => setCurrentQuestionIndex((v) => v + 1)
                          : submitQuiz
                      }
                      disabled={
                        !selectedAnswers[questions[currentQuestionIndex].id]
                      }
                      className="w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all"
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next Step"
                        : "Finalize & Score"}
                    </button>
                  </div>
                )}

                {/* Result UI */}
                {result && (
                  <div className="text-center py-10">
                    <div className="text-4xl font-black text-indigo-500 mb-2">
                      {result.percentage}%
                    </div>
                    <h4 className="font-bold text-white uppercase tracking-widest text-xs">
                      Score achieved
                    </h4>
                    <button
                      onClick={startQuiz}
                      className="mt-8 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                      Retake Practice Quiz
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-indigo-600/5 border border-indigo-600/10 p-5 rounded-2xl">
                  <p className="text-[11px] font-bold text-indigo-400 leading-relaxed uppercase tracking-wider">
                    Tutor is currently offline. You can still post questions and
                    they will be answered during the next live session.
                  </p>
                </div>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all"
                  placeholder="Ask a question about this recording..."
                  rows={5}
                ></textarea>
                <button className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                  Post to Discussion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
