const express = require('express')

const playlistsController = require('../controllers/playlistsController')

const router = express.Router()

router.get('/getPlaylists', playlistsController.getPlaylists)
router.get('/:id', playlistsController.getPlaylist)
router.post('/createPlaylist', playlistsController.createPlaylist)
router.delete('/deletePlaylist/:id', playlistsController.deletePlaylist)
router.post('/:id/addSong', playlistsController.addSong)
router.delete('/:id/removeSong', playlistsController.removeSong)

module.exports = router