import { useEffect, useState } from 'react';
import { api } from '../api/client';

type User = { _id: string; name: string; email: string; role: string };

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get('/users');
      setUsers(res.data.items);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}