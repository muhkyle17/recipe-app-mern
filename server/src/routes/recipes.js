import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../models/Users.js'
import { RecipeModel } from '../models/Recipes.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({})
    console.log(response, 'response')
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const recipe = new RecipeModel(req.body)

  try {
    const response = await recipe.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId)
    const user = await UserModel.findById(req.body.userID)
    user.savedRecipes.push(recipe)
    await user.save()
    res.json({ savedRecipes: user.savedRecipes })
  } catch (err) {
    res.json(err)
  }
})

export { router as recipesRouter }
