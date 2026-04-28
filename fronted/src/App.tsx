
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Bucket from "./pages/Bucket";
import { ToastContainer } from "react-toastify";


export default function App() {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [page, setPage] = useState<"home" | "bucket">("home");

  useEffect(() => {
    console.log("Selected student ID:", studentId);
  }, [studentId])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage("home")}
        >
          Home
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage("bucket")}
        >
          Bucket
        </button>
      </div>

      {page === "home" && (
        <Home studentId={studentId} setStudentId={setStudentId} />
      )}

      {page === "bucket" && (
        <Bucket studentId={studentId} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}