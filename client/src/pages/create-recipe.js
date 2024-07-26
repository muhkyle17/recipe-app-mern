import { useState } from 'react'

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    imageURL: '',
    cookingTime: 0,
    userOwner: 0,
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

  console.log(recipe, 'recipe')

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form>
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
