import { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useTasksStore } from '../store/tasksStore';
import { useNotesStore } from '../store/notesStore';
import { Link } from 'react-router-dom';
import {
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const quickLinks = [
  { name: 'СДЭК', url: 'https://cdek.ru', color: 'bg-green-600' },
  { name: 'DPD', url: 'https://dpd.ru', color: 'bg-red-600' },
  { name: 'Оплаты', url: '#', color: 'bg-blue-600' },
  { name: '1С', url: '#', color: 'bg-yellow-600' },
];

export default function DashboardPage() {
  const { tasks, fetchTasks } = useTasksStore();
  const { notes, fetchNotes } = useNotesStore();

  useEffect(() => {
    fetchTasks();
    fetchNotes();
  }, [fetchTasks, fetchNotes]);

  const recentTasks = tasks.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h1>
          <p className="text-gray-400">Панель управления сотрудника BORK</p>
        </div>

        {/* Quick Links */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Быстрые ссылки</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} p-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity`}
              >
                <span className="text-white font-medium">{link.name}</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white/80" />
              </a>
            ))}
          </div>
        </section>

        {/* Tasks Overview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Мои задачи</h2>
            <Link
              to="/tasks"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="mr-2">Все задачи</span>
              <ClipboardDocumentListIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            {recentTasks.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Задач пока нет</p>
            ) : (
              <ul className="space-y-3">
                {recentTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <span className="text-white">{task.title}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'DONE'
                          ? 'bg-green-900 text-green-200'
                          : task.status === 'IN_PROGRESS'
                          ? 'bg-blue-900 text-blue-200'
                          : task.status === 'REVIEW'
                          ? 'bg-yellow-900 text-yellow-200'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {task.status === 'NEW' && 'Новая'}
                      {task.status === 'IN_PROGRESS' && 'В работе'}
                      {task.status === 'REVIEW' && 'На проверке'}
                      {task.status === 'DONE' && 'Готово'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Quick Notes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Заметки</h2>
            <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>Добавить</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="bg-gray-800 rounded-xl p-4 min-h-[150px] hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <p className="text-gray-300 text-sm line-clamp-4">{note.content}</p>
                <p className="text-gray-500 text-xs mt-3">
                  {new Date(note.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="col-span-full bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">Заметок пока нет</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
