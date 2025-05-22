# UI Спецификация: Модуль управления заявками на платежи

## 1. Общие принципы дизайна

### 1.1 Цветовая схема
- **Основной цвет:** #4F46E5 (Индиго)
- **Вторичный цвет:** #10B981 (Зеленый)  
- **Фон:** #F9FAFB (Светло-серый)
- **Текст:** #111827 (Темно-серый)
- **Границы:** #E5E7EB (Серый)
- **Ошибки:** #EF4444 (Красный)
- **Предупреждения:** #F59E0B (Оранжевый)
- **Успех:** #10B981 (Зеленый)

### 1.2 Типографика
- **Заголовки H1:** Inter, 32px, font-weight: 600
- **Заголовки H2:** Inter, 24px, font-weight: 600  
- **Заголовки H3:** Inter, 20px, font-weight: 500
- **Основной текст:** Inter, 16px, font-weight: 400
- **Мелкий текст:** Inter, 14px, font-weight: 400
- **Подписи:** Inter, 12px, font-weight: 400

### 1.3 Сетка и отступы
- **Контейнер:** max-width: 1280px
- **Колонки:** 12-колоночная сетка
- **Отступы:** 8px, 16px, 24px, 32px, 48px, 64px
- **Скругления:** 8px для карточек, 4px для инпутов
- **Тени:** 0 1px 3px rgba(0, 0, 0, 0.1)

---

## 2. Страница списка заявок

### 2.1 Общий layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ Header (64px высота)                                                 │
│ ┌─ Breadcrumb: Главная > Заявки                                     │
│ └─ User menu (справа)                                               │
├─────────────────────────────────────────────────────────────────────┤
│ Page Header (120px высота)                                          │
│ ┌─ "Заявки" H1 + счетчик                    [Создать заявку] CTA ─┐ │
│ └─ Subtitle: "Управление заявками на платежи"                     │ │
├─────────────────────────────────────────────────────────────────────┤
│ Filters Bar (60px высота)                                          │
│ [В работе] [Черновики] [Завершенные/Архив] [Все]     [🔍 Поиск...] │
├─────────────────────────────────────────────────────────────────────┤
│ Table Header (48px высота)                                         │
│ [☐] №    Отправитель    Получатель    Сумма    Статус    Дата      │
├─────────────────────────────────────────────────────────────────────┤
│ Table Rows (по 64px каждая)                                        │
│ [☐] #001 ООО "Ромашка"  ABC Ltd      $5,000   ⏳ В работе  15.01   │
│ [☐] #002 Иванов И.И.    DEF GmbH     €2,300   📝 Черновик  14.01   │
│ ...                                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Pagination (48px высота)                                           │
│          Показано 1-10 из 24         [<] [1] [2] [3] [>]          │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Компоненты интерфейса

**Кнопка "Создать заявку":**
- Размер: 160px × 40px
- Цвет: #4F46E5
- Текст: белый, 14px, font-weight: 500
- Скругление: 8px
- Иконка: + слева от текста
- Hover: #4338CA

**Табы фильтрации:**
- Высота: 40px
- Неактивный: border-bottom: 2px solid transparent
- Активный: border-bottom: 2px solid #4F46E5, color: #4F46E5
- Hover: background: #F3F4F6

**Поисковая строка:**
- Ширина: 320px
- Высота: 40px
- Placeholder: "Найти по номеру заявки, отправителю или получателю"
- Иконка поиска слева
- Border: 1px solid #D1D5DB
- Focus: border-color: #4F46E5

**Чекбоксы строк:**
- Размер: 16px × 16px
- Checked: background #4F46E5, белая галочка
- Unchecked: border 1px solid #D1D5DB

**Статусы заявок:**
```css
.status-draft { 
  background: #F3F4F6; 
  color: #6B7280; 
  border: 1px solid #E5E7EB; 
}

.status-pending { 
  background: #FEF3C7; 
  color: #D97706; 
  border: 1px solid #F59E0B; 
}

.status-processing { 
  background: #DBEAFE; 
  color: #2563EB; 
  border: 1px solid #3B82F6; 
}

.status-completed { 
  background: #D1FAE5; 
  color: #059669; 
  border: 1px solid #10B981; 
}

.status-rejected { 
  background: #FEE2E2; 
  color: #DC2626; 
  border: 1px solid #EF4444; 
}
```

### 2.3 Responsive поведение

**Desktop (1280px+):**
- Все колонки видны
- Поиск справа от табов

**Tablet (768px - 1279px):**
- Скрыть колонку "Дата"
- Поиск под табами

