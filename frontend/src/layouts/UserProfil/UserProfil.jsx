import imgProfile from '../../assets/images/logo.png';
import imgCoverProfile from '../../assets/images/vaisseau-spatial-futuriste-orbite-autour-mysterieuse-planete-dans-galaxie-profonde-generee-par-intelligence-artificielle.jpg';
import { spinner } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEllipsisVertical, faBookmark, faCopy, faHome, faUser, faShareNodes, faPlus, faShop, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faImage, faStar } from '@fortawesome/free-regular-svg-icons';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { RemoveScroll } from 'react-remove-scroll';
import { Link, NavLink } from 'react-router-dom';
import Invited from '../../components/Invited';
import { UseUserProfil } from './UseUserProfil';
import Warning from "../../components/Warning";
import { useAppContext } from '../../contexts/UseAppContext';
import { useTranslation } from 'react-i18next';
import useKeypress from 'react-use-keypress';
import { DATA_picv } from '../../assets/data/data';

const UserProfil = () => {

  const { t } = useTranslation();

  const { setNavbarVisible, localTheme, localThemeBackground } = useAppContext()

  const {
    promiseIdentifiedUser,
    IdContext,
    promiseUser,
    imgCover, setImgCover,
    imgUploadCover, setImgUploadCover,
    resize, setResize,
    img, setImg,
    setImgUpload,
    spin,
    updateUserPinned,
    hideCropCover, setHideCropCover,
    handleClickCover,
    handleLoadCover,
    removeImageCover,
    handleRange,
    updateAccountCover,
    hideCropMenu, setHideCropMenu,
    hideCrop, setHideCrop,
    handleLoad,
    removeImage,
    updateAccount,
    myFunction,
    hiddenInfoUser, setHiddenInfoUser,
    handleAdd,
    handleRefuse,
    handleClick,
    hiddenFileInput,
    bookmark,
    refRange,
    UpdateAdmin,
    UpdateMaster,
    checkboxAdmin,
    checkboxMaster,
    refScroll

  } = UseUserProfil()

  useKeypress(['Escape'], (event) => {
    if (hiddenInfoUser) {
      event.preventDefault();
      setHiddenInfoUser(false)
    }
    if (hideCropMenu) {
      event.preventDefault();
      setHideCropCover(false)
      setHideCropMenu(false)
      setResize(promiseUser?.user.resizeImageUrlCover)
      setImgCover(promiseUser?.user.imageUrlCover)
      setImgUploadCover(promiseUser?.user.imageUrlCover)
      setNavbarVisible(true)
      setHideCrop(false)
      setImg(promiseUser?.user.imageUrl)
      setImgUpload(promiseUser?.user.imageUrl)
    }
  });

  if (promiseIdentifiedUser === false) return (
    <Invited localTheme={localTheme} />
  )

  if (!promiseUser || !promiseIdentifiedUser) return (
    <div className='CoverImage FlexEmbed FlexEmbed--2by1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
      {spinner()}
    </div>
  )

  return (
    <>
      {hideCropMenu && <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 15000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
        {hideCropCover && <><div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
          <div ref={refRange} onClick={handleClickCover} onWheel={myFunction} style={{ backgroundImage: `url(${imgCover || imgCoverProfile})`, backgroundPosition: `50% ${resize}%`, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1 shadowbox' title='Click to select an image.'></div>


          {!spin && <>
            <div className='img_Cover' >
              <div className="range-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={resize}
                  onChange={handleRange}
                  className="range-input"
                  onTouchMove={(e) => {
                    // Updating the value when the finger moves
                    const touch = e.targetTouches[0];
                    const newValue = Math.round(
                      ((touch.clientX - e.target.getBoundingClientRect().left) / e.target.offsetWidth) * 100);
                    if (newValue >= 0 && newValue <= 100) {
                      setResize(newValue);
                    }
                  }}
                />
              </div>



              <input ref={hiddenFileInput} onChange={handleLoadCover} accept=".png, .jpg, .jpeg, .gif" type='file' key={imgUploadCover} hidden={true} />
            </div>
          </>}
          {spin && <div style={{ display: 'flex', justifyContent: 'center' }}>
            {spinner()}
          </div>}
          {!promiseUser?.user.imageUrlCover && <>
            {!hideCropCover && <>
              <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%', position: 'absolute' }}>
                <div className='buttonCircle' onClick={() => { setHideCropCover(true) }} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, zIndex: 50, marginRight: 10 }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </div>
            </>}
          </>}
          <div className="copy-box two">
            <div className="inner">
              <div className="line right"></div>
              <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.formats')}:</span> PNG/JPG/JPEG</div>
              <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.size')}:</span> 5MB</div>

              <div className='title_color' style={{ marginTop: 10, width: '90%' }}>{t('imageChangeProfile.textCover1')}</div>

              <div className='title_color' style={{ width: '90%' }}>{t('imageChangeProfile.text2')}</div>
            </div>
          </div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>
            <div className='button_option' onClick={() => {
              setHideCropCover(false)
              setResize(promiseUser?.user.resizeImageUrlCover)
              setImgCover(promiseUser?.user.imageUrlCover)
              setImgUploadCover(promiseUser?.user.imageUrlCover)
            }} style={{ width: '100%' }} data-theme={localTheme}>{t('cancel')}</div>
            {/*<div className='button_option' onClick={handleClickCover} style={{ width: '100%' }} data-theme={localTheme}>{t('add_an_image')}</div>*/}
            {imgCover && <div className='button_option' onClick={removeImageCover} style={{ width: '100%', color: 'red' }} data-theme={localTheme}>{t('delete')}</div>}
            <div className='button_option' onClick={() => { updateAccountCover(promiseUser?.user.id) }} style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div>
          </div>
        </div></>}


        {!hideCropCover && <><div className='menu_navbar open-elementPage' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
          <div onClick={hideCrop ? null : () => setHideCropCover(true)} style={{ backgroundImage: `url(${imgCover || imgCoverProfile})`, backgroundPosition: `50% ${resize}%`, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1 shadowbox' title={hideCrop ? null : 'Click to select an image.'}></div>
          <img hidden={hideCrop} className='Profile_picture shadowbox' style={{ width: 200, height: 200, cursor: 'pointer', marginTop: -100, zIndex: 10 }} onClick={() => { setHideCrop(true) }} src={img || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} title='Click to select an image.' />
          {hideCrop && <div className='shadowbox' style={{ width: 200, height: 200, marginBottom: 30, marginTop: -100, zIndex: 10, background: 'black', borderRadius: '100%' }}>
            <AvatarImageCropper apply={handleLoad} text={'Select an image'} previewBorderRadius={'100%'} isBack={imgProfile} maxsize={1000 * 1000 * 5} />
          </div>}
          <div className="copy-box two">
            <div className="inner">
              <div className="line right"></div>
              <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.formats')}:</span> PNG/JPG/JPEG</div>
              <div className='title_color' style={{ fontSize: 16, margin: 0 }}><span style={{ fontWeight: 800 }}>{t('imageChangeProfile.size')}:</span> 5MB</div>

              <div className='title_color' style={{ width: '90%', marginTop: 10 }}>{t('imageChangeProfile.text1')}</div>

              <div className='title_color' style={{ width: '90%' }}>{t('imageChangeProfile.text2')}</div>
            </div>
          </div>

          <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 20, height: 'max-content' }} data-theme={localTheme}>
            {!hideCrop ? <div hidden={hideCrop} style={{ width: '100%', maxWidth: 300 }} className='button_option' onClick={() => {
              setHideCropMenu(false)
              setNavbarVisible(true)
              setHideCrop(false)
              setImg(promiseUser?.user.imageUrl)
              setImgUpload(promiseUser?.user.imageUrl)
            }} data-theme={localTheme}>{t('cancel')}</div> :
              <div style={{ width: '100%', maxWidth: 300 }} className='button_option' onClick={() => { setHideCrop(false) }} data-theme={localTheme}>{t('cancel')}</div>}
            {/*!hideCrop && <div className='button_option' onClick={() => { setHideCrop(true) }} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}>{t('add_an_image')}</div>*/}
            {!hideCrop && <>{img && <div style={{ width: '100%', maxWidth: 300, color: 'red' }} className='button_option' onClick={removeImage} data-theme={localTheme}>{t('delete')}</div>}</>}
            {!hideCrop && <>{img != promiseUser?.user.imageUrl && <>{!spin ? <div style={{ width: '100%', maxWidth: 300 }} onClick={() => { updateAccount(promiseUser?.user.id) }} className='button_option' data-theme={localTheme}>{t('save')}</div> : spinner()}</>}</>}
          </div>

        </div></>}

      </RemoveScroll>}

      {hiddenInfoUser && <div className='blanket animation' style={{ zIndex: 21000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
                <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar open-elementPage' style={{ width: '100%', maxWidth: 800, flexDirection: 'column', overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
                    <div className='cter_sect'>
                        <div className='ctent_artiMiniProfil' data-theme={localTheme}>

              <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center',marginTop: 20 }}>
                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' style={{ width: 100, height: 100 }} src={promiseUser?.user.imageUrl || imgProfile} alt="" />
                <h4 className='title_color' translate='no' style={{ margin: 5 }}>{promiseUser?.user.pseudo}</h4>
                {promiseUser?.user.premium == 1 && <div className='premium' style={{ marginBottom: 10 }} translate='no'>Premium</div>}
                {promiseUser?.user.premium == 0 && <div className='standard' style={{ marginBottom: 10 }} translate='no'>Standard</div>}
              </div>
              <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 20 }} data-theme={localTheme}>
                  <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faCopy} style={{ marginRight: 10 }} /> Copy page link</div>
                  <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' data-theme={localTheme}>Add to blacklist</div>
                  <div style={{ paddingTop: 5, paddingBottom: 5, color: 'red' }} className='button_option' data-theme={localTheme}>Reported</div>
                </div>
                
                {promiseIdentifiedUser?.user.isAdmin === true && <>
                {promiseIdentifiedUser?.user.isMaster === true && <>
                  {promiseIdentifiedUser?.user.id != IdContext && <>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: 400}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className='master' style={{ marginBottom: 10, marginTop: 20 }} translate='no'>New Master</div>
                    <div className="toggle-rect">
                      <input onChange={(e) => { UpdateMaster(promiseUser?.user.id, e.target.checked, promiseIdentifiedUser?.user.id) }} checked={promiseUser?.user.isMaster} disabled={checkboxMaster} type="checkbox" id="ghyjy524" name="ghyjy524" />
                      <label htmlFor="ghyjy524"></label>
                    </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className='admin' style={{ marginBottom: 10, marginTop: 20 }} translate='no'>New admin</div>
                    <div className="toggle-rect">
                      <input onChange={(e) => { UpdateAdmin(promiseUser?.user.id, e.target.checked, promiseIdentifiedUser?.user.id) }} checked={promiseUser?.user.isAdmin} disabled={checkboxAdmin} type="checkbox" id="ghyjyftjyj" name="ghyjyftjyj" />
                      <label htmlFor="ghyjyftjyj"></label>
                    </div>
                    </div>
                    </div>
                  </>}</>}
                  <h4>{t('admin')}</h4>
                  <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 10}}>
                  {promiseUser?.user.isMaster == 1 && <div className='master' translate='no'>Master</div>}
                  {promiseUser?.user.isAdmin == 1 && <div className='admin' translate='no'>Admin</div>}
                  {promiseUser?.user.adultAccess == 1 && <div className='badge_adult' translate='no'>Access 18+</div>}
                  </div>

                  {promiseUser?.user.isMaster !== true && <>
                    {promiseIdentifiedUser?.user.id != IdContext && <>
                      <div className='button_option_container' style={{ width: '100%', maxWidth: 500 }} data-theme={localTheme}>
                        <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_optionGreen' data-theme={localTheme}>Reset name</div>
                        <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_optionGreen' data-theme={localTheme}>Delete profile image</div>
                        <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_optionGreen' data-theme={localTheme}>Delete cover image</div>
                      </div>
                    </>}
                  </>}</>}
              </div>
              <div className='button_option_container' style={{ width: '100%', maxWidth: 300, marginTop: 10 }} data-theme={localTheme}>
                <div className='button_option' onClick={() => { setHiddenInfoUser(false) }} data-theme={localTheme}>{t("cancel")}</div>
              </div>
            </div>
          </div>
        </RemoveScroll>
        <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
          <div style={{ width: '100%', height: 30 }} onClick={() => {
            setHiddenInfoUser(false)
          }} className='button_optionRed' data-theme={localTheme}>Close</div>
        </div>
      </div>}


      <div className='cter_sect' style={{ padding: 0 }}>
        <div className='ctent_arti animation' style={{ padding: 0, width: '100%', maxWidth: 2000, borderRadius: 0 }} data-theme={localTheme}>

          <div className='CoverImage FlexEmbed FlexEmbed--2by1' style={{ backgroundImage: `url(${imgCover || imgCoverProfile || promiseUser?.user.imageUrlCover})`, backgroundPosition: `50% ${resize}%`, borderRadius: 0 }}>

            {/*promiseIdentifiedUser?.user.id == IdContext && <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%', maxWidth: 2000, marginTop: -35 }}>
              <div className='button_option_container shadowbox' style={{ width: '100%', maxWidth: 50, display: 'flex', zIndex: 50, fontSize: 15, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0 }} data-theme={localTheme}>
                <div className='button_optionPic_v' onClick={() => setHideCropCover(true)} style={{ width: '100%' }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faImage} />
                </div>
                {promiseUser?.user.private == 1 &&
                  <Link className='button_optionDisable' to={'/parameters/customization'} style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faLock} /></Link>}
              </div>
                </div>*/}

          </div>
        </div>
      </div>

      <div className='cter_sectProfil'>
        <div className='ctent_artiProfil animation' style={{ maxWidth: 2000, borderRadius: 0, overflow: 'visible' }} data-theme={localTheme}>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', maxWidth: 1200, justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture shadowbox' src={promiseUser?.user.imageUrl ?? imgProfile} alt="" />
              <div className='Profile_picture_button shadowbox'>
                {promiseIdentifiedUser?.user.id == IdContext && <>
                  <div className='button_optionPic_v' onClick={() => {
                    setHideCropMenu(true)
                    setNavbarVisible(false)
                  }} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', borderRadius: '100%' }} data-theme={localTheme}>
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                </>}
              </div>
            </div>
            <h2 className='shadowbox' style={{ marginTop: 70, color: 'white' }} translate='no'>{promiseUser?.user.pseudo}</h2>
            <div className='button_option_container shadowbox' style={{ width: '90%', display: 'flex', maxWidth: 200 }} data-theme={localTheme}>
              {promiseIdentifiedUser?.user.id != IdContext && <>
                <div className={parseInt(promiseUser?.filteredPinnedUsers) === parseInt(promiseUser?.user.id) ? bookmark ? 'button_optionBlue' : 'button_optionDisable' : bookmark ? 'button_option' : 'button_optionDisable'} onClick={() => updateUserPinned(promiseUser?.user.id)} style={{ width: '100%', maxWidth: 300 }} data-theme={localTheme}><FontAwesomeIcon icon={faBookmark} /></div>
              </>}
              <div onClick={() => { setHiddenInfoUser(true) }} className='button_option' style={{ width: '100%' }} data-theme={localTheme}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
            </div>

            <div className='button_option_container shadowbox hovercursor' style={{ width: '100%', display: 'flex', marginTop: 10, maxWidth: 200 }} data-theme={localTheme}>
              {promiseIdentifiedUser?.user.id == IdContext && <Link to={'/contact'} className='button_optionPic_v'>{t('follewers')}</Link>}

              {promiseIdentifiedUser?.user.id != IdContext && <>
                {promiseUser?.userId.length == 0 && <>
                  <div className='button_optionPic_v' onClick={() => handleAdd(promiseUser?.user.id, promiseIdentifiedUser?.user.id)} data-theme={localTheme}>{t('follow')}</div>
                </>}
              </>}
              {promiseIdentifiedUser?.user.id != IdContext && <>
                {promiseUser?.userId == promiseIdentifiedUser?.user.id && <>
                  <div className='button_optionPic_v' onClick={() => handleRefuse(promiseUser?.user.id, promiseIdentifiedUser?.user.id)} data-theme={localTheme}>{t('unfollow')}</div>
                </>}
              </>}
            </div>
          </div>
        </div>
      </div>

      <div ref={refScroll} className='cter_sect' style={{ marginTop: 50 }}>
        <div className='button_option_container' style={{ display: 'flex', zIndex: 100, flexWrap: 'wrap', justifyContent: 'center', background: 'none' }} data-theme={localTheme}>
          <NavLink onClick={() => { handleClick(`/profile/${promiseUser?.user.id}/page?type=Illustrations`) }} to={`/profile/${promiseUser?.user.id}/page?type=Illustrations`} className='button_optionPic_v hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
            <div>{promiseIdentifiedUser?.user.id === promiseUser?.user.id ? <FontAwesomeIcon style={{ marginRight: 5 }} icon={faHome} /> : <FontAwesomeIcon style={{ marginRight: 5 }} icon={faUser} />}Home</div>
          </NavLink>
          <NavLink onClick={() => { handleClick(`/profile/${promiseUser?.user.id}/catalogues/all`) }} to={`/profile/${promiseUser?.user.id}/catalogues/all`} className='button_option hovercursor' style={{ width: 150, justifyContent: 'center', whiteSpace: 'nowrap', height: 40, borderRadius: 100, margin: 3 }} data-background={localThemeBackground} data-theme={localTheme}>
            <div>{t('activities')}</div>
          </NavLink>
        </div>
      </div>

    </>
  )
}

export default UserProfil