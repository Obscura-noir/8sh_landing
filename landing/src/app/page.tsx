"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteIcon from '@mui/icons-material/Route';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

const personas = {
  freelancer: {
    headline: "Международные платежи для фрилансеров с умной оптимизацией",
    sub: "Быстро, дешево, без банковских сложностей. Получите персональную рекомендацию за 30 секунд!",
    cta: "Рассчитать стоимость для фрилансера",
    color: "bg-indigo-600",
  },
  business: {
    headline: "Платежи для бизнеса: надежно и прозрачно",
    sub: "Стабильные маршруты, минимальные риски, прозрачные условия. Получите корпоративную рекомендацию!",
    cta: "Создать корпоративную заявку",
    color: "bg-green-600",
  },
  crypto: {
    headline: "DeFi и стейблкоины для инвесторов",
    sub: "Стабильная доходность, быстрый доступ к DeFi, подбор лучших программ.",
    cta: "Узнать о стейблкоин-программах",
    color: "bg-yellow-500",
  },
  general: {
    headline: "Международные платежи с умной оптимизацией",
    sub: "Сравните 50+ способов перевода и получите персональную рекомендацию за 30 секунд.",
    cta: "Получить рекомендацию",
    color: "bg-indigo-600",
  },
};

function detectPersona() {
  if (typeof window === "undefined") return "general";
  const url = new URL(window.location.href);
  const utm = url.searchParams.get("utm_source") || "";
  const ref = document.referrer || "";
  const campaign = url.searchParams.get("utm_campaign") || "";
  if (utm.includes("freelance") || /upwork|freelancer/i.test(ref)) return "freelancer";
  if (utm.includes("business") || navigator.language === "en") return "business";
  if (campaign.includes("crypto")) return "crypto";
  return "general";
}

