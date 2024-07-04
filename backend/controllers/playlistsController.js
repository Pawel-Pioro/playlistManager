const getPlaylists = async (req, res) => {

}

const getPlaylist = async (req, res) => {
    const { id } = req.params
}

const createPlaylist = async (req, res) => {

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