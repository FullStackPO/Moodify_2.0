import React from 'react'
import { useSong } from '../hooks/useSong'
import Player from '../components/Player'
import Expression from '../../expression/components/Expression'


const Home = () => {

  const { handleGetSong } = useSong()

  return (
    <>
      <Expression onClick={(expression) => { handleGetSong({ mood: expression }) }} />
      <Player />
    </>
  )
}

export default Home
