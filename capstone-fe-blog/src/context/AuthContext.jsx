import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [currentuser, setCurrentuser] = useState(false)
    const [currentemail, setCurrentemail] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        const loggedInUser = localStorage.getItem("username");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setCurrentuser(foundUser);
        }
      }, []);
    

    const login = async (e) => {
        e.preventDefault()

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "password": password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch("http://127.0.0.1:8000/users/auth/login/", requestOptions)
        let data = await response.json()

        if (response.status === 200) {
            setCurrentuser(data?.user?.username)
            setCurrentemail(data?.user?.email)
            console.log(data)
            localStorage.setItem('username', JSON.stringify(data?.user?.username))
            localStorage.setItem('token', JSON.stringify(data?.key))
            navigate("/")

        } else {
            alert('Something went wrong!')
        }

    }

    const logout = (e) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/users/auth/logout/", requestOptions)
            .then(response => response.text())
            .then(result => {
                navigate("/")
                setCurrentuser(null)
                setPassword(null)
                setEmail(null)
                localStorage.clear();

            }
            )
            .catch(error => console.log('error', error));
    }

    return (
        <AuthContext.Provider value={{ login, logout, email, password, currentuser, currentemail, setEmail, setPassword }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider