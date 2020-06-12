import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'
import User from './models/user'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Add middleware to aythenticate user
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })

  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

// ERROR MESSAGES
const ERR_CANNOT_FIND_ID = 'User not found.'
const ERR_CANNOT_CREATE = 'Could not create user.'

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    const createdUser = await user.save();

    res.status(201).json({ userId: createdUser._id, accessToken: createdUser.accessToken });
  } catch (err) {
    res.status(400).json({ message: ERR_CANNOT_CREATE, errors: err });
  }
})

app.get('/secrets', authenticateUser)
app.get('/secrets', (req, res) => {
  res.json({ secret: 'This is secret' })
})

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    res.json({ notFound: true })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
