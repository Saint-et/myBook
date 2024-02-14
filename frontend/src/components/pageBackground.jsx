import React, { useEffect, useRef, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useAppContext } from '../contexts/UseAppContext';
import { API_URL } from '../config';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import imgCoverProfile from '../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import { DATA_picv, imagesBackground } from "../assets/data/data";
import useKeypress from 'react-use-keypress';



const PageBackground = () => {

    const { t } = useTranslation();

    const {
        setNavbarVisible,
        localTheme,
        localThemeBackground,
        GetMyProfilFromAPI,
        setThemeBackgroundSystem,
        setThemeBackground,
        themeBackgroundSystem,
        resizeThemeBackgroundSystem,
        setResizeThemeBackgroundSystem,
        hiddenPageBackground,
        setHiddenPageBackground,
        promiseIdentifiedUser } = useAppContext()

    const refRange = useRef(null);


    const updateAll = async (e) => {
        try {
            await axios.put(`${API_URL}api/eventv/updateUserAll`,
                {
                    background: themeBackgroundSystem,
                    resizeThemeBackground: resizeThemeBackgroundSystem
                },
                { withCredentials: true })
                .then(() => {
                    GetMyProfilFromAPI()
                    setHiddenPageBackground(false)
                })
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // corver image rezize
    const handleRange = (e) => {
        setResizeThemeBackgroundSystem(e.target.value);
    }

    // corver image rezize with mouse wheele
    const myFunction = async (event) => {
        const min = 0;
        const max = 100;
        if (hiddenPageBackground === true) {
            let y = event.deltaY
            if (y > 0) {
                let newSize = parseInt(resizeThemeBackgroundSystem) + 10;
                const value = Math.max(min, Math.min(max, Number(newSize)))
                setResizeThemeBackgroundSystem(value)
                document.addEventListener('touchstart', (e) => {
                    let newSize = parseInt(resizeThemeBackgroundSystem) + 10;
                    const value = Math.max(min, Math.min(max, Number(newSize)))
                    setResizeThemeBackgroundSystem(value)
                });
            } else {
                let newSize = parseInt(resizeThemeBackgroundSystem) - 10;
                const value = Math.max(min, Math.min(max, Number(newSize)))
                setResizeThemeBackgroundSystem(value)
                document.addEventListener('touchmove', (e) => {
                    let newSize = parseInt(resizeThemeBackgroundSystem) - 10;
                    const value = Math.max(min, Math.min(max, Number(newSize)))
                    setResizeThemeBackgroundSystem(value)
                });
            }
        }
    }

    useKeypress(['Escape'], (event) => {
        if (!hiddenPageBackground) {
            return;
        }
        event.preventDefault();
        setThemeBackgroundSystem(promiseIdentifiedUser.user.background)
        setResizeThemeBackgroundSystem(promiseIdentifiedUser.user.resizeThemeBackground)
        setHiddenPageBackground(false)
    });

    if (!hiddenPageBackground) return null

    return (
        <>
            <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 26000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 800, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>

                    <h4>Background {DATA_picv}</h4>
                    <div ref={refRange} onWheel={myFunction} style={{ backgroundImage: `url(${themeBackgroundSystem || imgCoverProfile})`, backgroundPosition: `50% ${resizeThemeBackgroundSystem}%`, width: '95%' }} className='CoverImage FlexEmbed FlexEmbed--2by1 shadowbox'></div>
                    <div className="range-container">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={resizeThemeBackgroundSystem}
                            onChange={handleRange}
                            className="range-input"
                            onTouchMove={(e) => {
                                // Updating the value when the finger moves
                                const touch = e.targetTouches[0];
                                const newValue = Math.round(
                                    ((touch.clientX - e.target.getBoundingClientRect().left) / e.target.offsetWidth) * 100);
                                if (newValue >= 0 && newValue <= 100) {
                                    setResizeThemeBackgroundSystem(newValue);
                                }
                            }}
                        />
                    </div>
                    <div className='button_option_container' style={{ width: '100%', maxWidth: 400, marginBottom: 20, marginTop: 20, display: 'flex' }} data-theme={localTheme}>
                    <div className='button_option' onClick={() => {
                            setThemeBackgroundSystem(promiseIdentifiedUser.user.background)
                            setResizeThemeBackgroundSystem(promiseIdentifiedUser.user.resizeThemeBackground)
                            setHiddenPageBackground(false)
                        }} style={{ width: '100%' }} data-theme={localTheme}>{t('cancel')}</div>
                        <div className='button_optionBlue' onClick={updateAll} style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div>
                    </div>

                    <h4>Choose a background</h4>
                    <div style={{ display: 'flex', maxWidth: 750, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingTop: 10 }} data-theme={localTheme}>
                        {imagesBackground?.map((img, index) => (
                            <div className="checkbox-wrapper-46Radio" key={index} style={{ marginBottom: 20 }}>
                                <input onClick={() => { setThemeBackgroundSystem(img) }} className="inp-cbxRadio" type="radio" name="rdo54725254" id={`optImagesBackground${index}`} defaultChecked={themeBackgroundSystem === img} />
                                <label className="cbxRadio" htmlFor={`optImagesBackground${index}`}>
                                    <span></span><span style={{ marginLeft: 10 }}>
                                        <img style={{ width: 200, borderRadius: 10 }} src={img} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} /></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </RemoveScroll>
        </>
    )
}

export default PageBackground