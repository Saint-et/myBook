
import './lookImage.scss';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Zoom } from 'react-slideshow-image';



const LookImage = (props) => {

    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimated, setIsAnimated] = useState(true);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });


    const minZoomT = 0.600;
    const minZoom = 1;
    const maxZoom = 3;

    const handleMouseWheel = (e) => {



        const newZoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : zoomLevel - 0.1;





        if (newZoomLevel >= minZoomT && newZoomLevel <= maxZoom) {

            setZoomLevel(newZoomLevel);


            if (newZoomLevel < minZoom) {
                setPosition({ x: 0, y: 0 });
            } else {

                if (e.deltaY > 0) {
                    setPosition({ x: position.x / 1.5, y: position.y / 1.5 });
                }
            }

        }



        if (minZoom < newZoomLevel) return;


        setTimeout(() => {
            setZoomLevel(minZoom);
        }, 200);


    };


    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setIsAnimated(false)
        setStartPosition({ x: e.clientX, y: e.clientY });
    };



    const handleMouseMove = (e) => {

        if (zoomLevel === 1 || !isDragging || minZoom > zoomLevel) return

        const imageRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const deltaX = imageRect.width - containerRect.width;
        const deltaY = imageRect.height - containerRect.height;


        const dx = e.clientX - startPosition.x;
        const dy = e.clientY - startPosition.y;
        // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
        const newPosX = Math.min(Math.max(position.x + dx, -deltaX / 2), deltaX / 2);
        const newPosY = Math.min(Math.max(position.y + dy, -deltaY / 2), deltaY / 2);

        setStartPosition({ x: e.clientX, y: e.clientY });

        if (imageRect.height > containerRect.height) {
            if (imageRect.width < containerRect.width) {
                return setPosition({ x: 0, y: newPosY });
            }
        }

        if (imageRect.width > containerRect.width) {
            if (imageRect.height < containerRect.height) {
                return setPosition({ x: newPosX, y: 0 });
            }
        }

        setPosition({ x: newPosX, y: newPosY });

        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutContainer = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsDragging(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutContainer);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutContainer);
        };
    };


    const handleMouseUp = () => {
        setIsAnimated(true)
        setIsDragging(false);

    };




    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.setFullScreenImg()
                    setPosition({ x: 0, y: 0 });
                    setZoomLevel(1);
                    setIsDragging(false)

                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(containerRef);

    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')

    const imageSize = () => {
        if (imageRef.current && containerRef.current) {
            const imageRect = imageRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // vertical
            if (imageRect.width < containerRect.width) {
                setWidth('max-content')
                setHeight('100%')

            } else {
                setHeight('max-content')
                setWidth('100%')
            }
        }
    };

    useEffect(() => {
        imageSize();
        // Appelez imageSize() une fois lors du montage initial
        // Surveillez les changements de fullScreenImg
    }, [props.fullScreenImg, imageRef, containerRef]);


    return (
        <>
            <div className='backgroundImg open-elementPage'
                ref={containerRef}
                onWheel={handleMouseWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseUp}
                style={{
                    cursor: minZoom < zoomLevel ? 'all-scroll' : 'default'
                }}
            >



                <img
                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                    ref={imageRef}
                    src={props.fullScreenImg || props.picture}
                    alt="Image"
                    style={{
                        display: 'block',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                        transition: isAnimated ? 'transform 150ms ease-in-out' : '',
                        objectFit: 'contain',
                        height: height,
                        width: width,
                        overflow: 'clip'
                    }}
                />

            </div>
        </>
    )
}

export default LookImage