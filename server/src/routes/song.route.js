const express = require('express')
const upload = require('../middleware/song.middleware')
const uploadSong = require('../controllers/song.controller')

const songRouter = express.Router()

songRouter.post('/', upload.single("song"), uploadSong)

module.exports = songRouter