import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfReader() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the file input change event.
   * Reads the selected PDF file and extracts its text content.
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Reset states
    setText("");
    setError(null);
    setLoading(true);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);

        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let fullText = "";

        // Iterate through each page to extract text
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        setText(fullText);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error extracting text from PDF:", err);
      setError("Failed to extract text from the PDF. Please try another file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {loading && (
        <p style={{ color: "blue" }}>Extracting text, please wait...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PdfReader;
