"use client";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Центр помощи</h1>
      <p className="mb-4">Добро пожаловать в центр помощи! Здесь вы найдёте ответы на часто задаваемые вопросы и сможете связаться с нашей службой поддержки.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Часто задаваемые вопросы</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Как зарегистрироваться на платформе?</li>
        <li>Как восстановить пароль?</li>
        <li>Как связаться с поддержкой?</li>
        <li>Как удалить аккаунт?</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Связаться с поддержкой</h2>
      <p className="mb-4">Если вы не нашли ответа на свой вопрос, напишите нам на <a href="mailto:support@globalpay.com" className="text-primary underline">support@globalpay.com</a> — мы обязательно поможем!</p>
    </div>
  );
} 