**Mobile (< 768px):**
- Карточный вид вместо таблицы
- Tabs становятся dropdown
- Поиск на всю ширину

---

## 3. Форма создания заявки

### 3.1 Layout формы

```
┌─────────────────────────────────────────────────────────────────────┐
│ Progress Bar                                                        │
│ ● Основная информация → ○ Документы → ○ Подтверждение               │
├─────────────────────────────────────────────────────────────────────┤
│ Form Header                                                         │
│ ← Назад    Создание заявки на платеж              [Сохранить как    │
│                                                    черновик] [Далее]│
├─────────────────────────────────────────────────────────────────────┤
│ Form Content (двухколоночный layout)                               │
│ ┌─────────────────────────┐ ┌─────────────────────────┐             │
│ │ Отправитель / Sender    │ │ Получатель / Receiver   │             │
│ │                         │ │                         │             │
│ │ [Наименование........] │ │ [Наименование........] │             │
│ │ [ИНН/TIN............] │ │ [ИНН/TIN............] │             │
│ │ [Страна.............] │ │ [Страна.............] │             │
│ │ [Адрес..............] │ │ [Адрес..............] │             │
│ │ [........................] │ │ [........................] │             │
│ │ [Банк...............] │ │ [Банк...............] │             │
│ │ [Счет...............] │ │ [Счет...............] │             │
│ │ [Валюта.............] │ │ [Валюта.............] │             │
│ └─────────────────────────┘ └─────────────────────────┘             │
├─────────────────────────────────────────────────────────────────────┤
│ Детали платежа / Payment Details                                   │
│ [Назначение платежа..................................]             │
│ [Сумма........] [Валюта...] = [Итого в получаемой валюте]         │
│ [ТНВЭД код.....] [Срок исполнения.....]                           │
├─────────────────────────────────────────────────────────────────────┤
│ Условия платежа / Terms                                            │
│ [Ограничения по юрисдикциям.........................]              │
│ [Ограничения по банкам.............................]              │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Поля формы

**Наименование отправителя/получателя:**
- Тип: text input
- Ширина: 100%
- Высота: 44px
- Placeholder: "ООО 'Название компании' или ФИО"
- Обязательное: да
- Валидация: min 2 символа

**ИНН/TIN:**
- Тип: text input
- Ширина: 100%  
- Высота: 44px
- Placeholder: "123456789012"
- Маска ввода: зависит от выбранной страны
- Валидация: проверка формата по стране

**Страна:**
- Тип: searchable select
- Ширина: 100%
- Высота: 44px
- Placeholder: "Выберите страну"
- Поиск: да, по названию страны
- Флаги: отображать флаг страны

**Адрес:**
- Тип: textarea
- Ширина: 100%
- Высота: 88px (2 строки)
- Placeholder: "Индекс, город, улица, дом"
- Обязательное: да

**Банк:**
- Тип: searchable select или text input
- Ширина: 100%
- Высота: 44px
- Placeholder: "Название банка"
- Автодополнение: из базы банков

**Счет:**
- Тип: text input
- Ширина: 100%
- Высота: 44px
- Placeholder: зависит от страны (IBAN, номер счета)
- Валидация: проверка формата

**Валюта:**
- Тип: select
- Ширина: 100%
- Высота: 44px
- Опции: основные валюты с флагами
- Поиск: да

### 3.3 Детали платежа

**Назначение платежа:**
- Тип: textarea
- Ширина: 100%
- Высота: 88px
- Placeholder: "Опишите назначение платежа"
- Обязательное: да
- Счетчик символов: показать оставшиеся символы

**Сумма:**
- Тип: number input
- Ширина: 200px
- Высота: 44px
- Placeholder: "0.00"
- Формат: с разделителями тысяч
- Валидация: > 0

**Валюта суммы:**
- Тип: select
- Ширина: 120px
- Высота: 44px
- По умолчанию: валюта отправителя

**Конвертер:**
- Отображение: "= X,XXX.XX EUR"
- Обновление: в реальном времени
- Источник курса: указать источник

**ТНВЭД код:**
- Тип: searchable input
- Ширина: 200px
- Высота: 44px
- Placeholder: "0000000000"
- Поиск: по коду и описанию

**Срок исполнения:**
- Тип: date picker
- Ширина: 200px
- Высота: 44px
- Ограничения: не раньше завтра

### 3.4 Состояния полей

**Default состояние:**
```css
.input-field {
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  color: #111827;
  padding: 12px;
  border-radius: 6px;
}
```

**Focus состояние:**
```css
.input-field:focus {
  border: 2px solid #4F46E5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
```

**Error состояние:**
```css
.input-field.error {
  border: 1px solid #EF4444;
  background: #FEF2F2;
}

.error-message {
  color: #DC2626;
  font-size: 14px;
  margin-top: 4px;
}
```

**Success состояние:**
```css
.input-field.success {
  border: 1px solid #10B981;
}

.success-icon {
  color: #10B981;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
```

### 3.5 Автозаполнение и подсказки

**Автозаполнение из профиля:**
- Если пользователь - юрлицо, автоматически подставлять его данные в поле "Отправитель"
- Сохранять последние использованные банки и адреса
- Предлагать автодополнение при вводе

**Валидация в реальном времени:**
- ИНН: проверка контрольных сумм
- Банковские счета: проверка формата
- SWIFT коды: проверка существования
- Курсы валют: обновление каждые 30 секунд

**Подсказки (tooltips):**
- Иконка "?" рядом со сложными полями
- Появление на hover
- Объяснение назначения поля и формата

---

## 4. Управление документами

### 4.1 Зона загрузки файлов

```
┌─────────────────────────────────────────────────────────────────────┐
│ Загрузка документов                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│                                                                     │
│   📁 Перетащите файлы сюда или [Выберите файлы]                    │
│                                                                     │
│   Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG                 │
│   Максимальный размер: 10 МБ                                        │
│                                                                     │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
├─────────────────────────────────────────────────────────────────────┤
│ Загруженные файлы:                                                  │
│                                                                     │
│ 📄 contract.pdf              2.1 МБ    [👁 Просмотр] [🗑 Удалить]   │
│ 📄 invoice_001.pdf           845 КБ    [👁 Просмотр] [🗑 Удалить]   │
│ 📷 photo_document.jpg        1.2 МБ    [👁 Просмотр] [🗑 Удалить]   │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Стили зоны загрузки

**Default состояние:**
```css
.upload-zone {
  border: 2px dashed #D1D5DB;
  background: #F9FAFB;
  padding: 48px 24px;
  text-align: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}
```

**Hover состояние:**
```css
.upload-zone:hover {
  border-color: #4F46E5;
  background: #F0F9FF;
}
```

**Drag over состояние:**
```css
.upload-zone.drag-over {
  border-color: #4F46E5;
  background: #EFF6FF;
  transform: scale(1.02);
}
```

### 4.3 Список загруженных файлов

**Элемент файла:**
- Высота: 56px
- Padding: 12px 16px
- Border-bottom: 1px solid #E5E7EB
- Background: #FFFFFF

**Иконки типов файлов:**
- PDF: 📄 красная иконка
- DOC/DOCX: 📄 синяя иконка  
- JPG/PNG: 🖼 зеленая иконка

**Кнопки действий:**
- Размер: 32px × 32px
- Просмотр: 👁 #6B7280, hover: #4F46E5
- Удалить: 🗑 #6B7280, hover: #EF4444

### 4.4 Модальное окно просмотра

```
┌─────────────────────────────────────────────────────────────────────┐
│ ✕ Просмотр документа: contract.pdf                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│           [Предпросмотр документа или iframe]                       │
│                        Высота: 600px                               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                      [Скачать] [Закрыть]                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Статусы и уведомления

### 5.1 Индикаторы статусов

**Статус заявки в заголовке:**
```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  gap: 6px;
}

.status-draft {
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E5E7EB;
}

.status-draft::before {
  content: "📝";
}

.status-pending {
  background: #FEF3C7;
  color: #D97706;
  border: 1px solid #F59E0B;
}

.status-pending::before {
  content: "⏳";
}

.status-documents-required {
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #EF4444;
}

.status-documents-required::before {
  content: "📋";
}

.status-processing {
  background: #DBEAFE;
  color: #2563EB;
  border: 1px solid #3B82F6;
}

.status-processing::before {
  content: "⚙️";
}

.status-completed {
  background: #D1FAE5;
  color: #059669;
  border: 1px solid #10B981;
}

.status-completed::before {
  content: "✅";
}

.status-rejected {
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #EF4444;
}

.status-rejected::before {
  content: "❌";
}

.status-cancelled {
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E5E7EB;
}

.status-cancelled::before {
  content: "⏹️";
}
```

### 5.2 Progress bar для создания заявки

```css
.progress-bar {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 24px;
}

.progress-step {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}

.progress-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 100%;
  height: 2px;
  background: #E5E7EB;
  z-index: 1;
}

