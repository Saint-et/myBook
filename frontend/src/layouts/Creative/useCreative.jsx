import { useEffect, useRef, useState } from "react";
import UseNavbar from "../../Navbar/useNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { SystemName } from "../../assets/data/data";
import { useTranslation } from "react-i18next";
import UseAreaDrawCreative from "./utils/useAreaDraw";



const UseCreative = () => {


    const {
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
    } = UseAreaDrawCreative()

    const {
        handleLogout,
        hiddenMenu,
        setHiddenMenu,
        setNotification
    } = UseNavbar()

    const localSessionComfirmeTemporary = sessionStorage.getItem('confirme_temporary');
    const localExpandMode = localStorage.getItem('expand_creative');

    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    const wrapperRef = useRef(null);
    const contextMenuRef = useRef(null);
    const containerTextRef = useRef(null);
    const canvasContainerScrollRef = useRef(null);

    const sidebarRef = useRef(null);

    const text_canvasRef = useRef(null);


    const [confirme_temporary, setConfirme_temporary] = useState(localSessionComfirmeTemporary);
    const [activeExpandCreative, setActiveExpandCreative] = useState(localExpandMode === 'on' ? true : false);
    const [activeAnimation, setActiveAnimation] = useState(localExpandMode === 'off' ? true : false);
    const [hiddenMenuSidebare, setHiddenMenuSidebare] = useState(localExpandMode === 'off' ? true : false);

    const handleActiveExpandCreative = () => {
        if (activeExpandCreative) {
            localStorage.setItem('expand_creative', 'off')
            setActiveExpandCreative(false)
            setHiddenMenuSidebare(true)
            setActiveAnimation(true)
        } else {
            localStorage.setItem('expand_creative', 'on')
            setActiveExpandCreative(true)
            setHiddenMenuSidebare(false)
            setActiveAnimation(false)
        }
    }

    const navigate = useNavigate()


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const file_url = searchParams.get(`${SystemName}-file`);
    const img_url = searchParams.get(`${SystemName}-img`);


    const { t } = useTranslation();


    const [fileImgProject, setFileImgProject] = useState(false);

    const [systemSetting, setSystemSetting] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0
    });
    const resetToDefault = () => {
        const defaultValue = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0,
            invert: 0
        };
        setSystemSetting(defaultValue);

        //brightness: 100,
        //contrast: 0,
        //saturation: 100,
        //hue: 0,
        //delete > vignette: 0,
        //blur: 0,
        //new > sepia > warmth: 0,
        //new > grayscale: 0,
    };

    const [saveTextCanvas, setSaveTextCanvas] = useState([]);

    const [textCanvasVisible, setTextCanvasVisible] = useState(false);
    const [openTools, setopenTools] = useState(null);

    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    //console.log(hiddenMenuSidebare);

    const handleClick_confirme = () => {
        sessionStorage.setItem('confirme_temporary', true);
        setConfirme_temporary(sessionStorage.getItem('confirme_temporary'))
        // addErrorMessage(`Merci de votre compréhension et de votre coopération.`, 2000, '#396afc')
    };

    const handleButtonClick = () => {
        if (!activeAnimation) {
            setHiddenMenuSidebare(!hiddenMenuSidebare)
            return setActiveAnimation(true)
        }
        // Activez l'animation en mettant à jour l'état local
        setActiveAnimation(false);

        // Vous pouvez également désactiver l'animation après un certain délai si nécessaire
        setTimeout(() => {
            setHiddenMenuSidebare(false)
        }, 300); // Par exemple, désactivez l'animation après 1 seconde
    };


    const useTextCanvasRef = (containerTextRef, sidebarRef) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
                if (containerTextRef.current && !containerTextRef.current.contains(event.target) &&
                    sidebarRef.current && !sidebarRef.current.contains(event.target)) {

                    const text = text_canvasRef.current.innerHTML;
                    //text.contentEditable = false;
                    // console.log(text);

                    if (text) {
                        setSaveTextCanvas(prevSaveTextCanvas => [
                            ...prevSaveTextCanvas,
                            {
                                ...drawText,
                                value: text,
                                id: Date.now() + saveTextCanvas.length
                            }
                        ])
                    }
                    handleDefaultDrawText()
                    setTextCanvasVisible(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [containerTextRef, sidebarRef, textCanvasVisible, drawText, setSaveTextCanvas]);
    }

    //console.log(saveTextCanvas);

    useTextCanvasRef(containerTextRef, sidebarRef, saveTextCanvas);


    const handleRemoveSaveTextCanvas = (promise) => {
        const newArray = saveTextCanvas.filter(item => item.id !== promise.id);
        setSaveTextCanvas(newArray)
        return setDrawText(promise)
    }

    const useOutsideAlerterMenuRef = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsVisible(false);
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

    useOutsideAlerterMenuRef(contextMenuRef);




    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setHiddenMenu(false)
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

    useOutsideAlerter(wrapperRef);

    const handleContextMenu = (event) => {
        event.preventDefault(); // Empêche le menu contextuel par défaut du navigateur
        setIsVisible(true);
        const posX = event.clientX;
        const posY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 280; // Largeur du menu contextuel (à ajuster selon votre conception)
        const menuHeight = 260; // Hauteur du menu contextuel (à ajuster selon votre conception)
        const adjustedX = Math.min(posX, screenWidth - menuWidth); // Ajuste la position X pour rester dans l'écran
        const adjustedY = Math.min(posY, screenHeight - menuHeight); // Ajuste la position Y pour rester dans l'écran
        setPosition({ x: adjustedX, y: adjustedY });
    }

    const [history, setHistory] = useState([]);
    const [ctx, setCtx] = useState(null);

    // Dessine sur le canevas et met à jour l'historique
    const draw = () => {
        const canvas = canvasRef.current;
        if (!ctx) {
            return;
        }
        // Met à jour l'historique avec l'état actuel du canevas
        const updatedHistory = [
            ...history, {
                img: canvas.toDataURL(),
                setting: setSystemSetting
            }];
        setHistory(updatedHistory);
    };

    const undo = () => {
        const canvas = canvasRef.current;
        if (!ctx) {
            return;
        }
        let historical = history.length > 0
        if (historical) {
            // Supprimer l'état actuel du canevas de l'historique
            setHistory(prev => prev.slice(0, -1));
            // Restaurer le dernier état enregistré
            const img = new Image();
            img.onload = function () {

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.clearRect(0, 0, canvas, canvas);
                ctx.filter = 'none';
                ctx.drawImage(img, 0, 0);
            };
            setSystemSetting(history[history.length === 1 ? history.length - 1 : history.length - 2].setting)
            img.src = history[history.length === 1 ? history.length - 1 : history.length - 2].img;
        }
    };

    return {
        navigate,
        file_url,
        img_url,
        t,
        fileImgProject, setFileImgProject,
        sidebarRef,
        text_canvasRef,


        //ref
        wrapperRef,
        canvasRef,
        canvasContainerRef,
        contextMenuRef,
        containerTextRef,
        canvasContainerScrollRef,

        // state
        activeAnimation,
        hiddenMenuSidebare,
        activeExpandCreative,
        confirme_temporary,
        setConfirme_temporary,
        textCanvasVisible, setTextCanvasVisible,
        openTools, setopenTools,
        isVisible, setIsVisible,
        position, setPosition,
        history, setHistory,
        ctx, setCtx,
        systemSetting, setSystemSetting,
        resetToDefault,
        saveTextCanvas,
        setWidth,
        setHeight,
        setLeftOffset,
        setTopOffset,
        setPositionTest,

        handleDefaultDrawText,
        setDrawText,
        drawText,

        //fonction
        handleButtonClick,
        handleActiveExpandCreative,
        handleClick_confirme,
        handleContextMenu,
        draw, undo,
        handleRemoveSaveTextCanvas,


        //UseNavbar
        handleLogout,
        hiddenMenu,
        setHiddenMenu,
        setNotification,

        // UseAreaDrawCreative
        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,

        leftOffset,
        width,
        height,
        topOffset,
        positionTest,
        zoom, setZoom
    }
}

export default UseCreative