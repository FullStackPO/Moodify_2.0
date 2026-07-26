import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";

export default function Expression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Loading...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            const success = await init({
                landmarkerRef,
                videoRef,
                streamRef,
            });

            if (success) {
                setExpression("Ready");
            } else {
                setExpression("Initialization Failed");
            }

            setLoading(false);
        }

        initialize();

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    function handleDetect() {
        const result = detect({
            landmarkerRef,
            videoRef,
            setExpression,
        });

        if (!result) return;

        onClick(result);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: "400px",
                    borderRadius: "12px",
                }}
            />

            <h2>{expression}</h2>

            <button
                onClick={handleDetect}
                disabled={loading}
            >
                {loading
                    ? "Loading..."
                    : "Detect Expression"}
            </button>
        </div>
    );
}