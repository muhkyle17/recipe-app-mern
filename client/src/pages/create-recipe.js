import { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const CreateRecipe = () => {
  const userID = useGetUserID()
  const [cookies] = useCookies(['access_token'])

  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    imageURL: '',
    cookingTime: 0,
    userOwner: userID,
  })

  const handleChange = e => {
    e.preventDefault()

    const { name, value } = e.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleIngredientChange = (e, index) => {
    e.preventDefault()

    const { value } = e.target
    const ingredients = recipe.ingredients
    ingredients[index] = value
    setRecipe({ ...recipe, ingredients })
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] })
  }

  const onSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/recipes', recipe, {
        headers: { authorization: cookies.access_token },
      })
      alert('Recipe created')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-center h-[90vh]'>
      <div className='w-[30%] border-2 border-orange-500 flex flex-col gap-5 p-6 rounded-3xl'>
        <h2 className='text-3xl'>Create Recipe</h2>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <label htmlFor='name' className='text-lg mb-1'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='border-b border-orange-500 p-1 focus:outline-none'
            onChange={handleChange}
          />

          <label htmlFor='description' className='text-lg mb-1 mt-5'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border-b border-orange-500 p-1 focus:outline-none'
            onChange={handleChange}></textarea>

          <label htmlFor='ingredients' className='text-lg mb-1 mt-5'>
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type='text'
              name='ingredients'
              value={ingredient}
              className='border-b border-orange-500 p-1 focus:outline-none'
              onChange={e => handleIngredientChange(e, index)}
            />
          ))}
          <button type='button' onClick={addIngredient}>
            Add Ingredient
          </button>

          <label htmlFor='instructions' className='text-lg mb-1 mt-5'>
            Instructions
          </label>
          <textarea
            id='instructions'
            name='instructions'
            className='border-b border-orange-500 p-1 focus:outline-none'
            onChange={handleChange}></textarea>

          <label htmlFor='imageUrl' className='text-lg mb-1 mt-5'>
            Image URL
          </label>
          <input
            type='text'
            id='imageUrl'
            name='imageUrl'
            className='border-b border-orange-500 p-1 focus:outline-none'
            onChange={handleChange}
          />

          <label htmlFor='cookingTime' className='text-lg mb-1 mt-5'>
            Cooking Time (minutes)
          </label>
          <input
            type='number'
            id='cookingTime'
            name='cookingTime'
            className='border-b border-orange-500 p-1 focus:outline-none'
            onChange={handleChange}
          />

          <button type='submit'>Create Recipe</button>
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe
