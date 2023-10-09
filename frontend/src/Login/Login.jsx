import Log from "../components/Log";
import React, { useState } from 'react';
import axios from "axios";
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import useKeypress from 'react-use-keypress';
import { useAppContext } from '../contexts/UseAppContext';
import { useEffect } from "react";


const Login = () => {


  const { setPromiseIdentifiedUser, GetMyProfilFromAPI, GetUsersPopularFromAPI, promiseIdentifiedUser } = useAppContext()

  const navigate = useNavigate()

  const [edite, setEdite] = useState({
    email: "",
    password: ""
  });


  const [error, setError] = useState("");


  const handleChange = (name) => event => {
    setEdite({ ...edite, [name]: event.target.value })
  };

  const submit = async () => {
    setError('')
    try {
      await axios.post(`${API_URL}api/auth/login`, {
        email: edite.email,
        password: edite.password
      }, { withCredentials: true })
        .then((res) => {
          if (res.data.message == 'log') {
            GetMyProfilFromAPI()
            setPromiseIdentifiedUser()
            GetUsersPopularFromAPI()
            return navigate('/')
          }
        })
    } catch (error) {
      setError(error.response.data.message)
    }

  }

  useKeypress('Enter', () => {
    submit()
  })

  useEffect(() => {
    if (promiseIdentifiedUser !== false && promiseIdentifiedUser !== undefined) return navigate('/')
  }, [])

  if (promiseIdentifiedUser === undefined) return (null)

  return (
    <>
      <Log
        Login={true}
        handleChange={handleChange}
        user={edite}
        error={error}
        submit={submit}
      />
    </>
  )
}

export default Login