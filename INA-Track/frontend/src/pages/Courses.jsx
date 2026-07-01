export default function Courses({ session, courses }) {
  const myCourses = [
    {
      id: 1,
      name: 'Matemáticas',
      icon: '∫',
      progress: 80,
      instructor: 'Dr. Carlos López',
      students: 24,
      color: 'from-blue-500 to-indigo-500',
      lastAccess: 'Hace 2 horas',
      status: 'En progreso'
    },
    {
      id: 2,
      name: 'Química',
      icon: '⚗️',
      progress: 60,
      instructor: 'Dra. María García',
      students: 19,
      color: 'from-green-500 to-teal-500',
      lastAccess: 'Hace 5 horas',
      status: 'En progreso'
    },
    {
      id: 3,
      name: 'Historia',
      icon: '📖',
      progress: 40,
      instructor: 'Prof. Juan Rodríguez',
      students: 31,
      color: 'from-amber-500 to-orange-500',
      lastAccess: 'Ayer',
      status: 'En progreso'
    },
    {
      id: 4,
      name: 'Idiomas',
      icon: '🌍',
      progress: 55,
      instructor: 'Prof. Ana Martínez',
      students: 22,
      color: 'from-purple-500 to-pink-500',
      lastAccess: 'Hace 3 días',
      status: 'En progreso'
    },
    {
      id: 5,
      name: 'Biología',
      icon: '🔬',
      progress: 70,
      instructor: 'Dr. Roberto Silva',
      students: 26,
      color: 'from-emerald-500 to-cyan-500',
      lastAccess: 'Hace 1 hora',
      status: 'En progreso'
    },
    {
      id: 6,
      name: 'Física',
      icon: '⚛️',
      progress: 45,
      instructor: 'Prof. Miguel Ángel',
      students: 20,
      color: 'from-red-500 to-pink-500',
      lastAccess: 'Hace 6 horas',
      status: 'En progreso'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Mis Clases
        </h1>
        <p className="text-slate-600 mt-2">Accede a tus cursos y continúa aprendiendo</p>
      </div>

      {/* Filter/Sort */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 font-semibold text-sm">
          Todas
        </button>
        <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200">
          En progreso
        </button>
        <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200">
          Completadas
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Header with Icon */}
            <div className={`bg-gradient-to-br ${course.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{course.icon}</span>
                <span className="text-sm font-bold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {course.progress}%
                </span>
              </div>
              <h3 className="text-xl font-bold">{course.name}</h3>
              <p className="text-sm text-white text-opacity-90 mt-1">{course.instructor}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-semibold text-slate-600 uppercase">Progreso</p>
                  <p className="text-sm font-bold text-slate-900">{course.progress}%</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${course.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between text-sm">
                <div className="space-y-2">
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-900">👥</span> {course.students} estudiantes
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-900">🕐</span> {course.lastAccess}
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${course.color} hover:shadow-lg transition-all duration-300`}>
                Continuar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
