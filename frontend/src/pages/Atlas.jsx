import { useState } from "react";
import { api } from "../api.js";
import AtlasDashboard from "./AtlasDashboard.jsx";

export default function Atlas() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  async function ask() {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const response = await api("/atlas/ask", {
        method: "POST",
        body: JSON.stringify({
          question
        }),
      });

      setResult(response);

    } catch(error) {

      console.error("Error consultando Atlas:", error);

    } finally {

      setLoading(false);

    }

  }


  return (
    <AtlasDashboard
      question={question}
      setQuestion={setQuestion}
      result={result}
      loading={loading}
      ask={ask}
    />
  );
}