export default function LandingPage() {
  const [persona, setPersona] = useState<keyof typeof personas>("general");
  const [showModal, setShowModal] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login'|'register'>('login');
  const [calc, setCalc] = useState({ from: '', to: '', amount: '', currency: '' });
  const [expanded, setExpanded] = useState<number | false>(false);
  useEffect(() => {
    setPersona(detectPersona() as keyof typeof personas);
  }, []);
  const p = personas[persona];

  // Функция для отправки заявки в Telegram (заглушка)
  async function sendToTelegram(data: { name: string; company: string; contact: string; comment: string }) {
    // TODO: заменить на реальный endpoint Telegram-бота
    await fetch("/api/send-corp-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handleCorporateClick() {
    setShowModal(true);
  }

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: '#fff', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ maxWidth: 1440, mx: 'auto', width: '100%' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }} component="a" href="#" aria-label="8sh.ru">8sh<span style={{ color: '#222' }}>.ru</span></Typography>
          <Stack direction="row" spacing={2}>
            <Button color="primary" href="#solutions">Решения</Button>
            <Button color="primary" href="#pricing">Тарифы</Button>
            <Button color="primary" href="#reviews">Отзывы</Button>
            <Button color="primary" href="#faq">FAQ</Button>
            <Button color="primary" href="#contact">Контакты</Button>
          </Stack>
          <Button variant="outlined" color="primary" sx={{ ml: 3 }} href="#login">Войти</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" sx={{ fontWeight: 800, fontSize: { xs: 36, md: 56 }, mb: 2, letterSpacing: -1 }}>{p.headline}</Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}>{p.sub}</Typography>
          <Button size="large" variant="contained" color="secondary" sx={{ fontWeight: 700, px: 6, py: 2, borderRadius: 99 }} onClick={handleCorporateClick}>{p.cta}</Button>
        </Container>
      </Box>

      {/* Benefits */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="benefits">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><CheckCircleIcon color="primary" fontSize="large" /></Box>
                <Typography variant="subtitle1" fontWeight={600}>Комиссии от 0.5%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><AccessTimeIcon color="primary" fontSize="large" /></Box>
                <Typography variant="subtitle1" fontWeight={600}>Переводы от 10 минут</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><RouteIcon color="primary" fontSize="large" /></Box>
                <Typography variant="subtitle1" fontWeight={600}>Система подбирает лучший маршрут</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><CurrencyExchangeIcon color="primary" fontSize="large" /></Box>
                <Typography variant="subtitle1" fontWeight={600}>50+ валют и способов</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Calculator */}
      <Container maxWidth="md" sx={{ py: 8 }} id="calculator">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>Калькулятор перевода</Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Откуда" fullWidth value={calc.from} onChange={e => setCalc({ ...calc, from: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Куда" fullWidth value={calc.to} onChange={e => setCalc({ ...calc, to: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Сумма" type="number" fullWidth value={calc.amount} onChange={e => setCalc({ ...calc, amount: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Валюта" fullWidth value={calc.currency} onChange={e => setCalc({ ...calc, currency: e.target.value })} />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" size="large">Рассчитать</Button>
        </Paper>
      </Container>

      {/* Problems & Solutions */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="solutions">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={2}>❌ Знакомо?</Typography>
                <Stack spacing={1}>
                  <Typography>• Банк задерживает перевод на недели</Typography>
                  <Typography>• Скрытые комиссии съедают 3-5% суммы</Typography>
                  <Typography>• Часами ищете надежного агента</Typography>
                  <Typography>• Боитесь потерять деньги из-за санкций</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={2}>✅ 8sh решает эти проблемы:</Typography>
                <Stack spacing={1}>
                  <Typography>• Система находит самый выгодный маршрут за 30 секунд</Typography>
                  <Typography>• Прозрачные тарифы без скрытых комиссий</Typography>
                  <Typography>• Только проверенные провайдеры с рейтингом 4.5+</Typography>
                  <Typography>• Соответствие всем требованиям валютного законодательства</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Smart Features */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="features">
        <Typography variant="h4" fontWeight={700} mb={4} align="center">Smart-возможности платформы</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><MonetizationOnIcon color="primary" fontSize="large" /></Box>
                <Typography variant="h6" fontWeight={700}>Калькулятор</Typography>
                <Typography variant="body2" color="text.secondary">Мгновенно рассчитывает лучшие маршруты перевода с учетом комиссии, скорости и надежности.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><RouteIcon color="primary" fontSize="large" /></Box>
                <Typography variant="h6" fontWeight={700}>Smart Routing</Typography>
                <Typography variant="body2" color="text.secondary">Система анализирует 50+ способов и выбирает оптимальный путь для вашей задачи.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}><AccountCircleIcon color="primary" fontSize="large" /></Box>
                <Typography variant="h6" fontWeight={700}>Персонализация</Typography>
                <Typography variant="body2" color="text.secondary">Контент и рекомендации подстраиваются под ваш профиль и цели.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Comparison Table */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="pricing">
        <Typography variant="h4" fontWeight={700} mb={4} align="center">📊 Сравнение с конкурентами</Typography>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Платформа</TableCell>
                <TableCell>Комиссия</TableCell>
                <TableCell>Скорость</TableCell>
                <TableCell>Рекомендации</TableCell>
                <TableCell>Отзывы</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>8sh.ru</TableCell>
                <TableCell>от 0.5%</TableCell>
                <TableCell>от 10 минут</TableCell>
                <TableCell><CheckCircleIcon color="success" /></TableCell>
                <TableCell>4.8/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>RealPay</TableCell>
                <TableCell>1.5-3%</TableCell>
                <TableCell>1-7 дней</TableCell>
                <TableCell><CloseIcon color="error" /></TableCell>
                <TableCell>4.2/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SWIFT</TableCell>
                <TableCell>2-5%</TableCell>
                <TableCell>2-10 дней</TableCell>
                <TableCell><CloseIcon color="error" /></TableCell>
                <TableCell>3.9/5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Reviews */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="reviews">
        <Typography variant="h4" fontWeight={700} mb={4} align="center">🏆 Доверие и отзывы</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}><AccountCircleIcon fontSize="large" /></Avatar>
                <Typography variant="subtitle1" fontWeight={700}>Александр, фрилансер</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>Переводы стали быстрее и дешевле, чем через банк. Система реально помогает!</Typography>
                <Rating value={5} readOnly precision={0.5} icon={<StarIcon fontSize="inherit" />} emptyIcon={<StarIcon fontSize="inherit" />} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}><AccountCircleIcon fontSize="large" /></Avatar>
                <Typography variant="subtitle1" fontWeight={700}>Елена, директор</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>Для бизнеса — находка. Прозрачные условия, никаких скрытых комиссий.</Typography>
                <Rating value={5} readOnly precision={0.5} icon={<StarIcon fontSize="inherit" />} emptyIcon={<StarIcon fontSize="inherit" />} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', py: 3 }}>
              <CardContent>
                <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}><AccountCircleIcon fontSize="large" /></Avatar>
                <Typography variant="subtitle1" fontWeight={700}>Максим, инвестор</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>Подбор DeFi-программ — топ! Доходность выше, чем на бирже.</Typography>
                <Rating value={5} readOnly precision={0.5} icon={<StarIcon fontSize="inherit" />} emptyIcon={<StarIcon fontSize="inherit" />} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ py: 8 }} id="faq">
        <Typography variant="h4" fontWeight={700} mb={4} align="center">❓ Часто задаваемые вопросы</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content" id="faq-header">
            <Typography fontWeight={600}>Как работает калькулятор?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Он анализирует параметры перевода и подбирает оптимальный маршрут по комиссиям, скорости и надежности.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-1" id="faq-header-1">
            <Typography fontWeight={600}>Это легально?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Да, все маршруты соответствуют валютному законодательству и проходят compliance-проверку.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-2" id="faq-header-2">
            <Typography fontWeight={600}>Какие валюты поддерживаются?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Более 50 валют, включая USD, EUR, CNY, USDT и др.</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: '#fff', py: 4, mt: 8, textAlign: 'center' }} component="footer">
        <Typography variant="body2">© 2024 8sh.ru — Международные платежи с умной оптимизацией</Typography>
      </Box>

      <AuthModal open={showAuth} mode={authMode} onClose={() => setShowAuth(false)} onSwitchMode={m => setAuthMode(m)} />
      <CorporateModal open={showModal} onClose={() => setShowModal(false)} onSubmit={sendToTelegram} />
    </Box>
  );
}

