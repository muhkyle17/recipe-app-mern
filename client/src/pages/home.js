import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes')
        setRecipes(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRecipe()
  }, [])

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className='instructions'>
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
