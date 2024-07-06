const express = require('express')

const playlistsController = require('../controllers/playlistsController')

const router = express.Router()

router.get('/', playlistsController.getPlaylists)
router.get('/:id', playlistsController.getPlaylist)
router.post('/', playlistsController.createPlaylist)
router.delete('/:id', playlistsController.deletePlaylist)
router.post('/:id/addSong', playlistsController.addSong)
router.delete('/:id/removeSong', playlistsController.removeSong)

module.exports = router