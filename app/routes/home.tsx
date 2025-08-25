import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAnalyser" },
    { name: "description", content: "Smart Feedback of Resume" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore()
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate()

  useEffect( ()=>{
    console.log("--------------",auth.isAuthenticated)
    if(!auth.isAuthenticated) navigate('/auth?next=/')
  }, [auth.isAuthenticated])
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      {/* {window.puter.ai.chat()} */}
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your application</h1>
          <h2>Review and check feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
