import Navbar from "@/components/landing/navbar";
import QuizPage from "@/components/Quiz/QuizPage";

export default function Page() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] min-h-screen font-sans antialiased">
    <Navbar />
    <main className="pt-32 pb-20 px-6 bg-white dark:bg-[#0A0A0A]">
  <QuizPage />
    </main>
    </div>
);
}