import Nav from '../components/nav'
import Activity from '../components/activity'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import UploadModal from '../components/UploadModal'
import CloudModal from '../components/CloudModal'
import Playlist from '../components/Playlist'
import PlayerControls from '../components/PlayerControls'

import useSpotify from '../hooks/useSpotify'
//import {songs} from '../data/songs'


const HomePage = () => {
  const [showUploadMusic, setShowUploadMusic] = useState(false)
  const [title, setTitle] = useState('')
  const [musicUrl, setMusicUrl] = useState('')
  const [songs, setSongs] = useState([])
  const [cloudStorage, setCloudStorage] = useState(false)

  const { newMusic, getSongs } = useSpotify(
    musicUrl,
    title,
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  )

  useEffect(() => {
    getSongs().then(songs=>{
      setSongs(songs)
    })
  }, [])

  return (
    <div className='flex'>
      <Nav />
        <div className='w-full'>
          <Header setShowUploadMusic={setShowUploadMusic} setCloudStorage={setCloudStorage}/>
          <Playlist songs={songs}/>
          <PlayerControls songs={songs}/>
          {showUploadMusic && (
            <UploadModal 
              title={title}
              setTitle={setTitle} 
              setShowUploadMusic={setShowUploadMusic}
              musicUrl={musicUrl}
              setMusicUrl={setMusicUrl}
              newMusic={newMusic}
            />
          )}
          {cloudStorage && (
            <CloudModal setCloudStorage={setCloudStorage} />
          )}
          
          
        </div>
      <Activity />
    </div>
  )
}

export default HomePage
