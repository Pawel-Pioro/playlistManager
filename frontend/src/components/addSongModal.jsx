import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from 'axios'

export default function AddSongModal({ onClose, isOpen, playlistId }) {
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const [inputs, setInputs] = useState({
        name: '',
        URL: ''
    })

    function addSong() {
        axios.post(serverUrl + 'playlists/' + playlistId + '/addSong', inputs)
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Song</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    bordered
                                    size="lg"
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    value={inputs.name}
                                />
                                <Input
                                    label="URL"
                                    bordered
                                    size="lg"
                                    onChange={(e) => setInputs({ ...inputs, URL: e.target.value })}
                                    value={inputs.URL}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={addSong}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
