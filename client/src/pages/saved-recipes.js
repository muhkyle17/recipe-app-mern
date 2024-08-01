/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSavedRecipes()
  }, [])

  return (
    <div className='container mx-auto px-20 py-10 flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl'>Saved Recipes</h1>
      <ul className='flex flex-row gap-5 flex-wrap justify-center'>
        {savedRecipes.map(recipe => {
          return (
            <li key={recipe._id} className='w-[350px] h-fit flex flex-col'>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className='max-w-full w-[350px] h-auto rounded-t-lg'
              />
              <div className='flex flex-col gap-2 p-5 border-orange-500 border-l border-r border-b rounded-b-lg'>
                <h2 className='text-2xl'>{recipe.name}</h2>
                <div className='instructions'>
                  <p>{recipe.instructions}</p>
                </div>
                <p>
                  <span className='font-semibold'>Cooking Time:</span> {recipe.cookingTime}{' '}
                  (minutes)
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SavedRecipes
