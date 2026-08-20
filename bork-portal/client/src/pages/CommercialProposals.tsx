import { useState } from 'react'

export default function CommercialProposals() {
  const [showForm, setShowForm] = useState(false)

  const proposals = [
    { id: 1, client: 'ООО "Ромашка"', amount: 150000, status: 'sent', date: '2024-01-15' },
    { id: 2, client: 'ИП Петров', amount: 75000, status: 'draft', date: '2024-01-14' },
    { id: 3, client: 'АО "Техно"', amount: 320000, status: 'approved', date: '2024-01-10' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-700 text-gray-200'
      case 'sent': return 'bg-blue-900 text-blue-200'
      case 'approved': return 'bg-green-900 text-green-200'
      case 'rejected': return 'bg-red-900 text-red-200'
      default: return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Черновик'
      case 'sent': return 'Отправлено'
      case 'approved': return 'Согласовано'
      case 'rejected': return 'Отклонено'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Коммерческие предложения</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Создать КП
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Новое КП</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Клиент
              </label>
              <input type="text" className="input-field" placeholder="Название компании или ИП" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Сумма
              </label>
              <input type="number" className="input-field" placeholder="0" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Описание
              </label>
              <textarea className="input-field min-h-[150px]" placeholder="Детали предложения..." />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Сохранить
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

      {/* Proposals List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Список КП</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Клиент</th>
                <th className="pb-3 font-medium">Дата</th>
                <th className="pb-3 font-medium">Сумма</th>
                <th className="pb-3 font-medium">Статус</th>
                <th className="pb-3 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-gray-800">
                  <td className="py-3 text-white">{proposal.client}</td>
                  <td className="py-3 text-gray-400">{proposal.date}</td>
                  <td className="py-3 text-white">{proposal.amount.toLocaleString()} ₽</td>
                  <td className="py-3">
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-bork-primary hover:text-orange-400 text-sm">
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
