import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 问题7: 缺少错误处理和加载状态
function TaskDetail({ tasks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === parseInt(id))
    setTask(foundTask)

    // 问题8: 异步操作没有错误处理
    fetch(`https://api.example.com/tasks/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
  }, [id, tasks])

  // 问题9: 没有处理 task 为 null 的情况
  return (
    <div className="task-detail">
      <button onClick={() => navigate('/')}>Back</button>
      <h2>{task.title}</h2>
      <p>Status: {task.completed ? 'Completed' : 'Active'}</p>
      <p>Priority: {task.priority}</p>
      <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>

      <div className="comments">
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <small>{comment.author}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskDetail
