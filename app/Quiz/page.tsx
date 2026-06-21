import QuizPage from "@/components/Quiz/QuizPage";
import Navbar from "@/components/landing/navbar";

export default function Page() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] min-h-screen font-sans antialiased pt-16">
      <Navbar />
      <main>
        <QuizPage />
      </main>
    </div>
  );
}