import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'

// const uri = process.env.MOVIEREVIEWS_DB_URI || ''
// const password = process.env.RECIPES_DB_PASSWORD

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)

// mongoose.connect(uri)
// mongoose.connect(
//   `mongodb+srv://reyesmikyle17:${password}@recipes.cafoxmb.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes`
// )
mongoose.connect(
  'mongodb+srv://reyesmikyle17:MERNpassword123@recipes.cafoxmb.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes'
)

app.listen(3001, () => console.log('SERVER STARTED AT PORT 3001'))
