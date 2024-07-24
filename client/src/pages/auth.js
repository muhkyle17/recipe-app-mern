import { useState } from 'react'

const Form = ({ username, setUsername, password, setPassword, label }) => {
  return (
    <div className='auth-container'>
      <form action=''>
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
            type='text'
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

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Login'
    />
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Register'
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
