import { useState } from 'react'

import PlaylistsView from './components/playlistsView'

function App() {

  return (
    <div className='container prose mx-auto mt-3'>
      <h1 className='text-center'>Music Playlist Manager</h1>

      <PlaylistsView />
    </div>
  )
}

export default App
