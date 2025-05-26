"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>
      <p className="mb-4">Ваша конфиденциальность важна для нас. Мы собираем и используем ваши данные только для предоставления и улучшения наших услуг. Мы не передаём ваши личные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Какие данные мы собираем</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Имя, email, компания и другие данные, которые вы указываете при регистрации</li>
        <li>Техническая информация: IP-адрес, тип устройства, браузер</li>
        <li>Данные о действиях на сайте для улучшения сервиса</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Как мы используем данные</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Для предоставления доступа к сервису</li>
        <li>Для связи с вами по вопросам поддержки</li>
        <li>Для аналитики и улучшения качества услуг</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Ваши права</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Вы можете запросить удаление или изменение своих данных</li>
        <li>Вы можете отказаться от рассылок</li>
      </ul>
      <p className="mt-8 text-gray-500 text-sm">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
    </div>
  );
} 