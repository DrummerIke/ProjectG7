import { ExternalLink, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const quickLinks = [
  { name: 'СДЭК', url: 'https://www.cdek.ru', color: 'bg-green-600' },
  { name: 'DPD', url: 'https://www.dpd.ru', color: 'bg-red-600' },
  { name: 'Оплаты', url: '#', color: 'bg-blue-600' },
  { name: '1С', url: '#', color: 'bg-yellow-600' },
];

const demoTasks = [
  { id: 1, title: 'Подготовить КП для клиента', status: 'in_progress', priority: 'high' },
  { id: 2, title: 'Согласовать график на неделю', status: 'new', priority: 'medium' },
  { id: 3, title: 'Обновить базу клиентов', status: 'done', priority: 'low' },
  { id: 4, title: 'Провести обучение новичков', status: 'review', priority: 'high' },
];

const statusColors = {
  new: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  review: 'bg-purple-500',
  done: 'bg-green-500',
};

const statusLabels = {
  new: 'Новая',
  in_progress: 'В работе',
  review: 'На проверке',
  done: 'Готово',
};

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Добро пожаловать, {user?.firstName}!
        </h1>
        <p className="text-bork-textSecondary">Обзор вашей рабочей панели</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} rounded-xl p-4 text-white hover:opacity-90 transition-opacity flex items-center justify-between`}
          >
            <span className="font-semibold">{link.name}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Tasks Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Мои задачи</h2>
          <a href="/tasks" className="text-sm text-bork-accent hover:underline">
            Все задачи →
          </a>
        </div>

        <div className="space-y-3">
          {demoTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-bork-gray rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[task.status as keyof typeof statusColors]}`} />
                <span className="text-white">{task.title}</span>
              </div>
              <span className="text-sm text-bork-textSecondary">
                {statusLabels[task.status as keyof typeof statusLabels]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-bork-accent" />
            <h2 className="text-xl font-bold text-white">Ближайшие смены</h2>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((day) => (
              <div key={day} className="flex items-center justify-between p-3 bg-bork-gray rounded-lg">
                <div>
                  <p className="text-white font-medium">Понедельник, {10 + day} дек.</p>
                  <p className="text-sm text-bork-textSecondary">09:00 - 18:00</p>
                </div>
                <span className="px-3 py-1 bg-bork-accent text-white text-sm rounded-full">
                  Офис
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-bork-accent" />
            <h2 className="text-xl font-bold text-white">Статус заявок</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-bork-gray rounded-lg">
              <span className="text-white">Отпуск (Январь)</span>
              <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">
                На рассмотрении
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-bork-gray rounded-lg">
              <span className="text-white">Удаленка (Завтра)</span>
              <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Одобрено
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Notes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Быстрые заметки</h2>
          <a href="/notes" className="text-sm text-bork-accent hover:underline">
            Все заметки →
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((note) => (
            <div key={note} className="p-4 bg-bork-gray rounded-lg">
              <p className="text-white text-sm line-clamp-3">
                Заметка #{note}: Не забыть позвонить клиенту по поводу обновления договора...
              </p>
              <p className="text-xs text-bork-textSecondary mt-2">2 часа назад</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
