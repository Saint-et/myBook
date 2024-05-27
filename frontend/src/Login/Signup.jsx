import Log from "../components/Log";
import React, { useState } from 'react';
import axios from "axios";
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/UseAppContext';
import { useEffect } from "react";
import { SystemName } from "../assets/data/data";

const Signup = () => {
    const { setPromiseIdentifiedUser, GetMyProfilFromAPI, promiseIdentifiedUser, addErrorMessage } = useAppContext()

    const navigate = useNavigate()

    // création du body du post
    const [edite, setEdite] = useState({
        pseudo: "",
        email: "",
        password: "",
        password_verification: "",
    });

    const [language, setLanguage] = useState("")

    // l'affichage des error
    const [error, setError] = useState("");

    // récupération des champs de text
    const handleChange = (name) => event => {
        setEdite({ ...edite, [name]: event.target.value })
    };

    const handleChangeLanguage = (value) => {
        setLanguage(value)
    }

    // Envoi du formulaire à L'API
    const submit = async () => {
        setError('')
        try {
            await axios.post(`${API_URL}api/auth/signup`, {
                pseudo: edite.pseudo,
                email: edite.email,
                languages: language.value,
                password: edite.password,
                password_verification: edite.password_verification

            }, { withCredentials: true })
                .then((res) => {
                    if (res.data.message == 'log') {
                        GetMyProfilFromAPI()
                        setPromiseIdentifiedUser()
                        addErrorMessage(`Bienvenu sur ${SystemName} 🙂.`, 5000, '#396afc')
                        return navigate('/')
                    }
                })
        } catch (error) {
            console.log({ error });
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        if (promiseIdentifiedUser !== false && promiseIdentifiedUser !== undefined) return navigate('/')
    }, [])

    if (promiseIdentifiedUser === undefined) return (null)


    return (
        <div className='main'>
            <Log
                signup={false}
                handleChange={handleChange}
                user={edite}
                error={error}
                handleChangeLanguage={handleChangeLanguage}
                submit={submit}
            />
        </div>
    )
}

export default Signup