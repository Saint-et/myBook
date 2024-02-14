import { useNavigate } from 'react-router-dom';
import './sass/utils/spinner.scss';


export const IsLog = () => {
const url = window.location.href;
const Id = url.split("/");
useNavigate();

if (Id[3] !== 'login' && Id[3] !== 'signup' && Id[3] !== 'password-forgot') {
    return true
} else {
    return false
}
}


export const URLparameters = () => {
const url = window.location.href;
const Id = url.split("/");
useNavigate();

if (Id[3] === 'parameters') {
    return true
} else {
    return false
}
}

export const URLWorkSpace = () => {
    const url = window.location.href;
    const Id = url.split("/");
    useNavigate();
    
    if (Id[3] === 'works') {
        return true
    } else {
        return false
    }
    }
export const URLProfile = () => {
    const url = window.location.href;
    const Id = url.split("/");
    useNavigate();
    
    if (Id[3] === 'profile') {
        return true
    } else {
        return false
    }
    }
    export const URLGame = () => {
        const url = window.location.href;
        const Id = url.split("/");
        useNavigate();
        
        if (Id[3] === 'ArtfulAnime-game') {
            return true
        } else {
            return false
        }
        }
    export const URLUser = () => {
        const url = window.location.href;
        const Id = url.split("/");
        useNavigate();
        
        if (Id[3] === 'user') {
            return true
        } else {
            return false
        }
        }
        export const URLShopNavbar = () => {
            const url = window.location.href;
            const Id = url.split("/");
            useNavigate();
            
            if (Id[3] === 'ArtfulAnime-shop') {
                return true
            } else {
                return false
            }
            }

export const spinner = () => {
    return(
        <>
         <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </>
    )
}