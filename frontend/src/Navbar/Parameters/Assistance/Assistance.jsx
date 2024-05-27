import Warning from '../../../components/Warning';
import { useAppContext } from '../../../contexts/UseAppContext';
import Text_manage from '../../../components/versatile_function/Text_manage';
import { useRef, useState } from 'react';
import { SystemName, assistance, assistance_option, assistance_text } from '../../../assets/data/data';
import Picture from '../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEnvelope, faImage, faQuestionCircle, faUser } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Select/Select';

const Assistance = () => {

    const { t } = useTranslation();
    const hiddenFileInput = useRef(null);

    const { localTheme, promiseIdentifiedUser, systemDetectMobile } = useAppContext()

    const [editeTypeAllSelected, setEditeTypeAllSelected] = useState(null);
    const [editeTypeSelected, setEditeTypeSelected] = useState(null);

    const inputDisabled = editeTypeAllSelected && editeTypeSelected ? false : true;

    const inputOther = editeTypeSelected === assistance_option[assistance_option?.length - 1] ? inputDisabled : true;

    const [imgUpload, setImgUpload] = useState('');
    const [img, setImg] = useState('');

    // Loading the image and displaying the image
    const handleLoad = (event) => {
        const fileUploaded = event.target.files[0];
        setImgUpload(fileUploaded);
        setImg(URL.createObjectURL(fileUploaded));
    };

    // Delete the displayed and saved image
    const removeImage = () => {
        setImgUpload('');
        setImg('');
    };

    // Using a custom button to choose an image
    const handleClick = async () => {
        hiddenFileInput.current.click();
    };

    const assistanceTranslation = [
        t('assistanceTranslation1'),
        t('assistanceTranslation2'),
        t('assistanceTranslation3')
    ];

    const assistanceTranslation1 = [
        t('assistanceTranslation4'),
        t('assistanceTranslation5'),
        t('assistanceTranslation6'),
        t('assistanceTranslation7'),
        t('assistanceTranslation8'),
        t('assistanceTranslation9'),
        t('assistanceTranslation10'),
        t('assistanceTranslation11')
    ];


    if (!promiseIdentifiedUser) return null

    return (
        <div className='open-element-page-melted'>
            <Warning />

            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 1500, overflow: 'visible' }} data-theme={localTheme}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4><FontAwesomeIcon style={{ marginRight: 5 }} icon={faQuestionCircle} />Assistance</h4>

                        <ul>
                            <li style={{ marginBottom: 10 }}>Do you have a question ?</li>
                            <li style={{ marginBottom: 10 }}>Need help ?</li>
                            <li style={{ marginBottom: 10 }}>Do you have any suggestions to improve the experience ?</li>
                            <li style={{ marginBottom: 10 }}>Have you detected a bug in the app ?</li>
                        </ul>

                    </div>
                </div>
            </div>


            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 1500, overflow: 'visible' }} data-theme={localTheme}>

                    <div style={{ width: '98%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                        <div style={{ width: '90%', minWidth: 200, maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
                            <h4>User Information</h4>

                            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture shadowbox' src={promiseIdentifiedUser?.user.imageUrl || Picture} alt="" />

                            <p>{promiseIdentifiedUser?.user.pseudo}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faUser} /></p>

                            <p>{promiseIdentifiedUser?.user.email}<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faEnvelope} /></p>

                            <div style={{ width: '90%', minWidth: 200, maxWidth: 700, }}>
                                <h4>Select an option from this</h4>

                                <p>Need something?</p>

                                <Select setSelectedValue={setEditeTypeAllSelected} selectedValue={editeTypeAllSelected} arrays={assistance} assistanceTranslation={assistanceTranslation} localTheme={localTheme} />

                                <p>Where should we look ?</p>

                                <Select setSelectedValue={setEditeTypeSelected} selectedValue={editeTypeSelected} arrays={assistance_option} assistanceTranslation={assistanceTranslation1} localTheme={localTheme} />

                                <ol>
                                    <li style={{ marginBottom: 10, color: !editeTypeAllSelected ? '' : '#2948ff' }}>{!editeTypeAllSelected ? '.......' : 'OK'}</li>
                                    <li style={{ marginBottom: 10, color: !editeTypeSelected ? '' : '#2948ff' }}>{!editeTypeSelected ? '.......' : 'OK'}</li>
                                </ol>

                                {inputDisabled ? <p style={{ color: 'red' }}>Select the options before you start filling out the form <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faCheckCircle} /></p> : <>
                                    {assistance_text?.map((promise, index) => (
                                        <p key={index}>{editeTypeAllSelected === assistance[index] && promise}</p>
                                    ))}
                                </>}
                            </div>
                        </div>

                        <div style={{ width: '90%', minWidth: 200, maxWidth: 700 }}>

                            <p style={{ color: inputOther ? 'grey' : '' }}>Specify where if you can't find any options</p>
                            <input className='input_text' disabled={inputOther} type={'text'} style={{ width: '98%' }} placeholder='Put the page link or Clarify what you mean by "other".' data-disable={inputOther} data-theme={localTheme} />


                            <p>Which browser should you use ?</p>
                            <input className='input_text' disabled={inputDisabled} type={'text'} style={{ width: '98%' }} placeholder='Chrome, Firefox, Safari.' data-disable={inputDisabled} data-theme={localTheme} />


                            <p>We detect that you are on {systemDetectMobile ? 'Mobile' : 'PC'}.</p>
                            <input className='input_text' disabled={inputDisabled} type={'text'} style={{ width: '98%' }} placeholder={systemDetectMobile ? 'smartphone, tablet.' : 'desktop, laptop.'} data-disable={inputDisabled} data-theme={localTheme} />

                            <p>Write here :</p>
                            <div className='input_text' style={{ width: '98%', marginBottom: 50, height: 'auto' }} data-disable={inputDisabled} data-theme={localTheme}>
                                <Text_manage readOnly={editeTypeAllSelected !== null} />
                            </div>

                            <p>Image (optional)</p>
                            <div onClick={handleClick} style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: 300, width: '100%', border: '1px dashed grey', borderRadius: 5, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, color: 'white' }} data-theme={localTheme}>
                                {img === '' && <FontAwesomeIcon className='text' icon={faImage} data-theme={localTheme} />}
                            </div>

                            <div className='button_option_container_free' style={{ width: '100%', marginTop: 20, display: 'flex' }} data-theme={localTheme}>
                                <div onClick={handleClick} className='button_option' data-theme={localTheme}>{t('add_an_image')}</div>
                                <div onClick={removeImage} className='button_option' data-theme={localTheme}>{t('remove')}</div>
                            </div>

                            <input ref={hiddenFileInput} onChange={handleLoad} accept=".png, .jpg, .jpeg, .gif" type='file' key={imgUpload} hidden={true} />

                            <div className='button_option_container' style={{ width: '100%', marginTop: 20 }} data-theme={localTheme}>
                                <div className={inputDisabled ? 'button_optionDisable' : 'button_optionPic_v'} data-theme={localTheme}>{t('send')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cter_sect' style={{ marginTop: 30, marginBottom: 20 }}>
                <div className='ctent_arti' style={{ maxWidth: 1500, overflow: 'visible' }} data-theme={localTheme}>
                    <div style={{ width: '97%' }}>
                        <div className="copy-box two">
                            <div className="inner">
                                <div className="line right"></div>

                                <p>To help us better understand what happened and find a suitable solution, we would be grateful if you could provide us with some additional details about the problem you encountered. Here are some suggestions for what you can include in your report:</p>

                                <ol>
                                    <li style={{ marginBottom: 10 }}>Detailed description of the problem: What did you do just before the problem occurred? What incorrect or unexpected behavior have you observed?</li>
                                    <li style={{ marginBottom: 10 }}>Screenshots: If possible, please provide screenshots illustrating the issue. This will help us visualize the problem more clearly.</li>
                                    <li style={{ marginBottom: 10 }}>Browser and device used: Indicate the web browser (e.g., Chrome, Firefox, Safari) and the type of device (desktop, smartphone, tablet) you were using when the issue occurred.</li>
                                    <li style={{ marginBottom: 10 }}>Error messages: If you have received error messages or warnings, please include them in your report.</li>

                                </ol>

                                <p>Your feedback is essential to help us improve our app and provide a better user experience in the future. Thank you very much for your cooperation and patience.</p>

                                <p>If you have any further questions or concerns, please feel free to contact us at any time. We're here to help!</p>

                                <p>Kind regards, {SystemName}.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assistance