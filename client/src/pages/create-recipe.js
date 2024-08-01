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
    <div className='container mx-auto flex flex-col items-center justify-center'>
      <div className='w-[30%] border-2 mt-12 mb-10 border-orange-500 flex flex-col gap-5 p-6 rounded-3xl'>
        <h2 className='text-3xl'>Create Recipe</h2>
        <form onSubmit={onSubmit} className='flex flex-col h-fit'>
          <label htmlFor='name' className='text-lg mb-1'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='border-b border-orange-500 py-1 focus:outline-none text-sm'
            onChange={handleChange}
          />

          <label htmlFor='description' className='text-lg mb-1 mt-5'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border-b border-orange-500 py-1 focus:outline-none text-sm'
            onChange={handleChange}></textarea>

          <label htmlFor='ingredients' className='text-lg mb-1 mt-5'>
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type='text'
              name='ingredients'
              className='border-b border-orange-500 py-1 focus:outline-none mt-2 text-sm'
              value={ingredient}
              onChange={e => handleIngredientChange(e, index)}
            />
          ))}
          <button
            type='button'
            onClick={addIngredient}
            className='mt-5 bg-orange-400 w-fit text-center text-sm self-center text-white px-3 py-2 border-2 border-orange-400 rounded-full hover:text-gray-600 hover:bg-transparent transition-all duration-300'>
            Add Ingredient
          </button>

          <label htmlFor='instructions' className='text-lg mb-1 mt-5'>
            Instructions
          </label>
          <textarea
            id='instructions'
            name='instructions'
            className='border-b border-orange-500 py-1 focus:outline-none text-sm'
            onChange={handleChange}></textarea>

          <label htmlFor='imageUrl' className='text-lg mb-1 mt-5'>
            Image URL
          </label>
          <input
            type='text'
            id='imageUrl'
            name='imageUrl'
            className='border-b border-orange-500 py-1 focus:outline-none text-sm'
            onChange={handleChange}
          />

          <label htmlFor='cookingTime' className='text-lg mb-1 mt-5'>
            Cooking Time (minutes)
          </label>
          <input
            type='number'
            id='cookingTime'
            name='cookingTime'
            className='border-b border-orange-500 py-1 focus:outline-none text-sm'
            onChange={handleChange}
          />

          <button
            type='submit'
            className='mt-5 bg-orange-400 w-fit text-center text-sm self-center text-white px-3 py-2 border-2 border-orange-400 rounded-full hover:text-gray-600 hover:bg-transparent transition-all duration-300'>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe
