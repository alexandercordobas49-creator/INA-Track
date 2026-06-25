import { useState } from 'react';
import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function Atlas() {
  const [question, setQuestion] = useState('Como va el progreso del estudiante?');
  const [result, setResult] = useState(null);

  async function ask() {
    setResult(await api('/atlas/ask', {
      method: 'POST',
      body: JSON.stringify({ question })
    }));
  }

  return (
    <>
      <ModuleHeader eyebrow="Modulo 7" title="Atlas IA" description="Asistente local que responde usando los datos actuales." />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Panel title="Consulta">
          <textarea className="min-h-36 w-full rounded-lg border border-neutral-300 px-4 py-3 font-medium transition-all duration-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50" value={question} onChange={(event) => setQuestion(event.target.value)} />
          <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95" type="button" onClick={ask}>🤖 Preguntar</button>
          {result && <p className="mt-6 rounded-lg bg-gradient-to-r from-primary-50 to-blue-50 p-5 leading-7 text-neutral-800 border border-primary-200 font-medium">{result.answer}</p>}
        </Panel>
        <Panel title="💡 Sugerencias">
          <ul className="space-y-3 text-neutral-600">
            {(result?.suggestions || ['Revisar asistencia', 'Ver XP acumulado', 'Detectar rachas']).map((item) => (
              <li className="rounded-lg bg-gradient-to-r from-accent-50 to-purple-50 p-4 font-medium border border-accent-200 hover:shadow-md transition-all" key={item}>✨ {item}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
