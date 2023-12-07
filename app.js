const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const exphbs = require('express-handlebars')
const postsRoutes = require('./routes/posts')

const PORT = process.env.PORT || 3000

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(postsRoutes)

async function start() {
    try {
      await mongoose.connect(
        'mongodb+srv://admin:admin320@expressweb.cq82mbv.mongodb.net/posts'
      )
      app.listen(PORT, () => {
        console.log('Server has been started...')
      })
    } catch (e) {
      console.log(e)
    }
  }


start()