
import './lookImage.scss';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const LookImage = (props) => {


    //const navigate = useNavigate()
    const containerRef = useRef(null);
    const imageRef = useRef() || undefined;

    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    //const [isAnimated, setIsAnimated] = useState(true);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [landscape, setLandscape] = useState(false)


    const minZoomT = 0.6;
    const maxZoomT = 3.6;
    const minZoom = 1;
    const maxZoom = 3;

    const handleMouseWheel = (e) => {

        const newZoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : zoomLevel - 0.1;

        if (newZoomLevel >= minZoomT && newZoomLevel <= maxZoomT) {

            setZoomLevel(newZoomLevel);

            if (newZoomLevel <= minZoom) {
                setPosition({ x: 0, y: 0 });
            } else {
                if (newZoomLevel < zoomLevel) {
                    setPosition({ x: position.x / 1.3, y: position.y / 1.3 });
                }
            }

        }

        if (maxZoom < newZoomLevel) {
            setTimeout(() => {
                setZoomLevel(maxZoom);
            }, 200);
        }

        if (minZoom > newZoomLevel) {
            setTimeout(() => {
                setZoomLevel(minZoom);
            }, 200);

        }


    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        //setIsAnimated(false)
        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = (e) => {
        //e.preventDefault();
        const touch = e.touches[0];
        //setTimeout(() => {
        setIsDragging(true);
        //}, 200);
        //setIsAnimated(true)
        if (e.touches.length === 2) {
            if (zoomLevel !== 3) {
                setZoomLevel(1)
                setPosition({ x: 0, y: 0 })
            }
            else if (zoomLevel !== 1) {
                setZoomLevel(1.5)
            }
            else if (zoomLevel !== 1.5) {
                setZoomLevel(2)
            }
            else if (zoomLevel !== 2) {
                setZoomLevel(3)
            }
        }
        setStartPosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchZoom = () => {
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

        if (imageRect.height <= containerRect.height && imageRect.width <= containerRect.width) {
            if (imageRect.width <= containerRect.width && imageRect.height <= containerRect.height) {
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


        //console.log(6);
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
            //setIsAnimated(false)
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

            if (imageRect.height <= containerRect.height && imageRect.width <= containerRect.width) {
                if (imageRect.width <= containerRect.width && imageRect.height <= containerRect.height) {
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

        } else {
            const endY = e.changedTouches[0].clientY; // Récupère la position Y du toucher final
            const deltaY = endY - startPosition.y; // Calcule la différence de position Y

            // Vérifie si le mouvement est un swipe vers le haut et si la distance parcourue est suffisante
            if (deltaY < -150) {
                // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
                props.setFullScreenImg()
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
            } else {
                // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
                props.setFullScreenImg()
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
            }
        }

    }
    const handletouchEnd = () => {
        //setZoomLevel(1)
        setIsDragging(false);
        //setIsAnimated(true)
    };

    const handleMouseUp = () => {
        //setIsAnimated(true)
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

        //// Clic sur l'élément lui-même
        props.setFullScreenImg()
        setPosition({ x: 0, y: 0 });
        setZoomLevel(1);
        setIsDragging(false)


    }

    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')

    //console.log({ width: width, height: height });

    const imageSize = () => {
        if (zoomLevel === 1) {
            if (imageRef.current && containerRef.current) {
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
                const imageRect = imageRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();


                if (props.mobile) {
                    if (landscape) {
                        setHeight('max-content')
                        return setWidth('max-content')
                    } else {
                        if (imageRect.width < containerRect.width) {
                            if (imageRect.height < containerRect.height) {
                                setHeight('max-content')
                                return setWidth('max-content')
                            }
                            setHeight('100%')
                            return setWidth('max-content')
                        }
                        setHeight('max-content')
                        return setWidth('100%')
                    }
                }

                if (imageRect.width - imageRect.height < 100) {
                    setWidth('max-content')
                    return setHeight('max-content')
                }
                if (imageRect.width > imageRect.height) {
                    setHeight('max-content')
                    return setWidth('100vh')
                }
                if (imageRect.width == imageRect.height) {
                    setHeight('100%')
                    setWidth('max-content')
                }
            }
        }
    };

    //console.log(width);
    //console.log(height);

    useEffect(() => {
        imageSize();

        //return () => {
        //    // Clic sur l'élément lui-même
        //    props.setFullScreenImg()
        //    setPosition({ x: 0, y: 0 });
        //    setZoomLevel(1);
        //    setIsDragging(false)
        //}
    }, []);


    //const mobileApp = {
    //    height: '100vh',
    //    width: '50vh'
    //}
    //const mobileApp = {
    //    height: '100vh',
    //    width: '100vh'
    //}


    useEffect(() => {
        if (!props.mobile) {
            return;
        }
        // Define a media query for landscape orientation
        const landscapeQuery = window.matchMedia("(orientation: landscape)");
        //const 
        // Function to handle changes in orientation
        const handleOrientationChange = (event) => {

            if (event.matches) {
                // Device is in landscape mode
                //console.log("Device is in landscape mode");
                setLandscape(true)
                imageSize()
                // Perform actions specific to landscape mode
            } else {
                // Device is not in landscape mode
                //console.log("Device is not in landscape mode");
                setLandscape(false)
                imageSize()
                // Perform actions specific to portrait mode
            }
        };
        // Attach listener for changes in orientation
        landscapeQuery.addListener(handleOrientationChange);
        // Initial check for device orientation
        handleOrientationChange(landscapeQuery);
    }, [props.mobile])

    const filter = props.fullScreenFilter ? {
        filter: `
        brightness(${props.fullScreenFilter.brightness}%)
        contrast(${props.fullScreenFilter.contrast}%)
        saturate(${props.fullScreenFilter.saturation}%)
        sepia(${props.fullScreenFilter.sepia}%)
        hue-rotate(${props.fullScreenFilter.hue}deg)
        blur(${props.fullScreenFilter.blur}px)
        grayscale(${props.fullScreenFilter.grayscale}%)
        `
    } : null ;
    

    return (
        <>
            <div className='backgroundImg'
                ref={containerRef}
                onWheel={handleMouseWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseUp}
                onDoubleClick={!props.mobile ? handleDoubleClick : handleTouchZoom}
                onContextMenu={props.mobile ? handleDoubleClick : null}


                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handletouchEnd}
                style={{
                    cursor: minZoom < zoomLevel ? 'all-scroll' : 'default',
                    //...props.mobile ? mobileApp : {},
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
            >
                {props.system && <div className='open-element-info-left'
                    style={{
                        width: 'max-content',
                        borderRadius: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'fixed',
                        zIndex: 50000,
                        top: '98%',
                        left: '2%',
                        transform: 'translate(2%, -98%)',
                        background: '#232526',
                        color: 'white',
                        opacity: 0.8,
                        paddingLeft: 5,
                        paddingRight: 5
                    }}>
                    <h4 style={{ margin: 5 }}>Developer</h4>
                    {props.systemAdvanced && <>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>mode: {props.mobile ? 'Mobile' : 'Pc'}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>landscape: {landscape ? '🔵' : '🔴'}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>dragging: {isDragging ? '🔵' : '🔴'}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>animated: {!isDragging ? '🔵' : '🔴'}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>position_Width: {width}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>position_Height: {height}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>start_position: {startPosition.x.toFixed(1)} x, {startPosition.y.toFixed(1)} y</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>position: {position.x.toFixed(1)} x, {position.y.toFixed(1)} y</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>min_zoom: {minZoom.toFixed(1)}✅ / {minZoomT.toFixed(1)}⛔</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}>
                            <div>max_zoom: {maxZoom.toFixed(1)}✅ / {maxZoomT.toFixed(1)}⛔</div>
                        </div>
                    </>}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 5
                    }}>
                        <div>zoom: {zoomLevel.toFixed(1)}X</div>
                    </div>
                </div>}

                <img loading="lazy"

                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                    ref={imageRef}
                    src={props.fullScreenImg || props.picture}
                    alt="Image"
                    style={{
                        display: 'block',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                        transition: !isDragging ? 'transform 250ms ease-in-out' : '',
                        objectFit: 'contain',
                        height: height,
                        width: width,
                        maxWidth: '100vh',
                        maxHeight: '100vh',
                        overflow: 'clip',
                        ...filter
                    }}
                />
            </div>
        </>
    )
}

export default LookImage