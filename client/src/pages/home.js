/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies] = useCookies(['access_token'])
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

    if (cookies.access_token) fetchSavedRecipes()
  }, [])

  const saveRecipe = async recipeID => {
    try {
      const response = await axios.put(
        'http://localhost:3001/recipes',
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      )
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.error(err)
    }
  }

  const isRecipeSaved = id => savedRecipes.includes(id)

  return (
    <div className='container mx-auto px-20 py-10 flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl'>Recipes</h1>
      <ul className='flex flex-row gap-5 flex-wrap justify-center'>
        {recipes.map(recipe => {
          return (
            <li
              key={recipe._id}
              className='max-w-3xl flex flex-col gap-0 border-orange-500 rounded-xl border-2 h-fit'>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className='max-w-42 h-auto rounded-t-lg'
              />
              <div className='w-[90%] my-3 mx-auto'>
                <h2>{recipe.name}</h2>
                <button disabled={isRecipeSaved(recipe._id)} onClick={() => saveRecipe(recipe._id)}>
                  {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
                <p>{recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
