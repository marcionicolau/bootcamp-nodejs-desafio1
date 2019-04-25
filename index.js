const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: false,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkAgeMiddleware = (req, res, next) => {
  const { age } = req.query
  return !age ? res.redirect('/') : next()
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  age > 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  res.render('major', { age })
})

app.get('/minor', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  res.render('minor', { age })
})

app.listen(3000)
