import React from 'react'
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link} from "react-router-dom";

const Login = () => {


    const {login, email, password, setEmail, setPassword} = useContext(AuthContext)


    return (
        <div className='d-flex'>
            <div className='image-container'>
                <img src="https://picsum.photos/800/450" alt="" />
            </div>
            <div className='d-flex justify-content-center align-items-center w-100 px-5'>
                <Form className='w-100' onSubmit={login}>
                    <div className='rounded-circle bg-info mb-3 d-flex justify-content-center align-items-center mx-auto' style={{ width: "48px", height: "48px" }}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-unlock" viewBox="0 0 16 16">
                        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                    </svg></div>

                    <p className='w-100 h4 text-center mb-3'>Log In</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={e=>(setEmail(e.target.value))} value={email ?? "" } type="email" className='w-100' placeholder="Enter email" />
                        <Form.Text className="text-danger">
                            <small>*We'll never share your email with anyone else.</small>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e=>(setPassword(e.target.value))} value={password ?? "" } type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="info" className='w-100' type="submit">
                        Submit
                    </Button>
                    <div className='w-100 text-center mt-4'><Link to={"/register"}>Don't have an account? Sign Up</Link></div>
                    <div className='text-secondary w-100 text-center mt-3'> <small>Copyright &copy; Our Website 2022</small> </div>
                </Form>


            </div>

        </div>
    )
}

export default Login