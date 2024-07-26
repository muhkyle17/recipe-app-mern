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
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={handleChange} />

        <label htmlFor='description'>Description</label>
        <textarea id='description' name='description' onChange={handleChange}></textarea>

        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type='text'
            name='ingredients'
            value={ingredient}
            onChange={e => handleIngredientChange(e, index)}
          />
        ))}
        <button type='button' onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>

        <label htmlFor='imageUrl'>Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />

        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />

        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
