import Player from "../components/Player";
import Expression from "../../expression/components/Expression";
import { useSong } from "../hooks/useSong";

export default function Home() {
    const { handleGetSong } = useSong();

    const handleExpression = (expression) => {
        console.log("Detected:", expression);

        handleGetSong({
            mood: expression,
        });
    };

    return (
        <>
            <Expression onClick={handleExpression} />
            <Player />
        </>
    );
}