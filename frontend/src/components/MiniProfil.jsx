import imgProfile from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { RemoveScroll } from 'react-remove-scroll';
import { spinner } from "../utils";
import { useAppContext } from '../contexts/UseAppContext';
import MiniProfilCards from "./MiniProfilCards";
import Invited from './Invited';
import { useEffect } from 'react';
import { useRef } from 'react';


const MiniProfil = () => {
  const { localTheme,
    setHiddenMenuMiniProfil,
    hiddenMenuMiniProfil,
    setHiddenMenu,
    hiddenMenu,
    promiseIdentifiedUser } = useAppContext();

  const Ref = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHiddenMenu(false)
          setHiddenMenuMiniProfil({})
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

  useOutsideAlerter(Ref);


  if (!hiddenMenu) return null

  if (promiseIdentifiedUser === false) return (
    <>
      <div className='blanket animation' style={{ zIndex: 10500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <RemoveScroll className='menu_navbar scrollbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 1000, height: '98%', overflowY: 'auto', background: 'none' }} data-theme={localTheme}>
          <div className='cter_sect' style={{ padding: 0 }}>
            <div className='ctent_artiMiniProfil' style={{ paddingBottom: 20 }} data-theme={localTheme}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                <div className='buttonCircleRed' onClick={() => {
                  setHiddenMenu(false)
                  setHiddenMenuMiniProfil({})
                }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, marginTop: 5, position: 'absolute' }} data-theme={localTheme}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
              {hiddenMenuMiniProfil.premium == 1 && <>
                {hiddenMenuMiniProfil.imageUrlCover != null && <>
                  <div style={{ backgroundImage: `url(${hiddenMenuMiniProfil.imageUrlCover})`, backgroundPosition: `50% ${hiddenMenuMiniProfil.resizeImageUrlCover}%`, borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>
                </>}
              </>}
              <div className="ctent_arti" style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderRadius: 0, paddingBottom: 55 }} data-theme={localTheme}>
                <img style={{ width: 150, height: 150, marginBottom: -50 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={hiddenMenuMiniProfil.imageUrl || imgProfile} alt="" />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{hiddenMenuMiniProfil.pseudo}</div>
                  {hiddenMenuMiniProfil.premium == 1 && <div className='premium' style={{ marginBottom: 10, width: 200 }} translate='no'>Premium</div>}
                  {hiddenMenuMiniProfil.premium == 0 && <div className='free' style={{ marginBottom: 10, width: 200 }} translate='no'>Free</div>}
                </div>
              </div>

              <Invited localTheme={localTheme} />

            </div>
          </div>
        </RemoveScroll>
      </div>
    </>
  )

  if (!promiseIdentifiedUser) return (
    <>
      <div className='blanket' style={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <RemoveScroll className='menu_navbar scrollbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 1000, height: '90%', overflowY: 'auto', background: 'none', marginBottom: '-3%' }} data-theme={localTheme}>
          <div className='cter_sect' style={{ padding: 0 }}>
            <div className='ctent_artiMiniProfil' style={{ paddingBottom: 20 }} data-theme={localTheme}>
              {spinner()}
            </div>
          </div>
        </RemoveScroll>
      </div>
    </>
  )

  return (
    <>
      <div className='blanket animation' style={{ zIndex: 10500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <RemoveScroll ref={Ref} className='menu_navbar scrollbar open-element-page-melted' style={{ width: '100%', height: '98%', flexDirection: 'column', maxWidth: 1100, overflowY: 'auto', background: 'none' }} data-theme={localTheme}>
          <div className='cter_sect' style={{ padding: 0 }}>
            <div className='ctent_artiMiniProfil' style={{ paddingBottom: 20 }} data-theme={localTheme}>
              {hiddenMenuMiniProfil.premium == 1 && <>
                {hiddenMenuMiniProfil.imageUrlCover != null && <>
                  {promiseIdentifiedUser.user.id == hiddenMenuMiniProfil.id && <div style={{ backgroundImage: `url(${promiseIdentifiedUser.user.imageUrlCover})`, backgroundPosition: `50% ${promiseIdentifiedUser.user.resizeImageUrlCover}%`, borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>}
                  {promiseIdentifiedUser.user.id != hiddenMenuMiniProfil.id && <div style={{ backgroundImage: `url(${hiddenMenuMiniProfil.imageUrlCover})`, backgroundPosition: `50% ${hiddenMenuMiniProfil.resizeImageUrlCover}%`, borderRadius: 0 }} className='CoverImage FlexEmbed FlexEmbed--2by1'></div>}
                </>}
              </>}
              <div className="ctent_arti" style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderRadius: 0, paddingBottom: 55 }} data-theme={localTheme}>
                {promiseIdentifiedUser.user.id == hiddenMenuMiniProfil.id && <img style={{ width: 150, height: 150, marginBottom: -50 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />}
                {promiseIdentifiedUser.user.id != hiddenMenuMiniProfil.id && <img style={{ width: 150, height: 150, marginBottom: -50 }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' src={hiddenMenuMiniProfil.imageUrl || imgProfile} alt="" />}
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }} translate='no'>{hiddenMenuMiniProfil.pseudo}</div>
                  {hiddenMenuMiniProfil.premium == 1 && <div className='premium' style={{ marginBottom: 10 }} translate='no'>Premium</div>}
                  {hiddenMenuMiniProfil.premium == 0 && <div className='free' style={{ marginBottom: 10 }} translate='no'>Free</div>}
                  <Link onClick={() => {
                    setHiddenMenu(false)
                    setHiddenMenuMiniProfil({})
                  }} to={`/profile/${hiddenMenuMiniProfil.id}/activities`} className='buttonCircleBlue' style={{ width: 120, height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginTop: 10, textDecoration: 'none' }} data-theme={localTheme}>
                    See page
                  </Link>
                  <div style={{ width: '100%', height: 20, borderRadius: 10, marginTop: 10 }} className='button_optionDisable' data-theme={localTheme}>Profile preview</div>
                </div>
              </div>

              <MiniProfilCards hiddenMenuMiniProfil={hiddenMenuMiniProfil} profile={promiseIdentifiedUser} />

            </div>
          </div>
        </RemoveScroll>
      </div>
      <div className='button_option_container mobileHidden' style={{ width: '100%', marginTop: 10, position: 'fixed', bottom: 0, opacity: 0.5, borderRadius: 0 }} data-theme={localTheme}>
              <div style={{ width: '100%', height: 30 }} onClick={() => {
                  setHiddenMenu(false)
                  setHiddenMenuMiniProfil({})
                }} className='button_optionRed' data-theme={localTheme}>Close</div>
              </div>
    </>
  )
}

export default MiniProfil