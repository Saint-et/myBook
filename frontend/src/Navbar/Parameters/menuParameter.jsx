import { Link, useLocation } from 'react-router-dom';
import './Option.scss';
import React from "react";
import { useAppContext } from '../../contexts/UseAppContext';
import { SystemName } from '../../assets/data/data';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench, faUserMinus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Premium from './artvibes_system/artvibes_system';
import Customization from './Customization/Customization';
import Assistance from './Assistance/Assistance';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import Account_parameter from './account/account';
import { faCircleQuestion, faIdBadge, faSquareMinus, faUser } from '@fortawesome/free-regular-svg-icons';
import Invited from '../../components/Invited';



const Menu_Parameter = () => {

    const { localTheme, isNavbarVisible, promiseIdentifiedUser } = useAppContext()

    const fullUrl = useLocation()

    const fullLocation = fullUrl.pathname

    const { t } = useTranslation();

    const location = fullLocation.split("/")
    const iconNav = location[2];


    return (
        <div className='main'>
            <div style={{ width: '97%' }}>
                <div className="copy-box two text" data-theme={localTheme}>
                    <div className="inner">
                        <div className="line right"></div>

                        <h4>{t("parameter")} {SystemName}</h4>

                        <div>{t("all_parameter.option_message1")}</div>

                    </div>
                </div>
            </div>

            <div className={!isNavbarVisible ? 'cter_sect nav_fixed' : 'cter_sect nav_fixed active'} style={{ padding: 0, margin: 0, position: 'sticky', zIndex: 5000 }}>
                <div className='nav_bar_scnd' style={{ borderRadius: 0, flexDirection: 'row', width: '100%', paddingTop: 10 }} data-theme={localTheme}>
                    <Link to={'/parameters/profile'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                        <FontAwesomeIcon className={iconNav === `profile` ? 'boxBounce' : ''} style={{ color: iconNav === `profile` ? '#ec1c24' : '' }} icon={faUser} /><span style={{ marginLeft: 5 }} className='hidden980'>{t("all_parameter.button0")}</span>
                    </Link>
                    <Link to={'/parameters/account'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                        <FontAwesomeIcon className={iconNav === `account` ? 'boxBounce' : ''} style={{ color: iconNav === `account` ? '#ec1c24' : '' }} icon={faIdBadge} /><span style={{ marginLeft: 5 }} className='hidden980'>{t("all_parameter.button1")}</span>
                    </Link>
                    <Link to={`/parameters/${SystemName}`} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                        <FontAwesomeIcon className={iconNav === SystemName ? 'boxBounce' : ''} style={{ color: iconNav === SystemName ? '#ec1c24' : '' }} icon={faScrewdriverWrench} /><span style={{ marginLeft: 5 }} className='hidden980'>{SystemName}</span>
                    </Link>
                    <Link to={'/parameters/assistance'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                        <FontAwesomeIcon className={iconNav === `assistance` ? 'boxBounce' : ''} style={{ color: iconNav === `assistance` ? '#ec1c24' : '' }} icon={faCircleQuestion} /><span style={{ marginLeft: 5 }} className='hidden980'>{t("all_parameter.button3")}</span>
                    </Link>
                    <Link to={'/parameters/delete-account'} className='button_option' style={{ width: 200, justifyContent: 'center', whiteSpace: 'nowrap', height: 30, borderRadius: 100, marginLeft: 5 }} data-theme={localTheme}>
                        <FontAwesomeIcon className={iconNav === `delete-account` ? 'boxBounce' : ''} style={{ color: iconNav === `delete-account` ? '#ec1c24' : '' }} icon={faUserXmark} /><span style={{ marginLeft: 5 }} className='hidden980'>{t("all_parameter.button4")}</span>
                    </Link>
                </div>
            </div>

            {!promiseIdentifiedUser && <Invited />}

            {fullLocation === `/parameters/profile` && <Customization />}
            {fullLocation === `/parameters/${SystemName}` && <Premium />}
            {fullLocation === `/parameters/account` && <Account_parameter />}
            {fullLocation === `/parameters/assistance` && <Assistance />}
            {fullLocation === `/parameters/delete-account` && <DeleteAccount />}

        </div>
    )
}

export default Menu_Parameter