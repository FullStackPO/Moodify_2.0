const songModel = require('../models/song.model')
const storageService = require('../services/storage.service')
const id3 = require('node-id3')

async function uploadSong(req, res){

    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
    const { mood } = req.body

    const [songFile , posterFile] = await Promise.all([

        storageService.uploadFile({
            buffer : songBuffer,
            filename : tags.title + ".mp3",
            folder : "/moodify"
        }),

        storageService.uploadFile({
            buffer : tags.image.imageBuffer,
            filename : tags.title + ".jpeg",
            folder : "/moodify"
        })
    
    ])

    const song = await songModel.create({
        url : songFile.url,
        posterUrl : posterFile.url,
        title : tags.title,
        mood
    })

    res.status(201).json({
        message : 'song added successfully',
        song
    })


}

module.exports = uploadSong