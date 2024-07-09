import { PlaylistContext } from "../context/PlaylistContext";
import { useContext } from "react";

export function usePlaylistContext() {
    const context = useContext(PlaylistContext)

    return context
}