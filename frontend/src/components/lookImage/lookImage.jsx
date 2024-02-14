
import './lookImage.scss';
import { useEffect, useState, useLayoutEffect, unityInstance } from 'react';
import { useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LookImage = (props) => {

    //const navigate = useNavigate()
    const cancel = useRef();
    const containerRef = useRef(null);
    const imageRef = useRef() || undefined;

    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimated, setIsAnimated] = useState(true);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate()


    const minZoomT = 0.6;
    const minZoom = 1;
    const maxZoom = 3;

    const handleMouseWheel = (e) => {

        const newZoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : zoomLevel - 0.1;





        if (newZoomLevel >= minZoomT && newZoomLevel <= maxZoom) {

            setZoomLevel(newZoomLevel);

            if (newZoomLevel <= minZoom) {
                setPosition({ x: 0, y: 0 });
            } else {
                if (newZoomLevel < zoomLevel) {
                    setPosition({ x: position.x / 1.3, y: position.y / 1.3 });
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

    const handleTouchStart = (e) => {
        //e.preventDefault();
        const touch = e.touches[0];
        setTimeout(() => {
            setIsDragging(true);
        }, 200);
        setIsAnimated(true)
        if (e.touches.length === 2) {
            if (zoomLevel === 3) {
                setZoomLevel(1)
                setPosition({ x: 0, y: 0 })
            }
            else if (zoomLevel === 1) {
                setZoomLevel(1.5)
            }
            else if (zoomLevel === 1.5) {
                setZoomLevel(2)
            }
            else if (zoomLevel === 2) {
                setZoomLevel(3)
            }
        }
        setStartPosition({ x: touch.clientX, y: touch.clientY });
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

        if (imageRect.height < containerRect.height && imageRect.width < containerRect.width) {
            if (imageRect.width < containerRect.width && imageRect.height < containerRect.height) {
                return setPosition({ x: 0, y: 0 });
            }
            if (imageRect.width < containerRect.width) {
                return setPosition({ x: 0, y: newPosY });
            }
            if (imageRect.height < containerRect.height) {
                return setPosition({ x: newPosX, y: 0 });
            }
        }

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

    const handleTouchMove = (e) => {
        //if (zoomLevel === 1 || !isDragging || minZoom > zoomLevel) return

        //e.preventDefault();

        if (e.touches.length !== 2 && minZoom < zoomLevel) {
            setIsAnimated(false)
            //setIsDragging(true)
            const touch = e.touches[0];

            const imageRect = imageRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const deltaX = imageRect.width - containerRect.width;
            const deltaY = imageRect.height - containerRect.height;


            const dx = touch.clientX - startPosition.x;
            const dy = touch.clientY - startPosition.y;
            // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
            const newPosX = Math.min(Math.max(position.x + dx, -deltaX / 2), deltaX / 2);
            const newPosY = Math.min(Math.max(position.y + dy, -deltaY / 2), deltaY / 2);

            setStartPosition({ x: touch.clientX, y: touch.clientY });

            if (imageRect.height < containerRect.height && imageRect.width < containerRect.width) {
                if (imageRect.width < containerRect.width && imageRect.height < containerRect.height) {
                    return setPosition({ x: 0, y: 0 });
                }
                if (imageRect.width < containerRect.width) {
                    return setPosition({ x: 0, y: newPosY });
                }
                if (imageRect.height < containerRect.height) {
                    return setPosition({ x: newPosX, y: 0 });
                }
            }

            if (imageRect.height < containerRect.height) {
                setPosition({ x: newPosX, y: 0 });
            } else {
                setPosition({ x: newPosX, y: newPosY });

            }


        }

    }
    const handletouchEnd = () => {
        //setZoomLevel(1)
        setIsDragging(false);
        setIsAnimated(true)
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


    const handleDoubleClick = (e) => {
        if (zoomLevel > 1) {
            setZoomLevel(1)
            return setPosition({ x: 0, y: 0 })
        }

        // Clic sur l'élément lui-même
        props.setFullScreenImg()
        setPosition({ x: 0, y: 0 });
        setZoomLevel(1);
        setIsDragging(false)


    }

    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')



    const imageSize = () => {
        if (zoomLevel === 1) {
            if (imageRef.current && containerRef.current) {
                //Cancel.current.animationFrameId.requestAnimationFrame(() => {
                const imageRect = imageRef.current.getBoundingClientRect();
                //const containerRect = containerRef.current.getBoundingClientRect();

                //console.log(window.innerWidth, window.innerHeight);

                //console.log({width: imageRect.width}, {height: imageRect.height});

                //setHeight('100%')
                //setWidth('100%')
                
                if (imageRect.width < imageRect.height) {
                    //console.log(1);
                    setWidth('max-content')
                    setHeight('100%')
                }
                if (imageRect.width > imageRect.height) {
                    //console.log(2);
                    setHeight('max-content')
                    setWidth('100%')
                    
                }
                if (imageRect.width == imageRect.height) {
                    //console.log(3);
                    setHeight('100%')
                    setWidth('max-content')
                }

                //if (window.innerWidth < 980) {
                //    //setWidth('100%')
                //    //return setHeight('max-content')
                //    if (imageRect.height > imageRect.width) {
                //        //setWidth('max-content')
                //        //setHeight('100%')
                //        console.log(1);
                //        setWidth('100%')
                //        setHeight('100%')
                //    } else {
                //        //setHeight('max-content')
                //        //setWidth('100%')
                //        console.log(2);
                //        setWidth('100%')
                //        setHeight('max-content')
                //    }
                //} else {
                //    if (imageRect.height > imageRect.width) {
                //        //setWidth('max-content')
                //        //setHeight('100%')
                //        //console.log(1);
                //        setWidth('max-content')
                //        setHeight('100%')
                //    } else {
                //        //setHeight('max-content')
                //        //setWidth('100%')
                //        //console.log(2);
                //        setWidth('100%')
                //        setHeight('max-content')
                //    }
                //}
            }


            //requestAnimationFrame(imageSize);
            //})
        }
    };

    //console.log(width);
    //console.log(height);

    useEffect(() => {
        imageSize();
    }, []);


    return (
        <>
            <div className='backgroundImg open-elementPage'
                ref={containerRef}
                onWheel={handleMouseWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseUp}
                onDoubleClick={handleDoubleClick}


                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handletouchEnd}
                onTouchCancel={(e) => {
                    e.preventDefault();
                    props.setFullScreenImg(null)
                }}
                style={{
                    cursor: minZoom < zoomLevel ? 'all-scroll' : 'default'
                }}
            >

                <img loading="lazy"

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