import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@5.4.54/build/pdf.worker.min.mjs";

function PdfReader({ setFormData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   setError(null);
  //   setLoading(true);

  //   try {
  //     const reader = new FileReader();

  //     reader.onload = async (e) => {
  //       const typedarray = new Uint8Array(e.target.result);

  //       const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
  //       let fullText = "";

  //       for (let i = 1; i <= pdf.numPages; i++) {
  //         const page = await pdf.getPage(i);
  //         const textContent = await page.getTextContent();
  //         const pageText = textContent.items.map((item) => item.str).join(" ");
  //         fullText += pageText + "\n";
  //       }

  //       try {
  //         const res = await axios.post(BASE_URL + "/resume-parser", {
  //           resumeText: fullText,
  //         });
  //         setFormData(res.data);
  //       } catch (apiErr) {
  //         console.error("Backend parsing error:", apiErr);
  //         setError("Failed to parse resume with AI.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     reader.readAsArrayBuffer(file);
  //   } catch (err) {
  //     console.error("Error extracting text from PDF:", err);
  //     setError("Failed to extract text from the PDF. Please try another file.");
  //     setLoading(false);
  //   }
  // };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);

        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        try {
          const res = await axios.post(BASE_URL + "/resume-parser", {
            resumeText: fullText,
          });
          setFormData(res.data);
        } catch (apiErr) {
          console.error("Backend parsing error:", apiErr);
          setError("Failed to parse resume with AI.");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error extracting text from PDF:", err);
      setError("Failed to extract text from the PDF. Please try another file.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center align-middle items-center gap-2">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        "
      />

      {loading && <p className="text-blue-500">Processing resume...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default PdfReader;
