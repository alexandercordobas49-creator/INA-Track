export default function Community({ session, selectedStudent }) {
  const posts = [
    {
      id: 1,
      author: 'Carlos M.',
      avatar: '👨',
      role: 'Estudiante',
      content: 'Acabo de completar la unidad de funciones cuadráticas. ¡Difícil pero satisfactorio!',
      timestamp: 'Hace 2 horas',
      likes: 12,
      comments: 3,
      category: '📚 Académico'
    },
    {
      id: 2,
      author: 'Dra. María García',
      avatar: '👩‍🏫',
      role: 'Instructora',
      content: 'Recordatorio: El examen de Química es el próximo viernes. Estudien los capítulos 5 y 6.',
      timestamp: 'Hace 5 horas',
      likes: 24,
      comments: 8,
      category: '📢 Anuncio'
    },
    {
      id: 3,
      author: 'Ana G.',
      avatar: '👩',
      role: 'Estudiante',
      content: '¡Alguien necesita ayuda con Historia? Puedo formar un grupo de estudio esta noche.',
      timestamp: 'Hace 8 horas',
      likes: 5,
      comments: 7,
      category: '🤝 Colaboración'
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Grupo de Matemáticas',
      icon: '∫',
      members: 12,
      description: 'Resolvemos problemas juntos',
      joined: true,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 2,
      name: 'Grupo de Química',
      icon: '⚗️',
      members: 8,
      description: 'Experimentos y reacciones',
      joined: true,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      name: 'Club de Lectura',
      icon: '📖',
      members: 24,
      description: 'Compartimos análisis de libros',
      joined: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Grupo de Idiomas',
      icon: '🌍',
      members: 15,
      description: 'Practicamos idiomas',
      joined: false,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Tutoría de Matemáticas',
      host: 'Prof. Carlos López',
      date: 'Hoy a las 5:00 PM',
      attendees: 8,
      icon: '∫'
    },
    {
      id: 2,
      title: 'Sesión de Preguntas con Instructores',
      host: 'Equipo de Docentes',
      date: 'Mañana a las 3:30 PM',
      attendees: 34,
      icon: '💬'
    },
    {
      id: 3,
      title: 'Concurso de Ciencias',
      host: 'Dirección Académica',
      date: '25 de Julio, 10:00 AM',
      attendees: 42,
      icon: '🏆'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Comunidad
        </h1>
        <p className="text-slate-600 mt-2">Conecta con otros estudiantes e instructores</p>
      </div>

      {/* New Post */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold">
            VR
          </div>
          <input
            type="text"
            placeholder="¿Qué piensas? Comparte con la comunidad..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200">
            Cancelar
          </button>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300">
            Publicar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Posts */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Feed de Actividad</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{post.avatar}</span>
                      <div>
                        <h4 className="font-bold text-slate-900">{post.author}</h4>
                        <p className="text-xs text-slate-500">{post.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{post.timestamp}</span>
                  </div>

                  {/* Category */}
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                    {post.category}
                  </span>

                  {/* Content */}
                  <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-slate-200">
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">
                      👍 {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">
                      💬 {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">
                      ↗️ Compartir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📅 Próximos Eventos</h3>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="pb-3 border-b border-slate-200 last:border-b-0">
                  <p className="font-semibold text-slate-900 text-sm">{event.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{event.host}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">{event.date}</p>
                  <p className="text-xs text-slate-600 mt-1">👥 {event.attendees} asistentes</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg transition-all duration-300 text-sm">
              Ver todos los eventos
            </button>
          </div>

          {/* My Groups */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">👥 Mis Grupos</h3>
            <div className="space-y-3">
              {groups.filter(g => g.joined).map((group) => (
                <div key={group.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{group.icon}</span>
                    <p className="font-semibold text-slate-900 text-sm">{group.name}</p>
                  </div>
                  <p className="text-xs text-slate-600 ml-6">👥 {group.members} miembros</p>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-slate-900 mt-6 mb-3">Descubre más grupos</h4>
            <div className="space-y-2">
              {groups.filter(g => !g.joined).map((group) => (
                <div key={group.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{group.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{group.name}</p>
                      <p className="text-xs text-slate-600">{group.members} miembros</p>
                    </div>
                  </div>
                  <button className="px-2 py-1 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded transition">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
