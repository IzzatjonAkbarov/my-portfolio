const fs = require('fs');
const path = require('path');

const locales = ['en', 'uz', 'ru'];

const updates = {
  en: {
    'Language.switch': 'Switch Language',
    'Theme.toggle': 'Toggle Theme',
    'Hero.role': 'Frontend Developer',
    'About.russian': 'Russian — Conversational',
    'Experience.workTitle': 'Work Experience',
    'Experience.keyPages': 'Key Pages',
    'Experience.exp1.company': 'Forward School',
    'Experience.exp1.role': 'Frontend Developer',
    'Experience.exp1.period': 'April — August 2025',
    'Experience.exp1.description': 'Built an ERP system for a language learning center.',
    'Experience.exp1.pages': 'Admin panel, CEO panel, Teacher panel, Student panel',
    'Experience.exp2.company': 'EduCoin',
    'Experience.exp2.role': 'Frontend Developer',
    'Experience.exp2.period': 'December 2025 — February 2026',
    'Experience.exp2.description': 'Developed an LMS system with gamification features.',
    'Experience.exp2.pages': 'Admin panel, CEO panel, Teacher panel, Student panel',
    'Experience.edu1.institution': 'Najot Ta\'lim',
    'Experience.edu1.degree': 'Frontend Development Bootcamp',
    'Experience.edu1.period': '2024',
    'Experience.edu2.institution': 'Tashkent State University of Economics',
    'Experience.edu2.degree': "Bachelor's Degree",
    'Experience.edu2.period': '2025',
    'Projects.project1.name': 'Chatty',
    'Projects.project1.description': 'A real-time online chat application with instant messaging, JWT authentication, and 32 customizable color themes.',
    'Projects.project1.feature1': 'Real-Time Chat',
    'Projects.project1.feature2': 'Authentication',
    'Projects.project1.feature3': '32 Color Themes',
    'Projects.project1.feature4': 'WebSocket',
    'Projects.project1.liveUrl': '#',
    'Projects.project1.sourceUrl': '#',
    'Projects.sourceCode': 'Source Code',
    'Contact.namePlaceholder': 'Enter your name',
    'Contact.emailPlaceholder': 'Enter your email',
    'Contact.messagePlaceholder': 'Type your message...',
    'Contact.send': 'Send Message',
    'Contact.social': 'Social Profiles',
  },
  uz: {
    'Language.switch': 'Tilni o\'zgartirish',
    'Theme.toggle': 'Mavzuni o\'zgartirish',
    'Hero.role': 'Frontend Dasturchi',
    'About.russian': 'Rus tili — So\'zlashuv',
    'Experience.workTitle': 'Ish Tajribasi',
    'Experience.keyPages': 'Asosiy Sahifalar',
    'Experience.exp1.company': 'Forward School',
    'Experience.exp1.role': 'Frontend Dasturchi',
    'Experience.exp1.period': 'Aprel — Avgust 2025',
    'Experience.exp1.description': 'Til o\'rganish markazi uchun ERP tizimini yaratdim.',
    'Experience.exp1.pages': 'Admin, CEO, O\'qituvchi, Talaba panellari',
    'Experience.exp2.company': 'EduCoin',
    'Experience.exp2.role': 'Frontend Dasturchi',
    'Experience.exp2.period': 'Dekabr 2025 — Fevral 2026',
    'Experience.exp2.description': 'Geymifikatsiya xususiyatlariga ega LMS tizimi.',
    'Experience.exp2.pages': 'Admin, CEO, O\'qituvchi, Talaba panellari',
    'Experience.edu1.institution': 'Najot Ta\'lim',
    'Experience.edu1.degree': 'Frontend Dasturlash Bootkampi',
    'Experience.edu1.period': '2024',
    'Experience.edu2.institution': 'Toshkent Davlat Iqtisodiyot Universiteti',
    'Experience.edu2.degree': 'Bakalavr darajasi',
    'Experience.edu2.period': '2025',
    'Projects.project1.name': 'Chatty',
    'Projects.project1.description': 'Onlayn chat ilovasi, JWT autentifikatsiya va 32 mavzu.',
    'Projects.project1.feature1': 'Real-Vaqt Chati',
    'Projects.project1.feature2': 'Autentifikatsiya',
    'Projects.project1.feature3': '32 Rangli Mavzular',
    'Projects.project1.feature4': 'WebSocket',
    'Projects.project1.liveUrl': '#',
    'Projects.project1.sourceUrl': '#',
    'Projects.sourceCode': 'Manba Kodi',
    'Contact.namePlaceholder': 'Ismingizni kiriting',
    'Contact.emailPlaceholder': 'Pochtangizni kiriting',
    'Contact.messagePlaceholder': 'Xabaringizni yozing...',
    'Contact.send': 'Xabarni Yuborish',
    'Contact.social': 'Ijtimoiy Tarmoqlar',
  },
  ru: {
    'Language.switch': 'Сменить язык',
    'Theme.toggle': 'Переключить тему',
    'Hero.role': 'Frontend Разработчик',
    'About.russian': 'Русский — Разговорный',
    'Experience.workTitle': 'Опыт работы',
    'Experience.keyPages': 'Ключевые страницы',
    'Experience.exp1.company': 'Forward School',
    'Experience.exp1.role': 'Frontend Разработчик',
    'Experience.exp1.period': 'Апрель — Август 2025',
    'Experience.exp1.description': 'Создал ERP систему для центра изучения языков.',
    'Experience.exp1.pages': 'Панели: Админ, CEO, Учитель, Студент',
    'Experience.exp2.company': 'EduCoin',
    'Experience.exp2.role': 'Frontend Разработчик',
    'Experience.exp2.period': 'Декабрь 2025 — Февраль 2026',
    'Experience.exp2.description': 'Разработал LMS систему с геймификацией.',
    'Experience.exp2.pages': 'Панели: Админ, CEO, Учитель, Студент',
    'Experience.edu1.institution': 'Najot Ta\'lim',
    'Experience.edu1.degree': 'Буткемп Frontend Разработки',
    'Experience.edu1.period': '2024',
    'Experience.edu2.institution': 'Ташкентский Государственный Экономический Университет',
    'Experience.edu2.degree': 'Степень Бакалавра',
    'Experience.edu2.period': '2025',
    'Projects.project1.name': 'Chatty',
    'Projects.project1.description': 'Онлайн-чат с мгновенными сообщениями и JWT авторизацией.',
    'Projects.project1.feature1': 'Чат в реальном времени',
    'Projects.project1.feature2': 'Авторизация',
    'Projects.project1.feature3': '32 Темы',
    'Projects.project1.feature4': 'WebSocket',
    'Projects.project1.liveUrl': '#',
    'Projects.project1.sourceUrl': '#',
    'Projects.sourceCode': 'Исходный код',
    'Contact.namePlaceholder': 'Введите ваше имя',
    'Contact.emailPlaceholder': 'Введите ваш email',
    'Contact.messagePlaceholder': 'Введите сообщение...',
    'Contact.send': 'Отправить сообщение',
    'Contact.social': 'Социальные сети',
  }
};

for (const locale of locales) {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const [flatKey, value] of Object.entries(updates[locale])) {
    const parts = flatKey.split('.');
    let current = data;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('Patched missing translations.');
