import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

export const init = async ({
    landmarkerRef,
    videoRef,
    streamRef,
}) => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                },
                runningMode: "VIDEO",
                outputFaceBlendshapes: true,
                numFaces: 1,
            }
        );

        streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        videoRef.current.srcObject = streamRef.current;

        await videoRef.current.play();

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const detect = ({
    landmarkerRef,
    videoRef,
    setExpression,
}) => {
    if (!landmarkerRef.current) return null;
    if (!videoRef.current) return null;

    if (videoRef.current.readyState < 2) {
        return null;
    }

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (!results.faceBlendshapes?.length) {
        setExpression("No Face");
        return "No Face";
    }

    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
        blendshapes.find(
            (item) => item.categoryName === name
        )?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");

    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    console.table({
        smileLeft,
        smileRight,
        jawOpen,
        browUp,
        frownLeft,
        frownRight,
    });

    let expression = "neutral";

    if (smileLeft > 0.5 && smileRight > 0.5) {
        expression = "happy";
    } else if (jawOpen > 0.35 && browUp > 0.35) {
        expression = "surprised";
    } else if (frownLeft > 0.3 && frownRight > 0.3) {
        expression = "sad";
    }

    setExpression(expression);

    return expression;
};