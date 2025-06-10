import Link from 'next/link'

const navigation = {
  solutions: [
    { name: 'AI-аудит', href: '#services' },
    { name: 'Пилотный проект', href: '#services' },
    { name: 'Полное внедрение', href: '#services' },
    { name: 'Поддержка', href: '#services' },
  ],
  industries: [
    { name: 'Финансы', href: '#industries' },
    { name: 'Строительство', href: '#industries' },
    { name: 'Сельское хозяйство', href: '#industries' },
    { name: 'Производство', href: '#industries' },
  ],
  company: [
    { name: 'О нас', href: '#about' },
    { name: 'Процесс работы', href: '#process' },
    { name: 'Кейсы', href: '#industries' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Политика конфиденциальности', href: '#' },
    { name: 'Договор оферты', href: '#' },
    { name: 'Реквизиты', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container-custom py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Catalyst Lab
            </Link>
            <p className="text-gray-400 text-sm">
              Цифровая Лаборатория Каталист — ваш проводник в мир российского AI. 
              Помогаем бизнесу расти с помощью искусственного интеллекта.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56c-.21 2.27-1.12 7.79-1.58 10.34-.2 1.08-.58 1.44-.95 1.48-.81.08-1.43-.54-2.22-1.05-1.23-.81-1.93-1.31-3.12-2.1-1.38-.91-.49-1.41.3-2.23.21-.21 3.82-3.5 3.89-3.8.01-.04 0-.17-.1-.24-.1-.07-.25-.05-.36-.03-.15.03-2.58 1.64-7.29 4.82-.69.5-1.31.74-1.87.73-.62-.01-1.8-.35-2.69-.63-1.08-.35-1.94-.53-1.87-1.12.04-.31.47-.63 1.31-.94 5.15-2.24 8.6-3.72 10.33-4.44 4.92-2.03 5.94-2.38 6.6-2.39.15 0 .47.03.68.2.18.13.23.31.25.46.02.09.05.32.03.49z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">VK</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.033-1.49-1.173-1.744-1.173-.356 0-.458.102-.458.593v1.56c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Решения
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Отрасли
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.industries.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Компания
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Документы
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 Цифровая Лаборатория Каталист. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
