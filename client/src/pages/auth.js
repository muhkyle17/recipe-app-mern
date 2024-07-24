import { useState } from 'react'
import axios from 'axios'

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>{label}</button>
      </form>
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      })
      console.log(response, 'response')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Login'
      onSubmit={onSubmit}
    />
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      })

      // TODO: Make this into a modal in the redesign
      alert('Registration Completed! You can now login.')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Register'
      onSubmit={onSubmit}
    />
  )
}

const Auth = () => {
  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  )
}

export default Auth
