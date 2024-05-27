import { useState } from "react";




const Select_creatives = () => {

    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);
    const [endX, setEndX] = useState(null);
    const [endY, setEndY] = useState(null);
    const [selecting, setSelecting] = useState(false);
    //const startX = e.clientX - componentRect.left;


    const handleMouseDown = (e) => {
        setSelecting(true)
        setStartX(e.clientX);
        setStartY(e.clientY);
        setEndX(e.clientX);
        setEndY(e.clientY);
    };

    const handleMouseMove = (e) => {
        if (selecting) {
            setEndX(e.clientX);
            setEndY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setSelecting(false);
        //setStartX(null);
        //setStartY(null);
        //setEndX(null);
        //setEndY(null);
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,

        
        startX,
        startY,
        endX,
        endY,
        selecting,

        setStartX,
        setStartY,
        setEndX,
        setEndY,
        setSelecting
    }
}

export default Select_creatives