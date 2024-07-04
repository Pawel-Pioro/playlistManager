const db = require('../config/db.js')

const getPlaylists = async (req, res) => {
    const users = await db.playlist.findMany({
        include: {
            songs: true
        }
    })
    res.json(users)
}

const getPlaylist = async (req, res) => {
    const { id } = req.params
}

const createPlaylist = async (req, res) => {
    const { songs } = req.body
    const newPlaylist = await db.playlist.create({
        data: {
            songs: {
                create: songs.map((song) => ({
                    URL: song.URL,
                })),
            },
        },
        include: {
            songs: true
        },
    })

    res.json(newPlaylist)
}

const deletePlaylist = async (req, res) => {

}

const addSong = async (req, res) => {
    const { id } = req.params
}

const removeSong = async (req, res) => {
    const { id } = req.params
}

module.exports = {
    getPlaylist,
    getPlaylists,
    createPlaylist,
    deletePlaylist,
    addSong,
    removeSong
}