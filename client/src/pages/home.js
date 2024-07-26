import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()

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

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSavedRecipes()
  }, [])

  const saveRecipe = async recipeID => {
    console.log(recipeID, 'recipeID')
    try {
      await axios.put('http://localhost:3001/recipes', {
        recipeID,
        userID,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const isRecipeSaved = id => savedRecipes.includes(id)

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button disabled={isRecipeSaved(recipe._id)} onClick={() => saveRecipe(recipe._id)}>
                  {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
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
