import { useState } from 'react'

export default function Requests() {
  const [showForm, setShowForm] = useState(false)

  const requests = [
    { id: 1, type: 'Отпуск', dates: '01.02.2024 - 14.02.2024', status: 'pending', comment: '' },
    { id: 2, type: 'Замена смены', dates: '15.01.2024', status: 'approved', comment: 'Согласовано с руководителем' },
    { id: 3, type: 'Отгул', dates: '20.01.2024', status: 'rejected', comment: 'Необходимо найти замену' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900 text-yellow-200'
      case 'approved': return 'bg-green-900 text-green-200'
      case 'rejected': return 'bg-red-900 text-red-200'
      default: return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'На рассмотрении'
      case 'approved': return 'Одобрено'
      case 'rejected': return 'Отклонено'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Заявки</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Новая заявка
        </button>
      </div>

      {/* Request Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Подать заявку</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Тип заявки
              </label>
              <select className="input-field">
                <option>Отпуск</option>
                <option>Отгул</option>
                <option>Замена смены</option>
                <option>Больничный</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Даты
              </label>
              <input type="text" className="input-field" placeholder="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Комментарий
              </label>
              <textarea className="input-field min-h-[100px]" placeholder="Причина заявки..." />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Отправить
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Requests List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">История заявок</h2>
        <div className="space-y-3">
          {requests.map((request) => (
            <div key={request.id} className="bg-bork-dark p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{request.type}</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{request.dates}</p>
              {request.comment && (
                <p className="text-sm text-gray-500 italic">"{request.comment}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
