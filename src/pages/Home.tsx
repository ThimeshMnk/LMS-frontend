// src/pages/Home.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { ChevronRight } from "lucide-react";
import type { Course, ApiResponse } from "../types";
import { CourseCardSkeleton, Skeleton } from "../components/ui/Skeleton";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ApiResponse<Course[]>>("/courses")
      .then((res) => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

if (loading)
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
     
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Section */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore our courses
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                World-class learning experiences handpicked for you
              </p>
            </div>

            <button className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all text-sm group">
              See all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Slider Row */}
          <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar scroll-smooth">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                category="Professional Track" 
                image={course.thumbnail}
                duration={`${course.lectures_count} Lectures`}
                rating={5.0}
                reviews={Math.floor(Math.random() * 50) + 10} 
                price="FREE"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