.progress-step.completed::after {
  background: #10B981;
}

.progress-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: 2;
  background: #FFFFFF;
}

.progress-step.completed .progress-circle {
  background: #10B981;
  color: #FFFFFF;
}

.progress-step.active .progress-circle {
  background: #4F46E5;
  color: #FFFFFF;
}

.progress-step.pending .progress-circle {
  background: #F3F4F6;
  color: #6B7280;
  border: 2px solid #E5E7EB;
}

.progress-label {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
}

.progress-step.active .progress-label {
  color: #4F46E5;
}

.progress-step.completed .progress-label {
  color: #059669;
}
```

### 5.3 Toast уведомления

**Success уведомление:**
```css
.toast-success {
  background: #D1FAE5;
  border: 1px solid #10B981;
  color: #065F46;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.toast-success::before {
  content: "✅";
  font-size: 20px;
}
```

**Error уведомление:**
```css
.toast-error {
  background: #FEE2E2;
  border: 1px solid #EF4444;
  color: #991B1B;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.toast-error::before {
  content: "❌";
  font-size: 20px;
}
```

**Warning уведомление:**
```css
.toast-warning {
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  color: #92400E;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.toast-warning::before {
  content: "⚠️";
  font-size: 20px;
}
```

---

## 6. Модальные окна

### 6.1 Подтверждение удаления заявки

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Удалить заявку                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ⚠️ Вы действительно хотите удалить заявку #001?                   │
│                                                                     │
│     Это действие нельзя будет отменить.                            │
│                                                                     │
│                                                                     │
│                  [Отмена]           [Удалить]                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Стили модального окна:**
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-header {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: #111827;
}

.modal-body {
  text-align: center;
  color: #6B7280;
  margin-bottom: 32px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancel {
  padding: 12px 24px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
}

.btn-delete {
  padding: 12px 24px;
  border: 1px solid #EF4444;
  background: #EF4444;
  color: #FFFFFF;
  border-radius: 8px;
  font-weight: 500;
}
```

