
// This page now only informs users that script generation has moved.
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function GenerateScriptsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-200 text-center">
          Script Generation has moved!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6 max-w-xl">
          The Script Mitra feature is now located on its own dedicated page.<br />
          Click below to access all script generation tools.
        </p>
        <Button size="lg" onClick={() => navigate("/scriptmitra")}>
          Go to Script Mitra
        </Button>
      </div>
    </>
  );
}
