import { useState } from 'react';
import { api } from '../api.js';

export default function Auth({ onSession }) {
  const [loginForm, setLoginForm] = useState({ email: 'valeria@ina-track.test', password: 'demo123' });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [message, setMessage] = useState('');

  async function login() {
    try {
      const session = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginForm)
      });
      setMessage('Sesión iniciada.');
      onSession(session);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function register() {
    try {
      if (registerForm.password !== registerForm.confirmPassword) {
        setMessage('Las contraseñas no coinciden');
        return;
      }
      const session = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerForm)
      });
      setMessage('Cuenta creada.');
      onSession(session);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="grid lg:grid-cols-3 gap-6 p-8 max-w-7xl mx-auto">
        {/* PANEL IZQUIERDO - BIENVENIDA */}
        <div className="lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 text-6xl">🎓</div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-green-900 mb-2">Bienvenido a</h1>
            <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">INA-Track</h2>
            <p className="text-green-700 italic text-xl font-semibold mb-6">Tu camino hacia el éxito académico</p>
            
            <div className="space-y-4 my-8 border-t-2 border-green-200 pt-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-bold text-green-900">Aprende</p>
                  <p className="text-sm text-green-700">Contenido estructurado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-bold text-green-900">Crece</p>
                  <p className="text-sm text-green-700">Gana XP y sube niveles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-bold text-green-900">Logra</p>
                  <p className="text-sm text-green-700">Desbloquea logros</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-green-300 mt-6">
              <div className="flex gap-3">
                <span className="text-4xl">🤖</span>
                <div>
                  <p className="font-bold text-green-900">Con IA que te acompaña</p>
                  <p className="text-xs text-green-700">Seguimiento, motivación y éxito académico en un solo lugar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANELES DERECHOS */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {/* PANEL LOGIN */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200 hover:shadow-3xl transition-all">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-full">
                <span className="text-5xl">🔐</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-center text-neutral-900 mb-2">Iniciar sesión</h3>
            <p className="text-center text-neutral-600 mb-8 font-medium">Accede a tu cuenta</p>
            
            {message && <div className="mb-4 bg-green-100 border-2 border-green-500 text-green-900 px-4 py-3 rounded-xl font-semibold text-center">{message}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">📧 Email</label>
                <input 
                  className="w-full rounded-xl border-2 border-green-200 px-4 py-3 font-medium focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50 transition-all" 
                  placeholder="tu@email.com"
                  value={loginForm.email} 
                  onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">🔒 Contraseña</label>
                <input 
                  className="w-full rounded-xl border-2 border-green-200 px-4 py-3 font-medium focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50 transition-all" 
                  type="password" 
                  placeholder="••••••••"
                  value={loginForm.password} 
                  onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} 
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember" className="text-sm font-medium text-neutral-700">Recuérdame</label>
              </div>
              <button className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg" type="button" onClick={login}>
                🚀 Entrar a INA-Track
              </button>
              <p className="text-center text-sm text-neutral-600">¿Olvidaste tu contraseña? <a href="#" className="font-bold text-green-600 hover:underline">Recupérala aquí</a></p>
            </div>
          </div>

          {/* PANEL REGISTRO */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200 hover:shadow-3xl transition-all">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-full">
                <span className="text-5xl">👤</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-center text-neutral-900 mb-2">Crear cuenta</h3>
            <p className="text-center text-neutral-600 mb-6 font-medium">Registrate y comienza tu viaje</p>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">👤 Nombre</label>
                  <input className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" placeholder="Juan" value={registerForm.firstName} onChange={(event) => setRegisterForm({ ...registerForm, firstName: event.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">👤 Apellido</label>
                  <input className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" placeholder="Pérez" value={registerForm.lastName} onChange={(event) => setRegisterForm({ ...registerForm, lastName: event.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">📧 Correo electrónico</label>
                <input className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" placeholder="tu@email.com" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">🔒 Contraseña</label>
                <input className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" type="password" placeholder="••••••••" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">🔒 Confirmar contraseña</label>
                <input className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" type="password" placeholder="••••••••" value={registerForm.confirmPassword} onChange={(event) => setRegisterForm({ ...registerForm, confirmPassword: event.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">👥 Rol</label>
                <select className="w-full rounded-lg border-2 border-purple-200 px-3 py-2 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-purple-50 transition-all" value={registerForm.role} onChange={(event) => setRegisterForm({ ...registerForm, role: event.target.value })}>
                  <option value="student">👨‍🎓 Estudiante</option>
                  <option value="instructor">👨‍🏫 Docente</option>
                  <option value="admin">⚙️ Administrador</option>
                  <option value="parent">👪 Padre/Tutor</option>
                </select>
              </div>
              <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95" type="button" onClick={register}>
                ✨ Crear cuenta
              </button>
              <p className="text-center text-xs text-neutral-600">¿Ya tienes cuenta? <a href="#" className="font-bold text-purple-600 hover:underline">Inicia aquí</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 mt-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-8">
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 text-white text-center border border-white border-opacity-30 hover:bg-opacity-30 transition-all">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-bold text-lg">Seguimiento académico</p>
            <p className="text-sm opacity-90 mt-2">Asistencia y rendimiento</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 text-white text-center border border-white border-opacity-30 hover:bg-opacity-30 transition-all">
            <p className="text-4xl mb-3">🎮</p>
            <p className="font-bold text-lg">Gamificación educativa</p>
            <p className="text-sm opacity-90 mt-2">XP, logros y rachas</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 text-white text-center border border-white border-opacity-30 hover:bg-opacity-30 transition-all">
            <p className="text-4xl mb-3">🤖</p>
            <p className="font-bold text-lg">IA Inteligente</p>
            <p className="text-sm opacity-90 mt-2">Recomendaciones personalizadas</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 text-white text-center border border-white border-opacity-30 hover:bg-opacity-30 transition-all">
            <p className="text-4xl mb-3">🔥</p>
            <p className="font-bold text-lg">Motivación diaria</p>
            <p className="text-sm opacity-90 mt-2">Rachas y metas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
