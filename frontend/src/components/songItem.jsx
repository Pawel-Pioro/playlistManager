import { Link, Button } from "@nextui-org/react";
import axios from 'axios'
import { usePlaylistContext } from '../hooks/usePlaylistContext'

export default function PlaylistItem({ song, playlistId }) {
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const {playlists, dispatch} = usePlaylistContext()

    function deleteSong(songId){
        axios.delete(serverUrl + 'playlists/' + playlistId + '/removeSong', {
            data: {
                songId
            }
        })
        .then((response) => {
            dispatch({ type: 'UPDATE_PLAYLIST', payload: response.data})
        })
        .catch((error) => console.log(error))
    }

    return (
        <div key={song.id} className="bg-default-100  mb-3 px-3 py-2 rounded-small" >
            <Link isBlock showAnchorIcon className="cursor-pointer" onClick={() => window.open(song.URL, '_blank').focus()} color="foreground">
                {song.name}
            </Link>
            <Button onClick={() => deleteSong(song.id)} color="danger" variant="ghost" className="float-right ms-4">Delete</Button>
        </div>
    )
}