import { useState, useEffect } from 'react'
import axios from 'axios'

// 问题10: 组件中混合了业务逻辑和 UI 逻辑
function UserProfile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    if (!user) {
      // 问题11: 硬编码的 API 地址
      axios.get('https://api.example.com/user/me')
        .then(response => {
          setUser(response.data)
          setFormData(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()

    // 问题12: 没有表单验证
    axios.put('https://api.example.com/user/me', formData)
      .then(response => {
        setUser(response.data)
        setIsEditing(false)
        alert('Profile updated!')
      })
      .catch(error => {
        alert('Failed to update profile')
      })
  }

  // 问题13: 内联样式和 CSS 类混用
  return (
    <div className="user-profile" style={{ padding: '20px' }}>
      <h2>User Profile</h2>

      {!isEditing ? (
        <div>
          <img src={formData.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="Avatar URL"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default UserProfile
