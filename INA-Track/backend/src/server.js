import express from "express";
import cors from "cors";

const app = express();

// 🔥 Configuración esencial
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// 🧪 TEST BASE
app.get("/", (req, res) => {
  res.json({ message: "INA-Track API funcionando 🚀" });
});

// 👤 USERS
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Estudiante Demo", xp: 120 }
  ]);
});

// 📚 COURSES
app.get("/api/courses", (req, res) => {
  res.json([
    { id: 1, name: "Matemáticas" },
    { id: 2, name: "Lengua y Literatura" }
  ]);
});

// 📊 ATTENDANCE
app.get("/api/attendance", (req, res) => {
  res.json([
    { id: 1, status: "presente" },
    { id: 2, status: "ausente" }
  ]);
});

// 🔐 LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;

  res.json({
    token: "demo-token-ina-track",
    user: {
      email,
      role: "student"
    }
  });
});

// 🤖 IA ATLAS (mock)
app.post("/api/atlas/ask", (req, res) => {
  const { question } = req.body;

  res.json({
    answer: `Respuesta IA simulada para: ${question}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 INA-Track API escuchando en puerto ${PORT}`);
  console.log(`📡 Frontend conectado desde http://localhost:5173`);
});

export default app;