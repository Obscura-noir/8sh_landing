"use client";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <p className="mb-4">Свяжитесь с нами по любым вопросам:</p>
      <ul className="mb-4">
        <li>Email: <a href="mailto:2622610@gmail.com" className="text-primary underline">2622610@gmail.com</a></li>
        <li>Телефон: <a href="tel:++79102013999" className="text-primary underline">+7 (910) 201-39-99</a></li>
        <li>Адрес: 101000, Москва, Пресненская набережная 12</li>
      </ul>
      <p>Мы ответим вам в ближайшее время!</p>
    </div>
  );
} 