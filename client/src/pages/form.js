import { Link } from 'react-router-dom'

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  console.log(label, 'label')
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <form onSubmit={onSubmit} className='flex flex-col gap-5 w-72'>
        <h2 className='text-5xl'>{label}</h2>
        <h3>{label === 'Login' ? 'Hi, Welcome back!' : 'Create an account'}</h3>
        <div className='form-group.. flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              className='border-2 rounded-2xl px-4 py-3'
              placeholder={label === 'Login' ? 'Enter your username' : 'Create your username'}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='border-2 rounded-2xl px-4 py-3'
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type='submit'
          className='bg-orange-500 text-white py-2 rounded-xl border-2 border-transparent hover:border-2 hover:border-orange-500 hover:text-black hover:bg-transparent transition-all duration-500'>
          {label}
        </button>

        {label === 'Login' && (
          <p className='self-center'>
            <Link to='/register'>Not registered yet? Create an account</Link>
          </p>
        )}
      </form>
    </div>
  )
}

export default Form
