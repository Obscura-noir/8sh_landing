"use client";

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Часто задаваемые вопросы (FAQ)</h1>
      <ul className="list-disc pl-6 mb-4">
        <li><b>Как зарегистрироваться?</b> — Перейдите на страницу регистрации и заполните форму.</li>
        <li><b>Как восстановить пароль?</b> — Используйте ссылку "Забыли пароль?" на странице входа.</li>
        <li><b>Как изменить данные профиля?</b> — Войдите в личный кабинет и отредактируйте профиль.</li>
        <li><b>Как связаться с поддержкой?</b> — Напишите на <a href="mailto:support@paynix.com" className="text-primary underline">support@paynix.com</a>.</li>
      </ul>
    </div>
  );
} 