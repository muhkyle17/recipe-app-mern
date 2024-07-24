const Login = () => {
  return (
    <div>
      <p>Auth</p>
    </div>
  )
}

const Register = () => {
  return (
    <div className='auth-container'>
      <form action=''>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            onChange={event => {
              console.log('event')
            }}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            onChange={event => {
              console.log('event')
            }}
          />
        </div>
      </form>
    </div>
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
