import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const quickLinks = [
    { name: 'SDEK', url: 'https://www.cdek.ru/', description: 'Логистика' },
    { name: 'DPD', url: 'https://www.dpd.com/', description: 'Доставка' },
    { name: '1C', url: '#', description: 'Учётная система' },
    { name: 'Платежи', url: '#', description: 'Финансы' },
  ];

  const tasks = [
    { id: 1, title: 'Подготовить отчёт за неделю', status: 'IN_PROGRESS' as const },
    { id: 2, title: 'Связаться с клиентом Иванов', status: 'NEW' as const },
    { id: 3, title: 'Обновить базу знаний', status: 'REVIEW' as const },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-900/50 text-blue-200 border-blue-500';
      case 'IN_PROGRESS': return 'bg-yellow-900/50 text-yellow-200 border-yellow-500';
      case 'REVIEW': return 'bg-purple-900/50 text-purple-200 border-purple-500';
      case 'DONE': return 'bg-green-900/50 text-green-200 border-green-500';
      default: return 'bg-bork-dark text-bork-textMuted border-bork-light';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW': return 'Новая';
      case 'IN_PROGRESS': return 'В работе';
      case 'REVIEW': return 'На проверке';
      case 'DONE': return 'Готово';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-bork-accent to-bork-accentHover rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Добро пожаловать, {user?.firstName}!
        </h1>
        <p className="text-bork-textMuted">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bork-gray hover:bg-bork-light border border-bork-light hover:border-bork-accent rounded-xl p-4 transition-all duration-200 group"
            >
              <h3 className="font-semibold text-white group-hover:text-bork-accent transition-colors">
                {link.name}
              </h3>
              <p className="text-sm text-bork-textMuted mt-1">{link.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Tasks Preview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Мои задачи</h2>
          <a 
            href="/dashboard/tasks" 
            className="text-sm text-bork-accent hover:text-bork-accentHover transition-colors"
          >
            Все задачи →
          </a>
        </div>
        <div className="bg-bork-gray rounded-xl border border-bork-light overflow-hidden">
          <div className="divide-y divide-bork-light">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-bork-light/50 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Заметки</h2>
          <button className="px-4 py-2 bg-bork-accent hover:bg-bork-accentHover text-white text-sm font-medium rounded-lg transition-all">
            + Новая заметка
          </button>
        </div>
        <div className="bg-bork-gray rounded-xl border border-bork-light p-6 text-center">
          <p className="text-bork-textMuted">Заметки пока пусты</p>
          <p className="text-sm text-bork-textMuted mt-2">
            Создайте первую заметку для быстрых записей
          </p>
        </div>
      </section>
    </div>
  );
}
