
import Header from "@/components/Header";

export default function GenerateScriptsPage() {
  // No login, signup, or user checks anywhere.
  // Removed any code that may notify 'Please Login'
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-white">Generate Scripts</h1>
        <p className="text-lg text-white/80">Your script generation UI goes here.</p>
        {/* Place your script generator feature here */}
      </div>
    </>
  );
}
