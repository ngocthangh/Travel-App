const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const middleware = require('./middleware')
const mongoose = require('mongoose')
const logs = require('./api/logs')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello Thang'
    })
})

app.use('/api/logs', logs)



app.use(middleware.notFound)
app.use(middleware.errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})