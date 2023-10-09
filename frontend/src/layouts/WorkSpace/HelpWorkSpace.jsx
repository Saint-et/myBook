import { DATA_picv } from "../../assets/data/data"
import { useAppContext } from "../../contexts/UseAppContext"




const HelpWorkSpace = () => {

    const { localTheme } = useAppContext()

    return (
        <>
            <div className='cter_sect'>
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <div className="copy-box two">
                        <div className="inner">
                            <div className="line right"></div>
                            <h3 style={{ color: '#ec1c24' }}>Quick tabs</h3>
                            <div style={{ padding: 10 }}>
                                <h4 style={{ color: 'grey' }}>Important Information</h4>
                                <p>Dear user,</p>
                                <p>We would like to inform you that our application uses IndexedDB, a local data storage technology supported by most modern web browsers. This enables us to provide a smooth and fast user experience.</p>
                                <p>However, it's important to note that while most browsers support IndexedDB, there are still some older or less common browsers that may not offer full support for this technology.</p>
                                <p>We recommend using one of the following browsers to fully enjoy our application:</p>
                                <ul>
                                    <li>Google Chrome</li>
                                    <li>Mozilla Firefox</li>
                                    <li>Microsoft Edge</li>
                                    <li>Safari</li>
                                    <li translate="no">Opera (GX)</li>
                                </ul>
                                <p>If you are using a different browser or encountering issues related to IndexedDB, we suggest updating your browser to the latest available version or considering one of the recommended browsers.</p>
                                <p>We apologize for any inconvenience this may cause, and we are here to assist you with any further questions or concerns.</p>
                                <p>Best regards, {DATA_picv}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpWorkSpace