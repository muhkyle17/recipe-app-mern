const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className='bg-orange-500'>
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

export default Form
