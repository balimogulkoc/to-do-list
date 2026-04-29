import { useState, useEffect, useRef } from 'react'

const defaultTodos = [
  { id: 1, text: 'React öğren', completed: false, priority: 'high' },
  { id: 2, text: 'Tailwind CSS kullan', completed: true, priority: 'medium' },
  { id: 3, text: 'Todo uygulaması yap', completed: false, priority: 'low' },
]

const PRIORITIES = {
  high:   { label: 'Yüksek', bg: 'bg-red-100',     text: 'text-red-600',     border: 'border-red-200',     dot: 'bg-red-500'     },
  medium: { label: 'Orta',    bg: 'bg-amber-100',   text: 'text-amber-600',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
  low:    { label: 'Düşük',  bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
}

function PriorityBadge({ priority }) {
  const p = PRIORITIES[priority]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${p.bg} ${p.text} ${p.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
      {p.label}
    </span>
  )
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  const handleEdit = () => {
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed) onEdit(todo.id, trimmed)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setEditText(todo.text); setIsEditing(false) }
  }

  return (
    <li className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
      todo.completed
        ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 opacity-60'
        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          todo.completed
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-500'
        }`}
      >
        {todo.completed && (
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full text-sm bg-transparent border-b-2 border-violet-400 outline-none text-gray-800 dark:text-gray-200 pb-0.5"
          />
        ) : (
          <span
            onDoubleClick={handleEdit}
            className={`text-sm block cursor-default select-none ${
              todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            {todo.text}
          </span>
        )}
        <div className="mt-1.5">
          <PriorityBadge priority={todo.priority} />
        </div>
      </div>

      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={handleEdit}
          className="p-1.5 rounded-lg text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
          title="Düzenle"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          title="Sil"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : defaultTodos
    } catch {
      return defaultTodos
    }
  })
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTodo = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setTodos(prev => [...prev, { id: Date.now(), text: trimmed, completed: false, priority }])
    setInputValue('')
  }

  const toggleTodo = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id))
  const editTodo = (id, text) => setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))

  const priorityOrder = { high: 0, medium: 1, low: 2 }

  const filteredTodos = todos
    .filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed)
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const completedCount = todos.filter(t => t.completed).length
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">📝 Yapılacaklar</h1>
                <p className="text-violet-200 text-sm mt-0.5">{completedCount} / {todos.length} görev tamamlandı</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors text-lg leading-none"
                title={darkMode ? 'Açık mod' : 'Koyu mod'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white rounded-full h-2 transition-all duration-700 ease-out"
                style={{ width: progress + '%' }}
              />
            </div>
            <p className="text-violet-200 text-xs mt-1.5 text-right font-medium">{progress}% tamamlandı</p>
          </div>

          <div className="p-5 space-y-4">

            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 transition-colors">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Görev ara..."
                className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 p-1.5 rounded-xl border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTodo()}
                  placeholder="Yeni görev ekle..."
                  className="flex-1 px-3 py-1.5 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  onClick={addTodo}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                >
                  + Ekle
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Öncelik:</span>
                {Object.entries(PRIORITIES).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setPriority(key)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                      priority === key
                        ? `${val.bg} ${val.text} ${val.border} shadow-sm scale-105`
                        : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${val.dot}`} />
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-700/50">
              {[
                { key: 'all', label: 'Tümü', count: todos.length },
                { key: 'active', label: 'Aktif', count: todos.filter(t => !t.completed).length },
                { key: 'completed', label: 'Tamamlanan', count: completedCount },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    filter === tab.key
                      ? 'bg-white dark:bg-gray-600 text-violet-600 dark:text-violet-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs leading-none ${
                    filter === tab.key
                      ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>{tab.count}</span>
                </button>
              ))}
            </div>

            {filteredTodos.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">
                  {search ? '🔍' : filter === 'completed' ? '🎉' : '✨'}
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {search
                    ? `"${search}" için sonuç bulunamadı`
                    : filter === 'completed'
                    ? 'Henüz tamamlanan görev yok'
                    : 'Henüz görev yok. Yukarıdan ekleyin!'}
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </ul>
            )}

            {completedCount > 0 && (
              <button
                onClick={() => setTodos(prev => prev.filter(t => !t.completed))}
                className="w-full py-2 text-xs font-medium rounded-xl border border-red-200 dark:border-red-800/50 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                🗑️ Tamamlananları temizle ({completedCount})
              </button>
            )}

          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
          Çift tıklayarak görev düzenliyebilirsiniz
        </p>

      </div>
    </div>
  )
}
