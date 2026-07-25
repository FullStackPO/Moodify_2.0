import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext()

export const songProvider = ({children}) => {

    const[song, setSong] = useState({ 
        "url": "https://ik.imagekit.io/tt0fjz3qv/moodify/Khaamiyan_qJm4KuM1P.mp3",
        "posterUrl": "https://ik.imagekit.io/tt0fjz3qv/moodify/Khaamiyan_4qaKqPeh1.jpeg",
        "title": "Khaamiyan",
        "mood": "sad"
    })

    const[loading, setLoading] = useState(false)

    return (
    <songContext.Provider value={{song, setSong, loading, setLoading}}>
        {children}
    </songContext.Provider>
    )
}