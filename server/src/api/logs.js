const { Router } = require('express')
const LogEntry = require('../model/LogEntry')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find()
        entries.forEach(entry => {
            if(!entry.image) {
                entry.remove()
            }
        })
        res.json(entries)
        
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body)
        const createdEntry = await logEntry.save()
        res.json(createdEntry)
        console.log(req.body)
    } catch (error) {
        if(error.name === 'ValidationError') {
            res.statusCode(422)
        }
        next(error)
    }
})

module.exports = router