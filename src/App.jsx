import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)

  // 问题1: 缺少依赖项的 useEffect
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://api.example.com/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.log('Error fetching tasks')
    }
  }

  // 问题2: 没有清理的副作用
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks()
    }, 5000)
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/">Tasks</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
          <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} />
          <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
