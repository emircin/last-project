import React from 'react'
import '../App.css'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "password2": password2
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const register = () => {

        fetch("http://127.0.0.1:8000/users/register/", requestOptions)
            .then(response => response.text())
            .then(result => navigate("/"))
            .catch(error => console.log('error', error));

    }

    return (
        <div>
            <div className='d-flex'>
                <div className='image-container'>
                    <img src="https://picsum.photos/800/450" alt="" />
                </div>
                <div className='d-flex justify-content-center align-items-center w-100 px-5'>
                    <Form className='w-100'>
                        <div className='rounded-circle bg-info mb-2 d-flex justify-content-center align-items-center mx-auto' style={{ width: "48px", height: "48px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                            </svg></div>

                        <p className='w-100 h4 text-center mb-3'>Sign Up</p>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => (setUsername(e.target.value))} value={username} type="text" className='w-100' placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => (setEmail(e.target.value))} value={email} type="email" className='w-100' placeholder="Enter email" />
                            <Form.Text className="text-danger">
                                <small>*We'll never share your email with anyone else.</small>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => (setPassword(e.target.value))} value={password} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Again Password</Form.Label>
                            <Form.Control onChange={e => (setPassword2(e.target.value))} value={password2} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={register} variant="info" className='w-100' type="submit">
                            Register
                        </Button>
                        <div className='w-100 text-center mt-4'><Link to={"/login"}>Already have an account? Log In</Link></div>
                        <div className='text-secondary w-100 text-center mt-3'> <small>Copyright &copy; Our Website 2022</small> </div>
                    </Form>


                </div>

            </div>
        </div>
    )
}

export default Register
