"use client";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <p className="mb-4">Свяжитесь с нами по любым вопросам:</p>
      <ul className="mb-4">
        <li>Email: <a href="mailto:support@paynix.com" className="text-primary underline">support@paynix.com</a></li>
        <li>Телефон: <a href="tel:+15551234567" className="text-primary underline">+1 (555) 123-4567</a></li>
        <li>Адрес: 123 Financial District, New York, NY 10004</li>
      </ul>
      <p>Мы ответим вам в ближайшее время!</p>
    </div>
  );
} 