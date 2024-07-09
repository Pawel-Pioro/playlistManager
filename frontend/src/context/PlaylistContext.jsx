import { createContext, useReducer } from 'react'

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYLISTS':
            return {
                playlists: action.payload
            }
        case 'CREATE_PLAYLIST':
            return {
                playlists: [action.payload, ...state.playlists]
            }
        case 'DELETE_PLAYLIST':
            return {
                playlists: state.playlists.filter((playlist) => playlist.id !== action.payload)
            }
        case 'UPDATE_PLAYLIST':
            return {
                playlists: [...state.playlists.map((playlist) => playlist.id === action.payload.id ? action.payload : playlist )]
            }
        default:
            return state
    }
}

export function PlaylistsContextProvider({ children }) {
    const [state, dispatch] = useReducer(playlistReducer, {
        playlists: []
    })

    return (
        <PlaylistContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}