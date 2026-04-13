import { useState } from 'react'
import { Link } from 'react-router-dom'

// 问题3: 组件职责过多,耦合度高
function TaskList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  // 问题4: 直接修改 props
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
      tasks.push(task)
      setTasks(tasks)
      setNewTask('')
    }
  }

  // 问题5: 每次渲染都创建新函数
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  // 问题6: 复杂的过滤和排序逻辑没有优化
  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(t => !t.completed)
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed)
  }

  if (sortBy === 'priority') {
    filteredTasks.sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 }
      return priorities[b.priority] - priorities[a.priority]
    })
  } else {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return (
    <div className="task-list">
      <h1>Task Manager</h1>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <Link to={`/task/${task.id}`}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
            </Link>
            <span className={`priority-${task.priority}`}>{task.priority}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
