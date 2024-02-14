import { useAppContext } from '../../contexts/UseAppContext';
import imgBackground from '../../assets/images/black-white-background.jpg';
import { useEffect } from 'react';



const Shop = () => {

    const { localTheme, promiseIdentifiedUser, setThemeBackground, setResizeThemeBackground } = useAppContext();
   

    useEffect(() => {
        // Si promiseUser est défini, mettre à jour les états avec ses valeurs
        setThemeBackground(imgBackground);
        setResizeThemeBackground(50);
        // Retourner une fonction de nettoyage vide car aucune action spécifique n'est nécessaire lors du démontage
        return () => {
            setThemeBackground(promiseIdentifiedUser?.user.background);
            setResizeThemeBackground(promiseIdentifiedUser?.user.resizeThemeBackground);
        };
    }, [promiseIdentifiedUser]);

    return (
        <>

        </>
    )
}

export default Shop