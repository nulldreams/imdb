const express = require('express')
const app = express()
const morgan = require('morgan')

var port = process.env.PORT || 3001

app.use(morgan('dev'))

require('./src/routes')(app)

app.listen(port, () => {
    console.log(`UP PORT=${port}`)
})