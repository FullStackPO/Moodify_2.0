import { useContext } from "react"
import { songContext } from "../Song.context"
import { getSong } from "../service/song.api"

export function useSong(){

    const context = useContext(songContext)
    const { song, setSong, loading, setLoading } = context

    async function handleGetSong({mood}){
        setLoading(true)
        const data = await getSong({mood})
        console.log(data.song)
        setSong(data.song)
        setLoading(false)
    }

    return ({ song, loading, handleGetSong })

}

