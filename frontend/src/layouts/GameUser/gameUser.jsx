import { useAppContext } from "../../contexts/UseAppContext";
import imgProfile from '../../assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { SystemName } from "../../assets/data/data";
import { RemoveScroll } from "react-remove-scroll";
import { NavLink, useNavigate } from 'react-router-dom';



const GameUser = () => {

    const { localTheme, promiseIdentifiedUser } = useAppContext()

    const { t } = useTranslation();

    const navigate = useNavigate()

    const [session, setSession] = useState(sessionStorage.getItem('GameIntro'));

    const [progress, setProgress] = useState(0);


    useEffect(() => {
        if (progress === 100) return;
        if (promiseIdentifiedUser) {
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress(prevProgress => prevProgress + 1);
                } else {
                    clearInterval(interval);
                }
            }, 10);

            // Nettoyer l'intervalle lorsque le composant est démonté
            return () => clearInterval(interval);
        }
    }, [progress, promiseIdentifiedUser]);

    //useEffect(() => {
    //    // Si promiseUser est défini, mettre à jour les états avec ses valeurs
    //    //window.scrollTo({
    //    //    top: 0 // Ajoute un effet de défilement doux
    //    //});
    //    if (promiseIdentifiedUser) {
    //        setThemeBackground(imgBackground);
    //        setResizeThemeBackground(50);
    //        // Retourner une fonction de nettoyage vide car aucune action spécifique n'est nécessaire lors du démontage
    //        return () => {
    //            if (promiseIdentifiedUser?.user.imageUrlCover) {
    //                setThemeBackground(promiseIdentifiedUser?.user.imageUrlCover);
    //                setResizeThemeBackground(promiseIdentifiedUser?.user.resizeImageUrlCover);
    //            }
    //        };
    //    }
    //}, [promiseIdentifiedUser]);

    return (
        <div className='main'>
            {progress < 100 && <RemoveScroll className="blanket open-element-page-melted" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: '#000000e6' }}>
                <h1 className='textLoto' style={{ fontSize: 60, textAlign: 'center' }}>{SystemName} Game</h1>
                <div className="progress-containerAnimation">
                    <div className="progress-barAnimation" style={{ width: `${progress}%` }} id="myBar"></div>
                </div>
            </RemoveScroll>}

            {!session && <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 21000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 1000, alignItems: 'center', justifyContent: 'center' }} data-theme={localTheme}>
                    <h1 className='textLoto' style={{ fontSize: 40, textAlign: 'center' }}>{SystemName} Game</h1>

                    <div className="textBungeeSpice" style={{ width: "100%", maxWidth: 800 }}>
                        <p>
                            🎮 Bienvenue à {SystemName} Game !
                        </p>

                        <p>
                            🏆 Participez et remportez des prix !
                        </p>

                        <p>
                            🎉 Vous êtes invité à participer à notre jeu excitant, où vous aurez la chance de remporter de superbes prix ! Le but du jeu est simple : réalisez le meilleur score possible pour figurer parmi les premiers au classement.
                        </p>

                        <p>
                            🥇 Les joueurs qui se classent parmi les premiers auront la chance de remporter des prix exclusifs ! Que vous soyez un joueur expérimenté ou un débutant, tout le monde a sa chance de gagner. Alors, mettez vos compétences à l'épreuve et visez le sommet du classement !
                        </p>

                        <p>
                            📈 N'oubliez pas : plus votre score est élevé, meilleures sont vos chances de gagner. Préparez-vous à défier vos amis, à vous surpasser et à remporter des récompenses incroyables !
                        </p>

                        <p>
                            🔥 Êtes-vous prêt à relever le défi et à devenir le champion de {SystemName} Game ? Rejoignez-nous maintenant et montrez-nous de quoi vous êtes capable !
                        </p>
                    </div>

                    <div onClick={() => {
                        sessionStorage.setItem('GameIntro', 'on')
                        setSession('on')
                    }} className='button_option_container' style={{ width: '100%', marginTop: 10, maxWidth: 300 }} data-theme={localTheme}>
                        <div className='button_optionColoring'>Play</div>
                    </div>
                </div>
            </RemoveScroll>}


            <div className='cter_sect' style={{ marginTop: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 800, height: 'max-content', justifyContent: 'space-between' }} data-theme={localTheme}>
                    <div style={{ backgroundImage: `url(${promiseIdentifiedUser?.user.imageUrlCover})`, backgroundPosition: `50% ${promiseIdentifiedUser?.user.resizeImageUrlCover}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>
                    <img onClick={() => { navigate(`/profile/${promiseIdentifiedUser?.user.id}/home?type=Illustrations`) }} style={{ width: 150, height: 150, marginTop: -80, zIndex: 100 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture hovercursor' src={promiseIdentifiedUser?.user.imageUrl || imgProfile} alt="" />
                    <h3 className='textLoto' style={{ fontSize: 40, margin: 0 }}>{promiseIdentifiedUser?.user.pseudo}</h3>
                    <div className="textBungeeSpice" style={{ fontSize: 20, marginBottom: 10, display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <div>Lvl: 0</div><div>10/10</div><div>win: 0</div>
                    </div>
                    <div className="progress-containerAnimation" style={{ background: '#80808033', marginBottom: 20 }}>
                        <div className="progress-barAnimation" style={{ width: `${25}%` }} id="myBar"></div>
                    </div>

                    <div className='button_option_container textLoto' style={{ fontSize: 20, display: 'flex', zIndex: 100, flexWrap: 'wrap', justifyContent: 'center', background: 'none' }} data-theme={localTheme}>
                        <NavLink to={`/${SystemName}-game`} className='button_optionPic_v' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                            <div>Event</div>
                        </NavLink>
                        <NavLink to={`/${SystemName}-game/game-list`} className='btn' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                            <div>Games</div>
                        </NavLink>
                        <NavLink to={`/${SystemName}-game/game-ticket`} className='button_optionColoringBlue' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                            <div>My tickets</div>
                        </NavLink>
                        <NavLink to={`/${SystemName}-game/game-ranking`} className='button_optionColoring' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-theme={localTheme}>
                            <div>Users ranking</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameUser