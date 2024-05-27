import { Link, NavLink } from "react-router-dom"
import { spinner } from "../../utils";
import { useAppContext } from '../../contexts/UseAppContext';

const Tags = (props) => {
    const { localTheme } = useAppContext();

    const url = window.location.href;

    const IdUser = url.split("/")[4];

    if (!props.promise) return (
        <>
            {spinner()}
        </>
    )

    if (props.promise.length == 0) return (
        <>
            <h4>No tags</h4>
        </>
    )

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
                <div className='container_bouton_free' style={{ width: '100%', maxWidth: 1500, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} data-theme={localTheme}>
                    <Link to={`/profile/${IdUser}/catalogues/all`} className='button_optionBlue' style={{ width: '25%', minWidth: 187, height: 50 }} data-theme={localTheme}>
                        <h3>See all</h3>
                    </Link>
                    {props.promise?.map((promise) => (
                        <NavLink to={`/profile/${IdUser}/catalogues/${promise}`} key={promise} className='button_option' style={{ width: '25%', minWidth: 187, height: 50 }} data-theme={localTheme}>
                            <h3>{promise}</h3>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tags