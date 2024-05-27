import { useEffect, useRef, useState } from "react";
import { CashBack_data, CashBack_data_premium, RealCash_data } from "../../assets/data/data";
import { useAppContext } from "../../contexts/UseAppContext";




const Function_utils = () => {

    const {
        promiseIdentifiedUser
    } = useAppContext()

    // Fonction pour ajouter "#search" à l'URL sans recharger la page
    const addSearchToUrl = (e) => {
        window.history.pushState({}, '', `${window.location.pathname}${window.location.search}${e}`);
        // Déclencher manuellement l'événement popstate pour que React Router mette à jour son état interne
        window.dispatchEvent(new Event('popstate'));
    };

    const [isVisible, setIsVisible] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event, promise, fullscreen, workspace) => {
        setIsVisible({ ...promise, fullscreen: fullscreen, workspace: workspace });
        const posX = event.clientX;
        const posY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 280; // Largeur du menu contextuel (à ajuster selon votre conception)
        const menuHeight = 220; // Hauteur du menu contextuel (à ajuster selon votre conception)
        const adjustedX = Math.min(posX, screenWidth - menuWidth); // Ajuste la position X pour rester dans l'écran
        const adjustedY = Math.min(posY, screenHeight - menuHeight); // Ajuste la position Y pour rester dans l'écran
        setPosition({ x: adjustedX, y: adjustedY });
    }

    const handleContextMenuProfile = (event, profile) => {
        setIsVisible({ profile: profile });
        const posX = event.clientX;
        const posY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 280; // Largeur du menu contextuel (à ajuster selon votre conception)
        const menuHeight = 350; // Hauteur du menu contextuel (à ajuster selon votre conception)
        const adjustedX = Math.min(posX, screenWidth - menuWidth); // Ajuste la position X pour rester dans l'écran
        const adjustedY = Math.min(posY, screenHeight - menuHeight); // Ajuste la position Y pour rester dans l'écran
        setPosition({ x: adjustedX, y: adjustedY });
    }


    const contextMenuRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsVisible(null);
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

    useOutsideAlerter(contextMenuRef);

    const handleScrollDetect = () => {
        window.addEventListener('scroll', () => {
            setIsVisible(null);
        });
    }


    const [realCash, setRealCash] = useState();
    const [cashBack, setCashBack] = useState();

    const handleConversionCoins = (money) => {
        if (!money || !promiseIdentifiedUser) {
            return;
        }

        let realCash = RealCash_data * money;
        let realCashConver = Math.round(realCash)
        setRealCash(realCashConver)

        let num = promiseIdentifiedUser?.user.premium == 1 ? CashBack_data_premium : CashBack_data;

        let cashBack = num * money;
        let cashBackConver = Math.round(cashBack)
        setCashBack(cashBackConver)
    }

    useEffect(() => {
        if (isVisible) {
            handleScrollDetect()
        }
    }, [isVisible])

    return {
        addSearchToUrl,

        setIsVisible,
        handleContextMenu,
        handleContextMenuProfile,
        isVisible,
        position,
        contextMenuRef,

        handleConversionCoins,
        realCash,
        cashBack
    }
}

export default Function_utils