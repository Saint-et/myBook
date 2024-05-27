import { useLocation, NavLink } from 'react-router-dom';
import Search from './Search';
import imgProfile from '../../assets/images/logo.png';
import { useAppContext } from '../../contexts/UseAppContext';
import { useEffect, useRef } from 'react';


const PageSearch = (props) => {
    const { localTheme, promiseIdentifiedUser } = useAppContext();

    const location = useLocation().pathname.split("/");

    const ref = useRef(null);

    useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [])

    if (!promiseIdentifiedUser) return null

    return (
        <div className='main'>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ display: 'flex', maxWidth: 700, width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 25, marginTop: 50 }} data-theme={localTheme}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1>Search</h1>
                        <div style={{ display: 'flex', width: '100%', maxWidth: 700, justifyContent: 'space-around', alignItems: 'center', padding: 10, borderRadius: 25 }}>
                            <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className='Profile_picture' style={{ width: 100, height: 100 }} src={promiseIdentifiedUser.user.imageUrl || imgProfile} alt="" />
                        </div>
                        {promiseIdentifiedUser.user.premium == 0 && <div className='free' translate='no'>Free</div>}
                        {promiseIdentifiedUser.user.premium == 1 && <div className='premium' translate='no'>Premium</div>}
                        <h3>Menu</h3>
                        <div ref={ref} className='button_option_container' style={{ width: '100%', marginTop: 10, display: 'flex' }} data-theme={localTheme}>
                            <NavLink to={`/search-articles/${location[2]}`} className='button_option' style={{ width: '100%', height: 50 }} data-theme={localTheme}>
                                <h3 translate="no">Event-V</h3>
                            </NavLink>
                            <NavLink to={`/search-users/${location[2]}`} className='button_option' style={{ width: '100%', height: 50 }} data-theme={localTheme}>
                                <h3>Users</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={localTheme}>

                    <Search key={location[1]} setHiddenMenu={props.setHiddenMenu} localTheme={localTheme} promise={promiseIdentifiedUser} />

                </div>
            </div>
        </div>
    )
}

export default PageSearch