import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import type { Course, ApiResponse } from "../types";
import {
  Clock,
  PlayCircle,
  Globe,
  ChevronRight,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ApiResponse<Course>>(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading || !course) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Navbar />

      {/* Header / Breadcrumbs Section */}
      <div className="pt-28 pb-6 bg-linear-to-b from-slate-50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Link to="/" className="hover:text-indigo-600 transition-colors">
                Catalogue
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-indigo-600">{course.title}</span>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT CONTENT (8 cols) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-black text-slate-900">5.0</span>
                <span className="text-xs font-bold text-slate-400">(2.4k Reviews)</span>
              </div> */}

              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                    {course.teacher_name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    Instructed by{" "}
                    <span className="text-indigo-600">
                      {course.teacher_name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <Clock className="w-3.5 h-3.5" />
                  {course.lectures_count} Lessons
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <Globe className="w-3.5 h-3.5" />
                  English & Subtitles
                </div>
              </div>

              <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
                <img
                  src={course.thumbnail}
                  className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={course.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>
              </div>

              <div className="space-y-12">
                <section>
                  <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-4">
                    Course Brief
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
                    {course.description ||
                      "A comprehensive learning experience designed for elite practitioners."}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">
                    Course Curriculum
                  </h2>
                  <div className="grid gap-3">
                    {course.lectures?.map((lecture, index) => (
                      <Link
                        key={lecture.id}
                        to={`/watch/${lecture.id}`} 
                        className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-600/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {(index + 1).toString().padStart(2, "0")}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {lecture.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                Recording Access
                              </span>
                              <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                {lecture.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <PlayCircle className="w-6 h-6 text-slate-200 group-hover:text-indigo-600 transition-all" />
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR (4 cols) */}
          {/* <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                    <div className="mb-8">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Enrolment Access</span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-5xl font-black text-slate-900 tracking-tighter">FREE</span>
                            <span className="text-xs font-bold text-slate-400 line-through">499 AED</span>
                        </div>
                    </div>

                    <div className="space-y-5 mb-10">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            </div>
                            Full Lifetime Ownership
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            </div>
                            HD Streaming on Mobile & Web
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                                <Award className="w-4 h-4 text-emerald-500" />
                            </div>
                            Verified Certification
                        </div>
                    </div>

                    <Link 
                        to={course.lectures && course.lectures.length > 0 ? `/watch/${course.lectures[0].id}` : '#'}
                        className="group flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-[0.98]"
                    >
                        Begin Experience
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Guaranteed secure access</span>
                    </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-indigo-600 rounded-4xl text-white flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Bonus Feature</p>
                    <p className="text-sm font-bold">Free Mentorship Access</p>
                 </div>
              </div> */}

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                      Student Portal
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      Lecture Access
                    </h3>
                  </div>

                  {/* Access Instructions */}
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                        Log in using the email address registered with your
                        tutor.
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                        {course.enrollment_key_required
                          ? "Enter the unique enrollment key provided in class to unlock."
                          : "Select any lecture from the curriculum to begin playback."}
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                        Recording access is strictly for registered students
                        only.
                      </p>
                    </div>
                  </div>

                  {/* Primary Action */}
                  <Link
                    to={
                      course.lectures && course.lectures.length > 0
                        ? `/watch/${course.lectures[0].id}`
                        : "#"
                    }
                    className="group flex items-center justify-center gap-3 w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:shadow-2xl transition-all active:scale-[0.98]"
                  >
                    Enter Lecture Hall
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Authorized Access Only
                    </span>
                  </div>
                </div>
              </div>

              {/* Class Support Card */}
              <div className="mt-6 p-6 bg-slate-50 rounded-4xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-900">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Class Support
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Contact tutor for keys
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
