import { useState } from "react";



const UseAreaDrawCreative = () => {


    const [zoom, setZoom] = useState(0.5);
    const [isResizing, setIsResizing] = useState(false);

    // Text
    const [width, setWidth] = useState(300)
    const [height, setHeight] = useState(200)
    const [leftOffset, setLeftOffset] = useState(0);
    const [topOffset, setTopOffset] = useState(0);


    const [positionTest, setPositionTest] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const [drawText, setDrawText] = useState({
        width: 300,
        height: 200,
        leftOffset: 0,
        topOffset: 0,
        positionX: 0,
        positionY: 0,
        value: "",
        color: '#ffffff',
        color2nd: '#ffffff',
        fontSize: 24,
       // underline: 'none',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'normal'
    })

    const handleDefaultDrawText = () => {
        setDrawText({
            width: 300,
            height: 200,
            leftOffset: 0,
            topOffset: 0,
            positionX: 0,
            positionY: 0,
            value: "",
            color: '#ffffff',
            color2nd: '#ffffff',
            fontSize: 24,
           // underline: 'none',
            textAlign: 'center',
            fontStyle: 'normal',
            fontWeight: 'normal'
        })
    }
    //

    const handleMouseDownResizing = (e, direction) => {
        e.preventDefault();
        setIsResizing(direction);
        setStartPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseUpResizing = () => {
        setIsResizing(false);
    };

    const handleMouseMoveResizing = (e) => {
        if (!isResizing) return;

        const minSize = 30;

        const dx = e.clientX - startPosition.x;
        const dy = e.clientY - startPosition.y;

        const deltaX = dx / zoom;
        const deltaY = dy / zoom;

        switch (isResizing) {
            case 'right-bottom':
                const newBottomR = Math.max(drawText.height + deltaY, minSize);
                const newRightB = Math.max(drawText.width + deltaX, minSize);
                if (newRightB > minSize && newBottomR > minSize) {
                    setDrawText({
                        ...drawText,
                        width: newRightB,
                        height: newBottomR
                    });
                }
                break;
            case 'left-bottom':
                const newBottomL = Math.max(drawText.height + deltaY, minSize);
                const newLeftB = Math.max(drawText.width - deltaX, minSize);
                if (newLeftB > minSize && newBottomL > minSize) {
                    setDrawText({
                        ...drawText,
                        width: newLeftB,
                        height: newBottomL,
                        leftOffset: drawText.leftOffset + deltaX
                    });
                }
                break;
            case 'left-top':
                const newLeftT = Math.max(drawText.width - deltaX, minSize);
                const newTopL = Math.max(drawText.height - deltaY, minSize);
                if (newTopL > minSize && newLeftT > minSize) {
                    setDrawText({
                        ...drawText,
                        height: newTopL,
                        width: newLeftT,
                        topOffset: drawText.topOffset + deltaY,
                        leftOffset: drawText.leftOffset + deltaX
                    });
                }
                break;
            case 'right-top':
                const newRightT = Math.max(drawText.width + deltaX, minSize);
                const newTopR = Math.max(drawText.height - deltaY, minSize);
                if (newTopR > minSize && newRightT > minSize) {
                    setDrawText({
                        ...drawText,
                        height: newTopR,
                        width: newRightT,
                        topOffset: drawText.topOffset + deltaY
                    });
                }
                break;
            case 'right':
                const newRight = Math.max(drawText.width + deltaX, minSize);
                if (newRight > minSize) {
                    setDrawText({
                        ...drawText,
                        width: newRight
                    });
                }
                break;
            case 'bottom':
                const newBottom = Math.max(drawText.height + deltaY, minSize);
                if (newBottom > minSize) {
                    setDrawText({
                        ...drawText,
                        height: newBottom
                    });
                }
                break;
            case 'left':
                const newLeft = Math.max(drawText.width - deltaX, minSize);
                if (newLeft > minSize) {
                    setDrawText({
                        ...drawText,
                        width: newLeft,
                        leftOffset: drawText.leftOffset + deltaX
                    });
                }
                break;
            case 'top':
                const newTop = Math.max(drawText.height - deltaY, minSize);
                if (newTop > minSize) {
                    setDrawText({
                        ...drawText,
                        height: newTop,
                        topOffset: drawText.topOffset + deltaY
                    });
                }
                break;
            case 'top-move':
                setDrawText({
                    ...drawText,
                    positionX: drawText.positionX + deltaX,
                    positionY: drawText.positionY + deltaY
                });
                break;
            default:
                break;
        }


        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    // console.log(drawText);

    return {
        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,

        leftOffset,
        width,
        height,
        topOffset,
        positionTest,
        zoom, setZoom,

        setWidth,
        setHeight,
        setLeftOffset,
        setTopOffset,
        setPositionTest,

        handleDefaultDrawText,
        setDrawText,
        drawText,
    }
}

export default UseAreaDrawCreative