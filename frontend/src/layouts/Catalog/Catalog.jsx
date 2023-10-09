import Pub from "../../components/Pub/Pub";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card_list from '../../components/Cards/Card_Square_user_list_presentation';
import { useAppContext } from '../../contexts/UseAppContext';
import Warning from "../../components/Warning";
import { useEffect } from "react";
import Card_announcement from '../../components/Cards/Card_announcement';
import logo from '../../assets/images/logo.png';
import { DATA_picv } from "../../assets/data/data";


const Catalog = () => {
    const { localTheme, promiseUsers, GetUsersPopularFromAPI, promiseAnnouncement, GetBestAnnouncementFromAPI, promiseIdentifiedUser } = useAppContext()

    useEffect(() => {
        GetUsersPopularFromAPI()
        if (promiseIdentifiedUser != null) {
            if (promiseIdentifiedUser.user.interest != null) {
                GetBestAnnouncementFromAPI(promiseIdentifiedUser.user.interest)
            }
        }
    }, [])


    if (!promiseUsers || !promiseIdentifiedUser) return null

    return (
        <div>
            <Pub />

            <Warning />

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color" translate="no">- Home</h3>
                    </div>

                </div>
            </div>

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color">- Best tags</h3>
                    </div>


                </div>
            </div>

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%', display: 'flex', alignItems: 'center' }}>
                        <h3 className="title_color">- Just for you.</h3>
                    </div>

                    <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <div className='buttonCircle' style={{ width: 'max-content', height: 35, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, padding: '0px 10px 0px 10px', background: 'none' }} data-theme={localTheme}>
                            See more ...
                        </div>
                    </div>
                </div>
            </div>

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti animation' data-theme={localTheme}>
                    <h3 translate='no' style={{ color: '#747474', margin: 0 }}>{DATA_picv}</h3>

                    <img className='imgCardArticle' style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content' }} src={logo} alt="" />

                </div>
            </div>

            <div className='cter_sect' style={{ marginTop: 100 }}>
                <div className='ctent_arti' data-theme={localTheme}>
                    <div style={{ width: '98%' }}>
                        <h3 className="title_color">- Most popular users</h3>
                    </div>
                    <Card_list promise={promiseUsers.promise} button={false} />
                </div>
            </div>


        </div>
    )
}

export default Catalog