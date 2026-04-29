import { useState, createElement as h } from 'react'

function CheckIcon() {
  return h('svg', { className: 'w-3 h-3', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 3 },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M5 13l4 4L19 7' })
  )
}

function CloseIcon() {
  return h('svg', { className: 'w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 },
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M6 18L18 6M6 6l12 12' })
  )
}

function TodoItem({ todo, onToggle, onDelete }) {
  return h('li', { className: 'flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 group' },
    h('button', {
      onClick: () => onToggle(todo.id),
      className: [
        'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
        todo.completed ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 hover:border-violet-400'
      ].join(' ')
    }, todo.completed ? h(CheckIcon) : null),
    h('span', {
      className: ['flex-1 text-sm', todo.completed ? 'line-through text-gray-400' : 'text-gray-700'].join(' ')
    }, todo.text),
    h('button', {
      onClick: () => onDelete(todo.id),
      className: 'text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100',
      title: 'Sil'
    }, h(CloseIcon))
  )
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React öğren', completed: false },
    { id: 2, text: 'Tailwind CSS kullan', completed: true },
  ])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  const completedCount = todos.filter(t => t.completed).length

  return h('div', { className: 'min-h-screen bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center p-4' },
    h('div', { className: 'bg-white rounded-2xl shadow-xl w-full max-w-md p-6' },
      h('h1', { className: 'text-3xl font-bold text-center text-violet-700 mb-1' }, '📝 Yapılacaklar'),
      h('p', { className: 'text-center text-gray-400 text-sm mb-6' }, completedCount + ' / ' + todos.length + ' görev tamamlandı'),
      h('div', { className: 'flex gap-2 mb-6' },
        h('input', {
          type: 'text',
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: 'Yeni görev ekle...',
          className: 'flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400'
        }),
        h('button', {
          onClick: addTodo,
          className: 'bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors'
        }, 'Ekle')
      ),
      todos.length === 0
        ? h('p', { className: 'text-center text-gray-400 py-8' }, 'Henüz görev yok. Yukarıdan ekleyin!')
        : h('ul', { className: 'space-y-2 mb-2' },
            todos.map(todo => h(TodoItem, { key: todo.id, todo, onToggle: toggleTodo, onDelete: deleteTodo }))
          ),
      completedCount > 0
        ? h('button', {
            onClick: () => setTodos(todos.filter(t => !t.completed)),
            className: 'mt-4 w-full text-sm text-red-400 hover:text-red-600 transition-colors py-1'
          }, 'Tamamlananları temizle (' + completedCount + ')')
        : null
    )
  )
}

export default App
