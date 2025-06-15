
// This page now only informs users that script generation has moved.
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ScriptMitraPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-200 text-center">
          Script Generation has moved!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6 max-w-xl">
          The Script Mitra feature is now located on a dedicated Generate Scripts page.
          Click below to access full script generation tools.
        </p>
        <Button size="lg" onClick={() => navigate("/generatescripts")}>
          Go to Generate Scripts
        </Button>
      </div>
    </>
  );
}
