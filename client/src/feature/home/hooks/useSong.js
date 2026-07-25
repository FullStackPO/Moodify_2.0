import { useContext } from "react"
import { songContext } from "../Song.context"
import { getSong } from "../service/song.api"

export async function useSong(){

    const context = useContext(songContext)
    const { song, setSong, loading, setLoading } = context

    async function handleGetSong({mood}){
        setLoading(true)
        const data = await getSong({mood})
        setSong(data.song)
        setLoading(false)
    }

    return ({loading, song, handleGetSong})

}

