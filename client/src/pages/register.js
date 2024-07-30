import { useState } from 'react'
import axios from 'axios'

import Form from './form'
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

export default Register
