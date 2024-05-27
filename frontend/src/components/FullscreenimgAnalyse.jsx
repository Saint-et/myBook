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



const FullscreenimgAnalyse = () => {

    const { t } = useTranslation();
    const { fullScreenImgAnalyse, setFullscreenimgAnalyse, handleFullScreen, localTheme } = useAppContext();

    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


    const editor = useRef()


    if (!fullScreenImgAnalyse) return null

    return (
        <>
            <RemoveScroll className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
                <div className='menu_navbar open-element-page-melted' style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, maxWidth: 900 }} data-theme={localTheme}>
                    <img onClick={() => handleFullScreen({img: fullScreenImgAnalyse.element.imageUrl})} style={{ objectFit: 'contain', width: '90%', maxWidth: 350, borderRadius: 10 }} src={fullScreenImgAnalyse.element.imageUrl || Picture} alt="" />

                    <div style={{ marginTop: 10, width: '90%' }}>Leave a note at this image :</div>
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
                            setFullscreenimgAnalyse()
                        }} style={{ width: '100%' }} data-theme={localTheme}>{t('cancel')}</div>
                        <div className='button_option' style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div>
                    </div>
                </div>

            </RemoveScroll >


            <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
                <div style={{ width: '100%', height: 30 }} onClick={() => {
                    setFullscreenimgAnalyse()
                }} className='button_optionRed' data-theme={localTheme}>Close</div>
            </div>
        </>
    )
}

export default FullscreenimgAnalyse