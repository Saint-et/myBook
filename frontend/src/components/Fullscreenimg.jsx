import Picture from '../assets/images/logo.png';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../contexts/UseAppContext';
import { useTranslation } from 'react-i18next';
import { Editor, EditorState } from 'draft-js';
import { spinner } from '../utils';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LookImage from './lookImage/lookImage';

const Fullscreenimg = () => {
    const { t } = useTranslation();
    const { fullScreenImg, setFullScreenImg, localTheme } = useAppContext();

    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


    const editor = useRef()



    if (!fullScreenImg) return null

    if (fullScreenImg.analyse === true) return (
        <>
            <RemoveScroll className='blanket scrollbar' style={{ zIndex: 15000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, maxWidth: '90%' }} data-theme={localTheme}>
                    <img style={{ objectFit: 'contain', width: '90%', maxWidth: 350, borderRadius: 10 }} src={fullScreenImg.img.imageUrl || Picture} alt="" />

                    <div style={{ marginTop: 10, width: '90%' }}>Leave a note for your readers at this image :</div>
                    <div style={{ marginTop: 10, width: '90%', border: 'none', maxWidth: '100%', borderRadius: 5 }} className="textarea_mess" data-theme={localTheme}>
                        {editorState ? <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="..."
                        /> :
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} data-theme={localTheme}>
                                {spinner()}
                            </div>}

                    </div>
                    

                    <div className='button_option_container' style={{ width: '90%', maxWidth: 500, display: 'flex', marginTop: 20 }} data-theme={localTheme}>
                        <div className='button_option' onClick={() => {
                            setFullScreenImg()
                        }} style={{ width: '100%' }} data-theme={localTheme}>{t('cancel')}</div>
                        <div className='button_option' style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div>
                    </div>
                </div>

            </RemoveScroll >


            <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
                <div style={{ width: '100%', height: 30 }} onClick={() => {
                    setFullScreenImg()
                }} className='button_optionRed' data-theme={localTheme}>Close</div>
            </div>
        </>
    )

    return (
        <>
            <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 15000, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, overflowY: 'auto', padding: 0 }} >
                
            <LookImage fullScreenImg={fullScreenImg.img} setFullScreenImg={setFullScreenImg} picture={Picture} />

            </RemoveScroll>
            <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
                <div style={{ width: '100%', height: 30 }} onClick={() => {
                    setFullScreenImg(null)
                }} className='button_optionRed' data-theme={localTheme}>Close</div>
            </div>
        </>
    )
}

export default Fullscreenimg

//<div className='backgroundImg'>
//                    <img onWheel={myFunction} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ objectFit: 'contain', height: '100%', width: '100%', transform: `scale(${resize})`, objectPosition: '50% 100%' }} src={fullScreenImg.img || Picture} alt="" />
//                </div>


//   <LookImage fullScreenImg={fullScreenImg.img} setFullScreenImg={setFullScreenImg} picture={Picture} />