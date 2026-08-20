export default function Dashboard() {
  const quickLinks = [
    { name: 'СДЭК', url: '#', color: 'bg-green-600' },
    { name: 'DPD', url: '#', color: 'bg-red-600' },
    { name: 'Платежи', url: '#', color: 'bg-blue-600' },
    { name: '1С', url: '#', color: 'bg-yellow-600' },
  ]

  const tasks = [
    { id: 1, title: 'Подготовить КП для клиента', status: 'new', priority: 'high' },
    { id: 2, title: 'Согласовать график на неделю', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Проверить остатки на складе', status: 'review', priority: 'low' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'review': return 'bg-purple-500'
      case 'done': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая'
      case 'in-progress': return 'В работе'
      case 'review': return 'На проверке'
      case 'done': return 'Готово'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Главная</h1>

      {/* Quick Links */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className={`${link.color} p-4 rounded-lg text-white font-medium text-center hover:opacity-90 transition-opacity`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Мои задачи</h2>
        <div className="card">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-bork-dark rounded-lg">
                <div className="flex-1">
                  <p className="text-white font-medium">{task.title}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                    <span className="text-xs text-gray-400">{getStatusText(task.status)}</span>
                  </div>
                </div>
                <button className="btn-secondary text-sm py-1 px-3">
                  Подробнее
                </button>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-4">
            Показать все задачи
          </button>
        </div>
      </section>

      {/* Quick Notes */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Быстрые заметки</h2>
        <div className="card">
          <textarea
            className="w-full bg-bork-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-bork-primary min-h-[120px]"
            placeholder="Ваши личные заметки..."
          />
          <button className="btn-secondary mt-3">
            Сохранить
          </button>
        </div>
      </section>
    </div>
  )
}
