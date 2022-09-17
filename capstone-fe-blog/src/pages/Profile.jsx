import React from 'react'
import { Container } from "react-bootstrap"
import User from "../assets/username.png"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {

    const { currentuser, currentemail } = useContext(AuthContext)

    return (
        <div>
            <Container className="d-flex flex-row m-5 justify-content-between">
                <div className='w-25 mx-4'>
                    <img src={User} className='w-100' alt="" />
                </div>
                <div className='w-50'>
                    <h4>Full Name : <span className='fw-light'>You can update</span></h4>
                    <h4>Email : <span className='fw-light'>{currentemail}</span></h4> 
                    <h4>Username : <span className='fw-light'>{currentuser}</span></h4> 
                    <h4 className='mt-5'>About : <span className='fw-light'>Write something about yourself..</span></h4>
                </div>
            </Container>


        </div>
    )
}

export default Profile