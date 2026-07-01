export default function Goals({ session, selectedStudent }) {
  const goals = [
    {
      id: 1,
      title: 'Completar 20 clases',
      category: 'Académico',
      progress: 90,
      current: 18,
      target: 20,
      deadline: '30 de Julio',
      reward: '250 XP',
      icon: '📚',
      priority: 'Alta',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Mantener racha de 30 días',
      category: 'Consistencia',
      progress: 40,
      current: 12,
      target: 30,
      deadline: '18 de Agosto',
      reward: '500 XP + Badge',
      icon: '🔥',
      priority: 'Alta',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      title: 'Alcanzar nivel 10',
      category: 'Progresión',
      progress: 72,
      current: 8,
      target: 10,
      deadline: '15 de Agosto',
      reward: '1000 XP',
      icon: '⭐',
      priority: 'Media',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Obtener 5 logros',
      category: 'Desafíos',
      progress: 60,
      current: 3,
      target: 5,
      deadline: '31 de Julio',
      reward: '300 XP',
      icon: '🏆',
      priority: 'Media',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 5,
      title: 'Participar en 10 actividades',
      category: 'Comunidad',
      progress: 50,
      current: 5,
      target: 10,
      deadline: '10 de Agosto',
      reward: '200 XP',
      icon: '💬',
      priority: 'Baja',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Mis Metas
        </h1>
        <p className="text-slate-600 mt-2">Objetivos para mejorar tu desempeño académico</p>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <span className="text-3xl">{goal.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">{goal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      goal.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                      goal.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {goal.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{goal.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{goal.reward}</p>
                <p className="text-xs text-slate-500 mt-1">Vence: {goal.deadline}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-slate-600">
                  Progreso: {goal.current}/{goal.target}
                </p>
                <p className="text-sm font-bold text-slate-900">{goal.progress}%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${goal.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {goal.progress === 100 ? '✓ Completado' : 'En progreso'}
              </span>
              <button className={`px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${goal.color} hover:shadow-lg transition-all duration-300`}>
                {goal.progress === 100 ? 'Reclamar' : 'Ver detalles'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Metas Activas</p>
          <h2 className="text-4xl font-black text-blue-600 mt-2">{goals.filter(g => g.progress < 100).length}</h2>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Completadas</p>
          <h2 className="text-4xl font-black text-green-600 mt-2">{goals.filter(g => g.progress === 100).length}</h2>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Promedio de Progreso</p>
          <h2 className="text-4xl font-black text-purple-600 mt-2">
            {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
          </h2>
        </div>
      </div>
    </div>
  );
}
