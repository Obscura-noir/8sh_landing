"use client";

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Политика использования файлов cookie</h1>
      <p className="mb-4">Мы используем файлы cookie для обеспечения корректной работы сайта, анализа трафика и персонализации контента. Cookie помогают нам запоминать ваши предпочтения и улучшать пользовательский опыт.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Что такое cookie?</h2>
      <p className="mb-4">Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Как мы используем cookie</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Для аутентификации и безопасности</li>
        <li>Для анализа посещаемости и поведения пользователей</li>
        <li>Для запоминания пользовательских настроек</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Как управлять cookie</h2>
      <p className="mb-4">Вы можете отключить cookie в настройках вашего браузера, однако это может повлиять на работу сайта.</p>
      <p className="mt-8 text-gray-500 text-sm">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
    </div>
  );
} 