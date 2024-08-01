import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    navigate('/login')
  }

  return (
    <div className='w-full h-[70px] text-[#696969] flex flex-row items-center justify-center gap-14 text-lg uppercase border-b-2 border-t-[10px] border-t-orange-500 border-b-[#f2f2f2]'>
      <Link className='transition-all duration-300 hover:text-orange-500' to='/'>
        Home
      </Link>
      {cookies.access_token ? (
        <>
          <Link className='transition-all duration-300 hover:text-orange-500' to='/create-recipe'>
            Create Recipe
          </Link>
          <Link className='transition-all duration-300 hover:text-orange-500' to='/saved-recipes'>
            Saved Recipes
          </Link>
          <button
            className='transition-all duration-300 hover:text-orange-500 uppercase'
            onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link className='transition-all duration-300 hover:text-orange-500' to='/login'>
          Login
        </Link>
      )}
    </div>
  )
}

export default Navbar
