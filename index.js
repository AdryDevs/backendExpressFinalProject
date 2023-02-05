const express = require('express')
const db = require('./db')
const PORT = process.env.PORT || 3000
const app = express()
const Router = require('./router')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(Router)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
  
  db.sync({ force: true})
  .then(() => {
    console.log('Connected to the database')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
});
app.get('/', (req, res) => {
  res.send("This is root!")
})


  