function AICalculator() {
  const [from, setFrom] = useState("Россия");
  const [to, setTo] = useState("Китай");
  const [amount, setAmount] = useState(10000);
  const [currency, setCurrency] = useState("USD");
  // Stub recommendations
  const recs = [
    { label: "Crypto-bridge", fee: "0.8%", time: "15 мин", result: 9920 },
    { label: "Bank Transfer", fee: "1.2%", time: "2 дня", result: 9880 },
    { label: "Payment Agent", fee: "1.5%", time: "4 часа", result: 9850 },
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 className="font-bold text-lg mb-4">🧮 Калькулятор перевода</h3>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input value={from} onChange={e => setFrom(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Откуда" />
          <input value={to} onChange={e => setTo(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Куда" />
        </div>
        <div className="flex gap-2">
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="border rounded px-2 py-1 w-1/2" placeholder="Сумма" />
          <input value={currency} onChange={e => setCurrency(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Валюта" />
        </div>
      </div>
      <div className="text-gray-500 text-xs mb-2">🤖 Система анализирует 50+ способов...</div>
      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        {recs.map((r, i) => (
          <div key={i} className="flex justify-between items-center py-1 text-sm">
            <span className="font-medium">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {r.label}</span>
            <span>{r.fee} · {r.time} · <span className="font-bold">${r.result.toLocaleString()}</span></span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Создать заявку</button>
        <button className="flex-1 px-3 py-2 rounded border font-semibold hover:bg-gray-100">Сравнить все</button>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <div className="font-bold">{name}</div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 bg-gray-50 cursor-pointer" onClick={() => setOpen(o => !o)}>
      <div className="font-semibold flex items-center justify-between">
        {q}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && <div className="mt-2 text-gray-700">{a}</div>}
    </div>
  );
}

// Добавляю тип для данных формы
type CorporateFormData = {
  name: string;
  company: string;
  contact: string;
  comment: string;
};

function CorporateModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: CorporateFormData) => Promise<void> }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: CorporateFormData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      contact: formData.get('contact') as string,
      comment: formData.get('comment') as string,
    };
    await onSubmit(data);
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Заявка на корпоративное подключение</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input required value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Фамилия Имя" name="name" />
          <input required value={company} onChange={e => setCompany(e.target.value)} className="border rounded px-3 py-2" placeholder="Компания" name="company" />
          <input required value={contact} onChange={e => setContact(e.target.value)} className="border rounded px-3 py-2" placeholder="Telegram или email" name="contact" />
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="border rounded px-3 py-2" placeholder="Комментарий" rows={3} name="comment" />
          <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition">Отправить заявку</button>
        </form>
      </div>
    </div>
  );
}

function AuthModal({ open, mode, onClose, onSwitchMode }: { open: boolean; mode: 'login'|'register'; onClose: () => void; onSwitchMode: (m: 'login'|'register') => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Сброс формы при каждом открытии
  useEffect(() => {
    if (open) {
      setSuccess(false);
      setError("");
      setEmail("");
      setPassword("");
      setName("");
      setCompany("");
    }
  }, [open, mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const body: AuthBody = { email, password, mode };
      if (mode === 'register') {
        body.name = name;
        body.company = company;
      }
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.ok) {
        if (mode === 'login') {
          setSuccess(true);
          setTimeout(() => { onClose(); window.open('/profile', '_blank'); }, 1000);
        } else {
          setSuccess(true);
        }
        setEmail(""); setPassword(""); setName(""); setCompany("");
      } else {
        setError(data.error || "Ошибка");
      }
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg flex w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 rounded-l-xl">
          <Image src="/login-demo.png" alt="Demo" width={320} height={320} className="object-contain" />
        </div>
        <div className="flex-1 flex flex-col justify-center p-8">
          <h2 className="text-xl font-bold mb-4 text-center">{mode === 'login' ? 'Войти' : 'Регистрация'}</h2>
          {success ? (
            <div className="text-green-600 font-semibold text-center py-8">Успешно!</div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" placeholder="Email" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded px-3 py-2" placeholder="Пароль" />
              {mode === 'register' && (
                <>
                  <input required value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Имя пользователя" />
                  <input required value={company} onChange={e => setCompany(e.target.value)} className="border rounded px-3 py-2" placeholder="Компания" />
                </>
              )}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60" disabled={loading}>{loading ? (mode === 'login' ? 'Вход...' : 'Регистрация...') : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}</button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <>
                Нет аккаунта? <button className="underline text-indigo-600" onClick={() => onSwitchMode('register')}>Зарегистрироваться</button>
              </>
            ) : (
              <>
                Уже есть аккаунт? <button className="underline text-indigo-600" onClick={() => onSwitchMode('login')}>Войти</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Заменяю any на конкретный тип
interface AuthBody {
  email: string;
  password: string;
  mode: 'login' | 'register';
  name?: string;
  company?: string;
}
