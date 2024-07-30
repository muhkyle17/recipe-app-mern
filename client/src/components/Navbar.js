import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    navigate('/auth')
  }

  return (
    <div className='w-full h-[70px] text-[#696969] flex flex-row items-center justify-center gap-14 text-lg uppercase border-b-4 border-b-[#f2f2f2]'>
      <Link className='hover:text-orange-500' to='/'>
        Home
      </Link>
      <Link className='hover:text-orange-500' to='/create-recipe'>
        Create Recipe
      </Link>
      {!cookies.access_token ? (
        <Link className='hover:text-orange-500' to='/auth'>
          Login/Register
        </Link>
      ) : (
        <>
          <Link className='hover:text-orange-500' to='/saved-recipes'>
            Saved Recipes
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default Navbar
