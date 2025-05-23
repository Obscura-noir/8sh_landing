import Image from "next/image";

export default function ProfilePage() {
  // TODO: получить реальные данные пользователя через Supabase или context
  const user = {
    name: "Иван",
    company: "ООО Ай Эс Менеджмент",
    role: "Менеджер",
    email: "ivan@example.com",
  };
  return (
    <div className="min-h-screen flex bg-[#f9f5f3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f9f5f3] flex flex-col items-center pt-8 border-r border-gray-200">
        <Image src="/logo-realpay.png" alt="REALPAY" width={160} height={40} className="mb-8" />
        <nav className="flex flex-col gap-4 w-full px-6">
          <a href="#" className="text-lg font-semibold text-indigo-700">Заявки</a>
          <a href="#" className="text-lg text-gray-500">Профиль</a>
        </nav>
        <div className="mt-auto mb-8 text-xs text-gray-400">
          Пользовательское соглашение
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{user.name}</div>
          <div className="text-gray-500 mb-1">{user.company}</div>
          <div className="text-gray-400 mb-4">{user.role}</div>
          <div className="w-full border-t border-gray-100 my-4"></div>
          <div className="w-full flex flex-col gap-2 mb-4">
            <div className="flex justify-between text-gray-600"><span>Email:</span> <span>{user.email}</span></div>
          </div>
          <button className="mt-4 px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Выйти</button>
        </div>
      </main>
    </div>
  );
} 