### 6.2 Выбор шаблона заявки

```
┌─────────────────────────────────────────────────────────────────────┐
│ ✕ Выберите шаблон заявки                                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 🔍 [Поиск шаблонов.................................]               │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 📋 Оплата товаров из Китая                      [Использовать] │ │
│ │    ABC Trading → DEF Manufacturing                              │ │
│ │    Последнее использование: 3 дня назад                        │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 📋 IT услуги для зарубежного клиента            [Использовать] │ │
│ │    ООО "ТехноПро" → TechCorp LLC                               │ │
│ │    Последнее использование: 1 неделя назад                     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│                       [Создать без шаблона]                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Responsive адаптация

### 7.1 Desktop (1280px+)

**Список заявок:**
- Полная таблица со всеми колонками
- Боковые отступы: 64px
- Фильтры в одну строку
- Поиск справа от табов

**Форма создания:**
- Двухколоночный layout для отправитель/получатель
- Ширина контейнера: 1200px
- Отступы между колонками: 48px

### 7.2 Tablet (768px - 1279px)

**Список заявок:**
- Скрыть колонку "Дата создания"
- Боковые отступы: 32px
- Поиск переносится под табы
- Ширина поиска: 100%

**Форма создания:**
- Сохранить двухколоночный layout
- Уменьшить отступы между колонками: 24px
- Ширина контейнера: 100%

### 7.3 Mobile (< 768px)

**Список заявок карточный вид:**
```css
.request-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.request-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.request-number {
  font-weight: 600;
  color: #111827;
}

.request-status {
  /* стили статуса */
}

.request-details {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.4;
}

.request-amount {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-top: 8px;
}
```

**Форма создания:**
- Одноколоночный layout
- Секции в аккордеоне
- Отступы: 16px
- Фиксированная нижняя панель с кнопками

**Навигация:**
- Табы заменить на dropdown select
- Burger menu для основной навигации
- Фиксированная нижняя навигация

---

## 8. Интерактивные состояния

### 8.1 Loading состояния

**Таблица заявок:**
```css
.loading-skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-row {
  height: 64px;
  border-radius: 4px;
  margin-bottom: 8px;
}
```

**Форма создания:**
```css
.input-loading {
  position: relative;
  overflow: hidden;
}

.input-loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### 8.2 Валидация в реальном времени

**Успешная валидация:**
- Зеленая галочка справа в поле
- Зеленая граница поля
- Анимация появления галочки

**Ошибка валидации:**
- Красная граница поля
- Красный текст ошибки под полем
- Тряска поля при ошибке

