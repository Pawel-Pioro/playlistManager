const db = require('../config/db.js')

const getPlaylists = async (req, res) => {
    const playlists = await db.playlist.findMany({
        include: {
            songs: true
        }
    })
    res.status(200).json(playlists)
}

const getPlaylist = async (req, res) => {
    const { id } = req.params
    const playlist = await db.playlist
        .findUnique({
            where: {
                id: Number(id),
            },
            include: {
                songs: true
            },
        })

    res.status(200).json(playlist)
}

const createPlaylist = async (req, res) => {
    const { name, songs } = req.body
    const newPlaylist = await db.playlist.create({
        data: {
            name,
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

    res.status(200).json(newPlaylist)
}

const deletePlaylist = async (req, res) => {
    const { id } = req.params

    const playlist = await db.playlist.delete({
        where: {
            id: Number(id),
        },
    })
    res.status(200).json(playlist)
}

const addSong = async (req, res) => {
    const { id } = req.params
    const { URL } = req.body
    // Check if the playlist exists
    const existingPlaylist = await db.playlist.findUnique({
        where: { id: Number(id) },
    });

    if (!existingPlaylist) {
        return res.status(404).json({ error: 'Playlist not found' });
    }

    // Create the song and add it to the playlist
    const newSong = await db.song.create({
        data: {
            URL,
            playlist: {
                connect: { id: existingPlaylist.id },
            },
        },
    });

    res.status(200).json(newSong);
}

const removeSong = async (req, res) => {
    const { id } = req.params
    const { songId } = req.body

    // Check if the playlist exists
    const existingPlaylist = await db.playlist.findUnique({
        where: { id: Number(id) },
    });

    if (!existingPlaylist) {
        return res.status(404).json({ error: 'Playlist not found' });
    }

    // Delete the song from the playlist
    const deletedSong = await db.song.delete({
        where: {
            id: Number(songId),
        },
    });

    res.status(200).json(deletedSong);
}

module.exports = {
    getPlaylist,
    getPlaylists,
    createPlaylist,
    deletePlaylist,
    addSong,
    removeSong
}