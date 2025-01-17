import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import { useState } from "react"
import axios from 'axios'
import { usePlaylistContext } from '../hooks/usePlaylistContext'

export default function createPlaylist() {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {playlists, dispatch} = usePlaylistContext()
    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState({ 
        name: ''
    })

    function createPlaylistHandler() {
        setLoading(true)
        axios.post(serverUrl + 'playlists', {
            name: inputs.name,
            songs: []
        })
            .then((response) => {
                if (response.statusText === "OK") {
                    dispatch({ type: 'CREATE_PLAYLIST', payload: response.data })
                    setInputs({ name: '' })
                    onClose()
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <Button onClick={onOpen} variant="shadow" color="primary" className="w-full my-3">Create Playlist</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Playlist</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    bordered
                                    size="lg"
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    value={inputs.name}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={loading} color="primary" onPress={createPlaylistHandler}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}