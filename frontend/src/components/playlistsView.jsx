import { useState, useEffect } from 'react'
import axios from 'axios'
import { usePlaylistContext } from '../hooks/usePlaylistContext'

import SongItem from './songItem'
import AddSongModal from './addSongModal'
import CreatePlaylist from './createPlaylist'
import { Accordion, AccordionItem, Button, useDisclosure } from '@nextui-org/react'

export default function PlaylistsView() {
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {playlists, dispatch} = usePlaylistContext()
    const [currentPlaylist, setCurrentPlaylist] = useState(null)

    useEffect(() => {
        axios.get(serverUrl + 'playlists')
            .then((response) => {
                dispatch({ type: 'SET_PLAYLISTS', payload: response.data.reverse() })
            })
            .catch((error) => console.log(error))
    }, [])

    function deletePlaylist(playlistId) {
        axios.delete(serverUrl + 'playlists/' + playlistId)
            .then((response) => {
                if (response.statusText === "OK") {
                    dispatch({ type: 'DELETE_PLAYLIST', payload: playlistId })
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <h2 className='my-2'>Your Playlists</h2>
            <CreatePlaylist />
            <Accordion variant="splitted" selectionMode="multiple">
                {playlists.map((playlist) => (
                    <AccordionItem
                        key={playlist.id}
                        onPress={() => setCurrentPlaylist(playlist.id)}

                        subtitle={
                            <span>
                                {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                            </span>
                        }
                        title={playlist.name}

                    >
                        <div className='grid grid-rows-1 grid-cols-2 gap-4'>
                            <Button variant="bordered" color="primary" onClick={onOpen}>Add Song</Button>
                            <Button onClick={() => deletePlaylist(playlist.id)} variant="ghost" color="danger">Delete Playlist</Button>
                        </div>
                        {playlist.songs.length > 0 &&
                            <div className="border-small p-4 mt-2 rounded-small border-default-200 dark:border-default-100">
                                {
                                    playlist.songs.map((song) => (
                                        <SongItem song={song} playlistId={playlist.id} key={song.id} />
                                    ))
                                }
                            </div>
                        }
                    </AccordionItem>
                ))}
            </Accordion>

            <AddSongModal onClose={onClose} isOpen={isOpen} playlistId={currentPlaylist} />
        </div>
    )
}