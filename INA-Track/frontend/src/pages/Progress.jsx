export default function Progress({ session, selectedStudent }) {
  const progressData = {
    overallProgress: 72,
    coursesCompleted: 18,
    totalCourses: 25,
    currentStreak: 12,
    longestStreak: 18,
    achievements: 3,
    totalAchievements: 15,
    xpEarned: 2450,
    xpGoal: 5000,
    levelProgress: 72
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Mi Progreso
        </h1>
        <p className="text-slate-600 mt-2">Seguimiento detallado de tu desarrollo académico</p>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Progress */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Progreso General</p>
              <h2 className="text-4xl font-black text-emerald-600 mt-2">{progressData.overallProgress}%</h2>
            </div>
            <span className="text-4xl">📈</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressData.overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-3">¡Vas muy bien! Sigue así.</p>
        </div>

        {/* Courses Completed */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Clases Completadas</p>
              <h2 className="text-4xl font-black text-blue-600 mt-2">{progressData.coursesCompleted}/{progressData.totalCourses}</h2>
            </div>
            <span className="text-4xl">📚</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(progressData.coursesCompleted / progressData.totalCourses) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-3">{Math.round((progressData.coursesCompleted / progressData.totalCourses) * 100)}% completado</p>
        </div>

        {/* Current Streak */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Racha Actual</p>
              <h2 className="text-4xl font-black text-orange-600 mt-2">{progressData.currentStreak} días</h2>
            </div>
            <span className="text-4xl">🔥</span>
          </div>
          <p className="text-xs text-slate-600 mt-3">Racha más larga: {progressData.longestStreak} días</p>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Logros Desbloqueados</p>
              <h2 className="text-4xl font-black text-purple-600 mt-2">{progressData.achievements}/{progressData.totalAchievements}</h2>
            </div>
            <span className="text-4xl">🏆</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(progressData.achievements / progressData.totalAchievements) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-3">{Math.round((progressData.achievements / progressData.totalAchievements) * 100)}% desbloqueado</p>
        </div>

        {/* XP Progress */}
        <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Experiencia (XP)</p>
              <h2 className="text-4xl font-black text-yellow-600 mt-2">{progressData.xpEarned.toLocaleString()}</h2>
            </div>
            <span className="text-4xl">⚡</span>
          </div>
          <p className="text-xs text-slate-600 mt-3">Meta: {progressData.xpGoal.toLocaleString()} XP</p>
        </div>

        {/* Level Progress */}
        <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Nivel Actual</p>
              <h2 className="text-4xl font-black text-cyan-600 mt-2">Nivel 8</h2>
            </div>
            <span className="text-4xl">📊</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressData.levelProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-3">{progressData.levelProgress}% hacia Nivel 9</p>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Actividad Semanal</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'].map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-xs font-semibold text-slate-500 mb-2">{day}</p>
              <div className={`h-12 rounded-lg flex items-center justify-center font-bold text-white ${
                i < 5 ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' : 'bg-slate-200'
              }`}>
                {i < 5 ? '✓' : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
