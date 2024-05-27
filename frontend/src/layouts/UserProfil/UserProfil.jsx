import imgProfile from '../../assets/images/logo.png';
import { spinner } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faCopy, faHome, faPhotoFilm, faUsers, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-regular-svg-icons';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { RemoveScroll } from 'react-remove-scroll';
import { Link, useLocation } from 'react-router-dom';
import { UseUserProfil } from './UseUserProfil';
import { useAppContext } from '../../contexts/UseAppContext';
import { useTranslation } from 'react-i18next';
import useKeypress from 'react-use-keypress';
import { NSFW, SystemName, SystemPicture } from '../../assets/data/data';
import News from './News/News';
import Catalogues from './Catalogues/Catalogues';
import Contact from './Contact/Contact';
import UseCatalogues from './Catalogues/useCatalogues';
import Subscription from './subscription/Subscription';
import Function_utils from '../../components/versatile_function/usefunction_utils';
import Subscription_management from '../../components/Subscription_management';
import Color from "color-thief-react";

const UserProfil = () => {
  const { t } = useTranslation();

  const { setNavbarVisible, localTheme, isNavbarVisible, animationSelect } = useAppContext()


  const {
    promiseIdentifiedUser,
    IdContext,
    //promiseUser,
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
    hiddenFileInput,
    bookmark,
    refRange,
    UpdateAdmin,
    UpdateMaster,
    checkboxAdmin,
    checkboxMaster,
    refScroll,

    GetFollowersFromAPI,
    promiseContact,

    checkedPrivateIllustration, setCheckedPrivateIllustration,
    checkedPrivateUsers, setCheckedPrivateUsers, imgSave

  } = UseUserProfil()

  const { addSearchToUrl } = Function_utils()

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

  const fullLocation = useLocation()
  const location = fullLocation.pathname.split("/")
  const iconNav = location[3];


  const searchParams = new URLSearchParams(fullLocation.search);
  const typeUrl = searchParams.get("type");


  const {
    catalog,
    library,
    libraryOpen,
    setLibraryOpen,
    pageCount,
    handlePage,
    total,
    typeUrlCatalog,
    searchUrl,
    handleClickCatalog,
    url,
    numPage
  } = UseCatalogues()


  return (
    <div className='main'>
      {hideCropMenu && <RemoveScroll removeScrollBar={false} className='blanket scrollbar' style={{ zIndex: 25000, display: 'flex', alignItems: 'start', justifyContent: 'center', top: 0, overflowY: 'auto' }} >
        {/*false && <><div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
          <div onClick={handleClickCover} onWheel={myFunction} style={{ backgroundImage: `url(${imgCover || SystemPicture})`, backgroundPosition: `50% ${resize}%`, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1 shadowbox' title='Click to select an image.'></div>


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



              <input onChange={handleLoadCover} accept=".png, .jpg, .jpeg, .gif" type='file' key={imgUploadCover} hidden={true} />
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
            {/*<div className='button_option' onClick={handleClickCover} style={{ width: '100%' }} data-theme={localTheme}>{t('add_an_image')}</div>}
            {imgCover && <div className='button_option' onClick={removeImageCover} style={{ width: '100%', color: 'red' }} data-theme={localTheme}>{t('delete')}</div>}
            <div className='button_option' onClick={() => { updateAccountCover(promiseUser?.user.id) }} style={{ width: '100%' }} data-theme={localTheme}>{t('save')}</div>
          </div>
        </div></>*/}


        {true && <><div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 600, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} data-theme={localTheme}>
          <div ref={refRange} onClick={() => {
            if (hideCropCover) {
              handleClickCover()
            } else {
              setHideCropCover(true)
              setHideCrop(false)
              setImg(promiseUser?.user.imageUrl)
              setImgUpload(promiseUser?.user.imageUrl)
            }
          }} onWheel={myFunction} style={{ backgroundImage: `url(${imgCover || SystemPicture})`, backgroundPosition: `50% ${resize}%`, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1 shadowbox' title={hideCrop ? null : 'Click to select an image.'}></div>
          {!hideCropCover && <img hidden={hideCrop} className='Profile_picture shadowbox' style={{ width: 200, height: 200, cursor: 'pointer', marginTop: -100, zIndex: 10 }} onClick={() => { setHideCrop(true) }} src={img || imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} title='Click to select an image.' />}
          {hideCrop && <div className='shadowbox' style={{ width: 200, height: 200, marginBottom: 30, marginTop: -100, zIndex: 10, background: 'black', borderRadius: '100%' }}>
            <AvatarImageCropper apply={handleLoad} text={'Select an image'} previewBorderRadius={'100%'} isBack={imgProfile} maxsize={1000 * 1000 * 5} />
          </div>}

          {hideCropCover && <>
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
          </>}

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
            <div hidden={hideCrop} style={{ width: '100%', maxWidth: 300 }} className='button_option' onClick={() => {
              if (!hideCropCover) {
                if (promiseUser?.user.imageUrl === img && !hideCrop) {
                  setImg(promiseUser?.user.imageUrl);
                  setImgUpload(promiseUser?.user.imageUrl);
                  setHideCropMenu(false);
                } else {
                  setHideCrop(false);
                  setImg(promiseUser?.user.imageUrl);
                  setImgUpload(promiseUser?.user.imageUrl);
                }
              } else {
                setHideCropCover(false);
                setResize(promiseUser?.user.resizeImageUrlCover);
                setImgCover(promiseUser?.user.imageUrlCover);
                setImgUploadCover(promiseUser?.user.imageUrlCover);
              }
            }} data-theme={localTheme}>{t('cancel')}</div>
            {img && <div onClick={() => {
              if (!hideCropCover) {
                removeImage()
              } else {
                removeImageCover()
              }
            }} style={{ width: '100%', maxWidth: 300, color: 'red' }} className='button_option' data-theme={localTheme}>{t('delete')}</div>}
            {imgSave && <>{!spin ? <div onClick={() => {
              if (!hideCropCover) {
                updateAccount(promiseUser?.user.id)
              } else {
                updateAccountCover(promiseUser?.user.id)
              }
            }} style={{ width: '100%', maxWidth: 300 }} className='button_option' data-theme={localTheme}>{t('save')}</div>
              :
              <div style={{ display: 'flex', justifyContent: 'center' }}>{spinner()}</div>}</>}
          </div>

        </div></>}

      </RemoveScroll>}

      {hiddenInfoUser && <div className='blanket open-element-page-melted' style={{ zIndex: 25000, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', top: 0 }} >
        <RemoveScroll removeScrollBar={false} className='menu_navbar scrollbar' style={{ width: '100%', maxWidth: 800, flexDirection: 'column', overflowY: 'auto', alignItems: 'center', background: 'none' }} data-theme={localTheme}>
          <div className='cter_sect'>
            <div className='ctent_artiMiniProfil' data-theme={localTheme}>

              <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' style={{ width: 100, height: 100 }} src={promiseUser?.user.imageUrl || imgProfile} alt="" />
                <h4 className='title_color' translate='no' style={{ margin: 5 }}>{promiseUser?.user.pseudo}</h4>
                {promiseUser?.user.premium == 1 && <div className='premium' style={{ marginBottom: 10 }} translate='no'>Premium</div>}
                {promiseUser?.user.premium == 0 && <div className='standard' style={{ marginBottom: 10 }} translate='no'>Standard</div>}
                {promiseUser?.user.adultAccess == 1 && <div className='badge_adult' translate='no'>{NSFW}</div>}
              </div>
              <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <div className='button_option_container' style={{ width: '100%', maxWidth: 500, marginTop: 20 }} data-theme={localTheme}>
                  <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' data-theme={localTheme}><FontAwesomeIcon icon={faCopy} style={{ marginRight: 10 }} /> Copy page link</div>
                  <div style={{ paddingTop: 5, paddingBottom: 5 }} className='button_option' data-theme={localTheme}>Add to blacklist</div>
                  <div style={{ paddingTop: 5, paddingBottom: 5, color: 'red' }} className='button_option' data-theme={localTheme}>Reported</div>
                </div>

                {promiseIdentifiedUser && <>
                  {promiseIdentifiedUser?.user.isAdmin === true && <>
                    {promiseIdentifiedUser?.user.isMaster === true && <>
                      {promiseIdentifiedUser?.user.id != IdContext && <>
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: 400 }}>
                          {promiseUser?.user.isAdmin === true && <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div className='master' style={{ marginBottom: 10, marginTop: 20 }} translate='no'>New Master</div>
                              <div className="toggle-rect">
                                <input onChange={(e) => { UpdateMaster(promiseUser?.user.id, e.target.checked, promiseIdentifiedUser?.user.id) }} checked={promiseUser?.user.isMaster} disabled={checkboxMaster} type="checkbox" id="ghyjy524" name="ghyjy524" />
                                <label htmlFor="ghyjy524"></label>
                              </div>
                            </div>
                          </>}
                          {promiseUser?.user.isMaster === false && <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div className='admin' style={{ marginBottom: 10, marginTop: 20 }} translate='no'>New admin</div>
                              <div className="toggle-rect">
                                <input onChange={(e) => { UpdateAdmin(promiseUser?.user.id, e.target.checked, promiseIdentifiedUser?.user.id) }} checked={promiseUser?.user.isAdmin} disabled={checkboxAdmin} type="checkbox" id="ghyjyftjyj" name="ghyjyftjyj" />
                                <label htmlFor="ghyjyftjyj"></label>
                              </div>
                            </div>
                          </>}
                        </div>
                      </>}
                      <h4>{t('admin')}</h4>
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 10 }}>
                        {promiseUser?.user.isMaster == 1 && <div className='master' translate='no'>Master</div>}
                        {promiseUser?.user.isAdmin == 1 && <div className='admin' translate='no'>Admin</div>}
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


      <div className='nav_bar_scnd' style={{ padding: 0, borderRadius: 0 }} data-theme={localTheme}>

        <Color src={imgCover || SystemPicture || promiseUser?.user.imageUrlCover} crossOrigin="anonymous" format="hex">
          {({ data }) => {
            return (
              <div className='CoverImage FlexEmbed FlexEmbed--2by1' style={{ boxShadow: animationSelect !== 'eco' ? `${data} 0px 150px 200px 100px` : 'none', width: '100%', maxWidth: 1100, backgroundImage: promiseUser ? `url(${imgCover || SystemPicture || promiseUser?.user.imageUrlCover})` : null, backgroundPosition: `50% ${resize}%`, borderRadius: 0 }}></div>
            );
          }}
        </Color>
      </div>

      <div className='cter_sectProfil' data-theme={localTheme}>
        <div className='ctent_artiProfil' style={{ borderRadius: 0, overflow: 'visible' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className={!promiseIdentifiedUser ? 'container_interest_Profile_picture shadowbox' : promiseIdentifiedUser?.user.id == IdContext ? 'container_interest_Profile_picture ' : 'container_interest_Profile_picture shadowbox'} onClick={promiseIdentifiedUser && promiseIdentifiedUser?.user.id == IdContext ? () => { setHideCropMenu(true) } : null}>
              <img className='Profile_picture' src={promiseUser.user?.imageUrl ?? imgProfile} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
              <div data-hidden={promiseIdentifiedUser ? promiseIdentifiedUser?.user.id == IdContext ? true : false : false} className="overlay_interest_Profile_picture shadowbox" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div>Modifier la photo</div>
              </div>
            </div>
            <div className='Profile_picture_button shadowbox' data-theme={localTheme}>
              <div className='button_optionPic_v' onClick={() => {
                setHiddenInfoUser(true)
              }} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, position: 'absolute', borderRadius: '100%' }} data-theme={localTheme}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>

          {promiseUser && <><div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', maxWidth: 200, marginTop: 50 }}>
            <h3 className='shadowbox' style={{ color: 'white', margin: 0 }}>{promiseUser.user?.pseudo || 'user'}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ marginRight: 5, marginTop: 5 }} className='badge_System_color'>{SystemName}</div>
              {promiseUser?.user.accessPass && <div style={{ marginRight: 5, marginTop: 5 }} className='badgeShop'>{t("accessPass")}</div>}
              {promiseUser?.user.diamondPass && <div style={{ marginRight: 5, marginTop: 5 }} className='badgeColoring'>{t("subscription")}</div>}
            </div>
          </div>

            {promiseIdentifiedUser && <div style={{ width: '100%', maxWidth: 200 }}>
              <Subscription_management userId={IdContext} />
            </div>}

          </>}
        </div>
      </div>

      {promiseUser && <><div className={!isNavbarVisible ? 'cter_sect nav_fixed' : 'cter_sect nav_fixed active'} style={{ padding: 0, margin: 0, position: 'sticky', zIndex: 5000 }}>
        <div ref={refScroll} className='nav_bar_scnd' style={{ borderRadius: 0, flexDirection: 'row', width: '100%', paddingTop: 10 }} data-theme={localTheme}>

          <Link to={`/profile/${promiseUser?.user.id}/home?type=${typeUrl ? typeUrl : 'Illustrations'}`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={iconNav === `home` ? 'boxBounce' : ''} style={{ color: iconNav === `home` ? '#ec1c24' : '' }} icon={faHome} /><span style={{ marginLeft: 5 }} className='hidden980'>{t('home')}</span>
          </Link>

          <Link to={`/profile/${promiseUser?.user.id}/activities?type=${typeUrl ? typeUrl : 'Illustrations'}`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={iconNav === `activities` ? 'boxBounce' : ''} style={{ color: iconNav === `activities` ? '#ec1c24' : '' }} icon={faPhotoFilm} /><span style={{ marginLeft: 5 }} className='hidden980'>{t('activities')}</span>
          </Link>
          <Link to={`/profile/${promiseUser?.user.id}/contact?list=followers`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon className={iconNav === `contact` ? 'boxBounce' : ''} style={{ marginRight: 5, color: iconNav === `contact` ? '#ec1c24' : '' }} icon={faUsers} /><div style={{ color: '#ec1c24' }} >{promiseUser?.user.total_followers}</div><span style={{ marginLeft: 5 }} className='hidden980'>{t('follewers')}</span>
          </Link>
          <div onClick={() => { addSearchToUrl(`#${promiseUser?.user.pseudo}-accessDiamond`) }} className='button_optionColoring' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon icon={faGem} /><span style={{ marginLeft: 5 }} className='hidden980'>{t('subscription')}</span>
          </div>
          {/*<div onClick={() => { addSearchToUrl(`#${promiseUser?.user.pseudo}-accessPass`) }} className='button_optionColoringBlue' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <FontAwesomeIcon icon={faWandSparkles} /><span style={{ marginLeft: 5 }} className='hidden980'>{t('accessPass')}</span>
          </div>*/}
          {/*<Link to={`/${SystemName}-game`} className={iconNav === `${SystemName}-game` ? 'btn' : 'button_option'} style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
            <div className='textLoto' style={{ fontSize: 21 }}>Game</div>
              </Link>*/}

        </div>
      </div>

        {iconNav === `home` && <News
          promiseUser={promiseUser}
          checkedPrivateIllustration={checkedPrivateIllustration}
          setCheckedPrivateIllustration={setCheckedPrivateIllustration}
          checkedPrivateUsers={checkedPrivateUsers}
          setCheckedPrivateUsers={setCheckedPrivateUsers}
        />}
        {iconNav === `activities` && <Catalogues
          catalog={catalog}
          library={library}
          libraryOpen={libraryOpen}
          setLibraryOpen={setLibraryOpen}
          pageCount={pageCount}
          handlePage={handlePage}
          numPage={numPage}
          total={total}
          typeUrlCatalog={typeUrlCatalog}
          searchUrl={searchUrl}
          handleClickCatalog={handleClickCatalog}
          url={url} />}
        {iconNav === `contact` && <Contact GetFollowersFromAPI={GetFollowersFromAPI} promiseContact={promiseContact} />}
        {fullLocation.hash === `#${promiseUser?.user.pseudo}-accessDiamond` && <Subscription userId={promiseUser.user.id} sessionUser={promiseIdentifiedUser} />}
      </>}
    </div>
  )
}

export default UserProfil