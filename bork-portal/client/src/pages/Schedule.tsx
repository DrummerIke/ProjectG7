import { useState } from 'react'

export default function Schedule() {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  
  const shifts = [
    { date: '2024-01-15', type: 'office', hours: '09:00-18:00' },
    { date: '2024-01-16', type: 'remote', hours: '09:00-18:00' },
    { date: '2024-01-17', type: 'day-off', hours: '-' },
    { date: '2024-01-18', type: 'office', hours: '09:00-18:00' },
    { date: '2024-01-19', type: 'office', hours: '09:00-18:00' },
    { date: '2024-01-20', type: 'day-off', hours: '-' },
    { date: '2024-01-21', type: 'day-off', hours: '-' },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office': return 'bg-blue-900 border-blue-500'
      case 'remote': return 'bg-green-900 border-green-500'
      case 'day-off': return 'bg-gray-700 border-gray-500'
      default: return 'bg-gray-800 border-gray-600'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'office': return 'Офис'
      case 'remote': return 'Удаленно'
      case 'day-off': return 'Выходной'
      default: return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">График работы</h1>
        <button className="btn-primary">
          + Подать заявку
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2">
        <button
          onClick={() => setViewMode('month')}
          className={`px-4 py-2 rounded ${viewMode === 'month' ? 'bg-bork-primary text-white' : 'bg-bork-secondary text-gray-300'}`}
        >
          Месяц
        </button>
        <button
          onClick={() => setViewMode('week')}
          className={`px-4 py-2 rounded ${viewMode === 'week' ? 'bg-bork-primary text-white' : 'bg-bork-secondary text-gray-300'}`}
        >
          Неделя
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="card">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {shifts.map((shift, index) => (
            <div
              key={shift.date}
              className={`min-h-[100px] p-2 rounded border-l-4 ${getTypeColor(shift.type)} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <p className="text-sm font-medium text-white">{index + 15}</p>
              <p className="text-xs text-gray-300 mt-1">{getTypeText(shift.type)}</p>
              {shift.type !== 'day-off' && (
                <p className="text-xs text-gray-400 mt-1">{shift.hours}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-900 border-l-4 border-blue-500 rounded" />
          <span className="text-gray-300">Офис</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-900 border-l-4 border-green-500 rounded" />
          <span className="text-gray-300">Удаленно</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-700 border-l-4 border-gray-500 rounded" />
          <span className="text-gray-300">Выходной</span>
        </div>
      </div>
    </div>
  )
}
