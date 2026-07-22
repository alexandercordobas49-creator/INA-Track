import React, { useState, useEffect } from "react";
import "./AtlasDashboard.css";

const inspiringQuotes = [
  "Hoy es un buen día para aprender algo nuevo.",
  "El aprendizaje es el viaje de una vida con mil caminos.",
  "Tu potencial es infinito cuando crees en ti.",
  "Cada pregunta es un paso hacia el conocimiento.",
  "La excelencia es un hábito, no un acto.",
];

export default function AtlasDashboard({
  question,
  setQuestion,
  result,
  loading,
  ask,
}) {
  const [dailyQuote, setDailyQuote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const today = new Date().getDate();
    setDailyQuote(inspiringQuotes[today % inspiringQuotes.length]);
  }, []);

  const quickActions = [
    { icon: "📈", text: "Analiza mi progreso", label: "Progreso" },
    { icon: "📚", text: "Recomiéndame qué estudiar", label: "Recomendación" },
    { icon: "🎯", text: "¿Qué logro sigue?", label: "Logro" },
    { icon: "🧠", text: "Explícame este tema", label: "Explicación" },
    { icon: "📅", text: "Organiza mi semana", label: "Agenda" },
  ];

  const metrics = [
    { label: "XP", value: "2,450", icon: "⭐" },
    { label: "Nivel", value: "8", icon: "🎖️" },
    { label: "Racha", value: "12 días", icon: "🔥" },
    { label: "Cursos", value: "5", icon: "📚" },
  ];

  // Manejo de click en acciones rápidas
  const handleQuickAction = (text) => {
    setQuestion(text);
    setFeedback("✓ Acción cargada");
    setTimeout(() => setFeedback(""), 2000);
  };

  // Manejo de click en adjuntos
  const handleAttachFile = () => {
    setFeedback("📎 Función de adjuntos en desarrollo");
    setTimeout(() => setFeedback(""), 2000);
    alert("La función de adjuntos estará disponible pronto");
  };

  // Manejo de micrófono/voz
  const handleVoiceInput = async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setFeedback("🎤 Reconocimiento de voz no soportado");
      setTimeout(() => setFeedback(""), 2000);
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      setFeedback("🎤 Escuchando...");

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setQuestion(transcript);
        setFeedback("✓ Voz procesada");
      };

      recognition.onerror = () => {
        setFeedback("❌ Error en micrófono");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  // Manejo de click en métrica cards
  const handleMetricClick = (metric) => {
    setFeedback(`✓ ${metric.label}: ${metric.value}`);
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="atlas-dashboard">
      <div className="atlas-hero">
        <div className="atlas-hero-content">
          <div className="atlas-avatar">
            <div className="avatar-gradient"></div>
            <span className="avatar-icon">✨</span>
          </div>
          <div className="atlas-header-text">
            <h1 className="atlas-title">Atlas</h1>
            <p className="atlas-subtitle">Tu asistente inteligente de aprendizaje</p>
            <p className="atlas-quote">"{dailyQuote}"</p>
          </div>
        </div>
        <div className="atlas-status">
          <div className="status-indicator">●</div>
          <span>Atlas listo para ayudarte</span>
        </div>
      </div>

      <div className="atlas-content">
        <div className="atlas-chat-section">
          <div className="metrics-grid">
            {metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="metric-card btn-primary"
                onClick={() => handleMetricClick(metric)}
                role="button"
                tabIndex="0"
              >
                <span className="metric-icon">{metric.icon}</span>
                <div className="metric-content">
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-container">
            <div className="chat-area">
              <div className="message message-system">
                <div className="message-avatar">
                  <span>✨</span>
                </div>
                <div className="message-content">
                  <p className="message-author">Atlas</p>
                  <p>Hola Alexander! Estoy aquí para ayudarte con tus clases, resolver dudas y guiarte en tu camino de aprendizaje.</p>
                  <small className="message-time">Hace un momento</small>
                </div>
              </div>

              {result && (
                <div className="message message-response">
                  <p>{result.answer}</p>
                </div>
              )}
            </div>

            <div className="quick-actions">
              <p className="actions-label">Acciones rápidas:</p>
              <div className="chips-grid">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    className="chip-modern btn-gradient"
                    onClick={() => handleQuickAction(action.text)}
                    title={action.text}
                  >
                    <span className="chip-icon">{action.icon}</span>
                    <span className="chip-text">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div className="feedback-message feedback-success">
                {feedback}
              </div>
            )}

            <div className="chat-input-modern">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Pregunta cualquier cosa sobre tus clases..."
                  className="input-field"
                />
                <button 
                  className="input-icon-btn btn-icon"
                  onClick={handleAttachFile}
                  title="Adjuntar archivo"
                >
                  📎
                </button>
                <button 
                  className={`input-icon-btn btn-icon ${isListening ? 'listening' : ''}`}
                  onClick={handleVoiceInput}
                  title={isListening ? "Escuchando..." : "Usar micrófono"}
                >
                  🎤
                </button>
              </div>
              <button 
                onClick={ask} 
                className="btn-send-modern btn-gradient"
                disabled={loading}
              >
                {loading ? "⏳" : "✓"}
              </button>
            </div>
          </div>
        </div>

        <div className="atlas-sidebar">
          <div className="sidebar-card">
            <h3 className="card-title">📅 Hoy en tu agenda</h3>
            <ul className="sidebar-list">
              <li>
                <span className="list-icon">📚</span>
                <div>
                  <strong>2 clases pendientes</strong>
                  <p>Matemáticas y Física</p>
                </div>
              </li>
              <li>
                <span className="list-icon">📝</span>
                <div>
                  <strong>Tarea por entregar</strong>
                  <p>Matemáticas: ejercicios</p>
                </div>
              </li>
              <li>
                <span className="list-icon">⏰</span>
                <div>
                  <strong>Próxima clase</strong>
                  <p>Física - 08:30 a.m.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3 className="card-title">🎯 Objetivos de hoy</h3>
            <div className="objectives-list">
              <div className="objective-item">
                <span className="objective-check">○</span>
                <span>Completar lección de Álgebra</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">○</span>
                <span>Resolver 5 ejercicios</span>
              </div>
              <div className="objective-item completed">
                <span className="objective-check">✓</span>
                <span>Revisar retroalimentación</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3 className="card-title">🏆 Logros recientes</h3>
            <div className="achievements-grid">
              <div className="achievement-badge">
                <span>🟢</span>
                <small>Constante</small>
              </div>
              <div className="achievement-badge">
                <span>📘</span>
                <small>Dedicado</small>
              </div>
              <div className="achievement-badge">
                <span>🎯</span>
                <small>Enfocado</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="atlas-dashboard">
      <div className="atlas-hero">
        <div className="atlas-hero-content">
          <div className="atlas-avatar">
            <div className="avatar-gradient"></div>
            <span className="avatar-icon">✨</span>
          </div>
          <div className="atlas-header-text">
            <h1 className="atlas-title">Atlas</h1>
            <p className="atlas-subtitle">Tu asistente inteligente de aprendizaje</p>
            <p className="atlas-quote">"{dailyQuote}"</p>
          </div>
        </div>
        <div className="atlas-status">
          <div className="status-indicator">●</div>
          <span>Atlas listo para ayudarte</span>
        </div>
      </div>

      <div className="atlas-content">
        <div className="atlas-chat-section">
          <div className="metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <span className="metric-icon">{metric.icon}</span>
                <div className="metric-content">
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-container">
            <div className="chat-area">
              <div className="message message-system">
                <div className="message-avatar">
                  <span>✨</span>
                </div>
                <div className="message-content">
                  <p className="message-author">Atlas</p>
                  <p>Hola Alexander! Estoy aquí para ayudarte con tus clases, resolver dudas y guiarte en tu camino de aprendizaje.</p>
                  <small className="message-time">Hace un momento</small>
                </div>
              </div>

              {result && (
                <div className="message message-response">
                  <p>{result.answer}</p>
                </div>
              )}
            </div>

            <div className="quick-actions">
              <p className="actions-label">Acciones rápidas:</p>
              <div className="chips-grid">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    className="chip-modern"
                    onClick={() => setQuestion(action.text)}
                  >
                    <span className="chip-icon">{action.icon}</span>
                    <span className="chip-text">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="chat-input-modern">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Pregunta cualquier cosa sobre tus clases..."
                  className="input-field"
                />
                <button className="input-icon-btn">📎</button>
                <button className="input-icon-btn">🎤</button>
              </div>
              <button onClick={ask} className="btn-send-modern">
                {loading ? "Enviando..." : "✓"}
              </button>
            </div>
          </div>
        </div>

        <div className="atlas-sidebar">
          <div className="sidebar-card">
            <h3 className="card-title">📅 Hoy en tu agenda</h3>
            <ul className="sidebar-list">
              <li>
                <span className="list-icon">📚</span>
                <div>
                  <strong>2 clases pendientes</strong>
                  <p>Matemáticas y Física</p>
                </div>
              </li>
              <li>
                <span className="list-icon">📝</span>
                <div>
                  <strong>Tarea por entregar</strong>
                  <p>Matemáticas: ejercicios</p>
                </div>
              </li>
              <li>
                <span className="list-icon">⏰</span>
                <div>
                  <strong>Próxima clase</strong>
                  <p>Física - 08:30 a.m.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3 className="card-title">🎯 Objetivos de hoy</h3>
            <div className="objectives-list">
              <div className="objective-item">
                <span className="objective-check">○</span>
                <span>Completar lección de Álgebra</span>
              </div>
              <div className="objective-item">
                <span className="objective-check">○</span>
                <span>Resolver 5 ejercicios</span>
              </div>
              <div className="objective-item completed">
                <span className="objective-check">✓</span>
                <span>Revisar retroalimentación</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3 className="card-title">🏆 Logros recientes</h3>
            <div className="achievements-grid">
              <div className="achievement-badge">
                <span>🟢</span>
                <small>Constante</small>
              </div>
              <div className="achievement-badge">
                <span>📘</span>
                <small>Dedicado</small>
              </div>
              <div className="achievement-badge">
                <span>🎯</span>
                <small>Enfocado</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
