export default function Tasks() {
  const columns = [
    { id: 'new', title: 'Новые', color: 'border-blue-500' },
    { id: 'in-progress', title: 'В работе', color: 'border-yellow-500' },
    { id: 'review', title: 'На проверке', color: 'border-purple-500' },
    { id: 'done', title: 'Готово', color: 'border-green-500' },
  ]

  const tasks = [
    { id: 1, title: 'Подготовить КП для клиента', status: 'new', priority: 'high' },
    { id: 2, title: 'Согласовать график на неделю', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Проверить остатки на складе', status: 'review', priority: 'low' },
    { id: 4, title: 'Обновить прайс-лист', status: 'new', priority: 'medium' },
    { id: 5, title: 'Провести инвентаризацию', status: 'done', priority: 'high' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Задачи</h1>
        <button className="btn-primary">
          + Новая задача
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className={`bg-bork-secondary rounded-lg p-4 border-t-4 ${column.color}`}>
            <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div key={task.id} className="bg-bork-dark p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <p className="text-white text-sm font-medium mb-2">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.priority === 'high' ? 'bg-red-900 text-red-200' :
                        task.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
