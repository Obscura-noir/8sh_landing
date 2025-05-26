"use client";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Условия использования</h1>
      <p className="mb-4">Пожалуйста, внимательно ознакомьтесь с условиями использования нашего сервиса. Используя сайт, вы соглашаетесь с этими условиями.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Вы обязуетесь предоставлять достоверную информацию при регистрации.</li>
        <li>Запрещено использовать сервис для противоправных действий.</li>
        <li>Мы можем изменять условия использования в любое время.</li>
        <li>Все права на контент сайта принадлежат Paynix.</li>
      </ul>
      <p className="mt-8 text-gray-500 text-sm">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
    </div>
  );
} 