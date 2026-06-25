import { api } from '../api.js';
import ModuleHeader from '../components/ModuleHeader.jsx';
import Panel from '../components/Panel.jsx';

export default function Roles({ users, reload }) {
  async function updateRole(userId, role) {
    await api(`/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    });
    reload();
  }

  return (
    <>
      <ModuleHeader eyebrow="Modulo 2" title="Roles" description="Cambia el rol de cualquier usuario registrado." />
      <Panel title="Usuarios">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-neutral-500">
              <tr><th className="py-2">Nombre</th><th>Correo</th><th>Rol</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b border-neutral-100" key={user.id}>
                  <td className="py-3 font-medium">{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <select className="rounded-lg border border-primary-300 px-3 py-2 font-semibold text-primary-700 bg-primary-50 transition-all focus:ring-2 focus:ring-primary-300" value={user.role} onChange={(event) => updateRole(user.id, event.target.value)}>
                        <option value="student">Estudiante</option>
                        <option value="instructor">Docente</option>
                        <option value="admin">Administrador</option>
                        <option value="parent">Padre de familia</option>
                      </select>
                      {user.role === 'student' && (
                        <button type="button" onClick={async () => {
                          const parentEmail = window.prompt('Correo del padre (registrado):');
                          if (!parentEmail) return;
                          const parent = await api(`/users`).then(list => list.find(u => u.email === parentEmail && u.role === 'parent'));
                          if (!parent) return alert('No se encontro padre registrado con ese correo');
                          try {
                            await api('/users/parents/relations', { method: 'POST', body: JSON.stringify({ parentId: parent.id, childId: user.id }) });
                            alert('Padre vinculado correctamente');
                            reload();
                          } catch (err) {
                            alert(err.message || 'Error vincular padre');
                          }
                        }} className="text-sm bg-neutral-50 border border-neutral-200 px-2 py-1 rounded-md hover:bg-neutral-100">Vincular padre</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
