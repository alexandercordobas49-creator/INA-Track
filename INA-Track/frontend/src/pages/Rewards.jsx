export default function Rewards({ session, selectedStudent }) {
  const rewards = [
    {
      id: 1,
      name: 'Badge Estrella',
      description: 'Demuestra consistencia en tus estudios',
      cost: '500 XP',
      icon: '⭐',
      rarity: 'Rara',
      owned: true,
      earnedDate: '15 de Julio'
    },
    {
      id: 2,
      name: 'Badge Fuego (Racha)',
      description: 'Mantén una racha de 7 días sin faltar',
      cost: '300 XP',
      icon: '🔥',
      rarity: 'Común',
      owned: true,
      earnedDate: '10 de Julio'
    },
    {
      id: 3,
      name: 'Badge Genio',
      description: 'Completa 5 cursos con calificación excelente',
      cost: '800 XP',
      icon: '🧠',
      rarity: 'Muy Rara',
      owned: false,
      progress: '3/5'
    },
    {
      id: 4,
      name: 'Certificado de Excelencia',
      description: 'Logra promedio de 95 o más',
      cost: '1000 XP',
      icon: '🎓',
      rarity: 'Legendaria',
      owned: false,
      progress: '92/95'
    },
    {
      id: 5,
      name: 'Cambio de Avatar Premium',
      description: 'Personaliza tu avatar con temas especiales',
      cost: '200 XP',
      icon: '🎨',
      rarity: 'Común',
      owned: false,
      progress: '-'
    },
    {
      id: 6,
      name: 'Tema Nocturno Pro',
      description: 'Desbloquea el tema oscuro avanzado',
      cost: '150 XP',
      icon: '🌙',
      rarity: 'Común',
      owned: true,
      earnedDate: '8 de Julio'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Carlos M.', xp: 5420, level: 10, badge: '👑' },
    { rank: 2, name: 'Ana G.', xp: 4890, level: 9, badge: '🥈' },
    { rank: 3, name: 'Tu (Valeria)', xp: 2450, level: 8, badge: '🥉' },
    { rank: 4, name: 'Miguel R.', xp: 1890, level: 6, badge: '4️⃣' },
    { rank: 5, name: 'Laura P.', xp: 1450, level: 5, badge: '5️⃣' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Recompensas
        </h1>
        <p className="text-slate-600 mt-2">Consigue badges, certificados y recompensas especiales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Rewards Section */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 font-semibold text-sm">
              Badges
            </button>
            <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200">
              Disponibles
            </button>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`rounded-2xl border-2 p-6 transition-all duration-300 ${
                  reward.owned
                    ? 'bg-white border-emerald-200 shadow-lg'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{reward.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    reward.rarity === 'Legendaria' ? 'bg-yellow-100 text-yellow-700' :
                    reward.rarity === 'Muy Rara' ? 'bg-purple-100 text-purple-700' :
                    reward.rarity === 'Rara' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {reward.rarity}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{reward.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{reward.description}</p>

                {reward.owned ? (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-emerald-600">
                      ✓ Desbloqueado {reward.earnedDate}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    {reward.progress && reward.progress !== '-' && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-semibold text-slate-600">Progreso</p>
                          <p className="text-xs font-bold text-slate-900">{reward.progress}</p>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full"
                            style={{ width: reward.progress ? `${(parseInt(reward.progress.split('/')[0]) / parseInt(reward.progress.split('/')[1])) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    )}
                    <button className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg transition-all duration-300">
                      Desbloquear con {reward.cost}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Sidebar */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            🏆 Ranking Global
          </h3>
          
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  user.name.includes('Valeria') 
                    ? 'bg-gradient-to-r from-emerald-100 to-cyan-100 border border-emerald-300' 
                    : 'bg-white border border-slate-200'
                }`}
              >
                <span className="text-xl font-bold text-slate-600 w-6 text-center">{user.badge}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-600">Nivel {user.level}</p>
                </div>
                <p className="text-sm font-bold text-emerald-600">{user.xp.toLocaleString()} XP</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg transition-all duration-300">
            Ver más rankings →
          </button>
        </div>
      </div>

      {/* XP Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">XP Disponible</p>
          <h2 className="text-4xl font-black text-blue-600 mt-2">2,450</h2>
          <p className="text-xs text-slate-600 mt-2">para canjear recompensas</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Badges Totales</p>
          <h2 className="text-4xl font-black text-purple-600 mt-2">{rewards.filter(r => r.owned).length}</h2>
          <p className="text-xs text-slate-600 mt-2">de {rewards.length} disponibles</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Ranking</p>
          <h2 className="text-4xl font-black text-green-600 mt-2">#3</h2>
          <p className="text-xs text-slate-600 mt-2">en tu clase</p>
        </div>
      </div>
    </div>
  );
}