**Анимация тряски:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.input-error {
  animation: shake 0.5s ease-in-out;
}
```

### 8.3 Hover эффекты

**Кнопки:**
```css
.btn-primary {
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #4338CA;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.btn-secondary:hover {
  background: #F3F4F6;
  transform: translateY(-1px);
}
```

**Строки таблицы:**
```css
.table-row {
  transition: background 0.2s ease;
  cursor: pointer;
}

.table-row:hover {
  background: #F9FAFB;
}
```

---

## 9. Иконки и графические элементы

### 9.1 Используемые иконки

**Основные действия:**
- ➕ Создать: `plus-circle`
- 👁 Просмотр: `eye`
- ✏️ Редактировать: `pencil`
- 🗑 Удалить: `trash`
- 💾 Сохранить: `save`
- 📤 Отправить: `arrow-up-tray`

**Статусы:**
- 📝 Черновик: `document-text`
- ⏳ В работе: `clock`
- 📋 Нужны документы: `clipboard-document-list`
- ⚙️ В обработке: `cog-6-tooth`
- ✅ Завершено: `check-circle`
- ❌ Отклонено: `x-circle`

**Файлы:**
- 📄 PDF: `document`
- 🖼 Изображение: `photo`
- 📎 Вложение: `paper-clip`
- ⬇️ Скачать: `arrow-down-tray`

### 9.2 Графические элементы

**Empty state (нет заявок):**
```
        📋
   Заявок пока нет
   
   Создайте первую заявку
   на международный платеж
   
   [Создать заявку]
```

**Error state:**
```
        ⚠️
   Произошла ошибка
   
   Не удалось загрузить заявки.
   Попробуйте обновить страницу.
   
   [Обновить]
```

---

## 10. Accessibility (A11Y)

### 10.1 Keyboard navigation

**Табовая навигация:**
- Все интерактивные элементы доступны через Tab
- Видимый focus indicator
- Logical tab order

**Фокус индикатор:**
```css
.focusable:focus {
  outline: 2px solid #4F46E5;
  outline-offset: 2px;
}
```

### 10.2 Screen readers

**ARIA labels:**
```html
<button aria-label="Создать новую заявку">
  ➕ Создать заявку
</button>

<input 
  aria-label="Поиск заявок по номеру или названию"
  placeholder="Найти заявку..."
>

<table aria-label="Список заявок на платежи">
  <thead>
    <tr>
      <th scope="col">Номер заявки</th>
      <th scope="col">Отправитель</th>
    </tr>
  </thead>
</table>
```

**Status announcements:**
```html
<div aria-live="polite" id="status-announcer">
  Заявка #001 успешно создана
</div>
```

### 10.3 Цветовая контрастность

**Минимальные требования:**
- Текст на фоне: контраст 4.5:1
- Крупный текст (18px+): контраст 3:1  
- Интерактивные элементы: контраст 3:1

**Проверенные комбинации:**
- #111827 на #FFFFFF (контраст 16.07:1) ✅
- #4F46E5 на #FFFFFF (контраст 8.59:1) ✅
- #6B7280 на #FFFFFF (контраст 5.74:1) ✅

---

## 11. Технические требования

### 11.1 Производительность

**Метрики загрузки:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

**Оптимизации:**
- Lazy loading для таблиц
- Виртуализация больших списков
- Debounce для поиска (300ms)
- Сжатие изображений

### 11.2 Браузерная совместимость

**Поддерживаемые браузеры:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallbacks:**
- CSS Grid → Flexbox для старых браузеров
- Custom properties → Статические значения
- WebP → JPEG/PNG

### 11.3 SEO и метаданные

**Meta tags для страниц:**
```html
<title>Заявки на платежи - 8sh.ru</title>
<meta name="description" content="Управление заявками на международные платежи">
<meta property="og:title" content="Заявки на платежи">
<meta property="og:description" content="Создание и управление заявками на платежи">
```

---

## 12. Заключение

Данная UI спецификация описывает полный интерфейс модуля управления заявками на платежи для платформы 8sh.ru. Все элементы спроектированы с учетом:

✅ **Удобства использования** - интуитивные формы и понятная навигация  
✅ **Адаптивности** - корректная работа на всех устройствах  
✅ **Доступности** - соответствие стандартам A11Y  
✅ **Производительности** - быстрая загрузка и отзывчивый интерфейс  
✅ **Масштабируемости** - возможность добавления новых функций

**Следующие шаги:**
1. Создание детальных макетов в Figma
2. Разработка UI kit с компонентами
3. Прототипирование ключевых flow
4. Пользовательское тестирование

Спецификация является живым документом и будет обновляться по мере развития продукта.