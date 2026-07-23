import React, { useEffect, useState } from "react";
import "./AtlasDashboard.css";

const inspiringQuotes = [
  "Hoy es un buen día para aprender algo nuevo.",
  "Cada pequeño avance te acerca a tu meta.",
  "El aprendizaje es un camino de crecimiento.",
  "Tu esfuerzo de hoy construye tu futuro.",
  "La excelencia nace de la constancia.",
];

export default function AtlasDashboard({
  question,
  setQuestion,
  result,
  loading,
  ask,
}) {
  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const today = new Date().getDate();
    setDailyQuote(
      inspiringQuotes[today % inspiringQuotes.length]
    );
  }, []);

  const metrics = [
    {
      label: "XP",
      value: "2,450",
      icon: "⭐",
    },
    {
      label: "Nivel",
      value: "8",
      icon: "🏆",
    },
    {
      label: "Racha",
      value: "12 días",
      icon: "🔥",
    },
    {
      label: "Cursos",
      value: "5",
      icon: "📚",
    },
  ];

  return (
    <div className="atlas-dashboard">

      <section className="atlas-hero">

        <div className="atlas-avatar">
          <div className="avatar-gradient"></div>
          <span className="avatar-icon">
            ✨
          </span>
        </div>

        <div className="atlas-header-text">
          <h1 className="atlas-title">
            Atlas
          </h1>

          <p className="atlas-subtitle">
            Tu compañero inteligente de aprendizaje
          </p>

          <p className="atlas-quote">
            "{dailyQuote}"
          </p>
        </div>

      </section>


      <section className="metrics-grid">

        {metrics.map((metric, index) => (
          <div
            className="metric-card"
            key={index}
          >
            <span className="metric-icon">
              {metric.icon}
            </span>

            <div>
              <h3>
                {metric.value}
              </h3>

              <p>
                {metric.label}
              </p>
            </div>

          </div>
        ))}

      </section>


      <section className="atlas-chat">

        <h2>
          Pregúntale a Atlas 🤖
        </h2>


        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Escribe tu pregunta..."
        />


        <button
          onClick={ask}
          disabled={loading}
        >
          {loading
            ? "Pensando..."
            : "Consultar Atlas"}
        </button>


        {result && (
          <div className="atlas-response">
            <h3>
              Respuesta de Atlas
            </h3>

            <p>
              {result}
            </p>
          </div>
        )}

      </section>


      <aside className="atlas-sidebar">


        <div className="sidebar-card">

          <h3>
            📅 Próximamente
          </h3>

          <ul>

            <li>
              📚 2 clases pendientes
            </li>

            <li>
              📝 Tarea de Matemáticas
            </li>

            <li>
              ⏰ Física - 08:30 a.m.
            </li>

          </ul>

        </div>



        <div className="sidebar-card">

          <h3>
            🎯 Objetivos de hoy
          </h3>

          <p>
            ○ Completar lección de Álgebra
          </p>

          <p>
            ○ Resolver 5 ejercicios
          </p>

          <p>
            ✓ Revisar retroalimentación
          </p>

        </div>



        <div className="sidebar-card">

          <h3>
            🏆 Logros recientes
          </h3>

          <div className="achievements-grid">

            <span>
              🟢 Constante
            </span>

            <span>
              📘 Dedicado
            </span>

            <span>
              🎯 Enfocado
            </span>

          </div>

        </div>


      </aside>


    </div>
  );
}