import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import "../App.css"
import { useNavigate } from 'react-router-dom'

const NewCard = () => {


    const [title, SetTitle] = useState("")
    const [image, SetImage] = useState("")
    const [content, SetContent] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": title,
            "image": image,
            "content": content,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/cards/add/", requestOptions)
            .then(response => response.json())
            .then(result =>{
                navigate("/")
            } )
            .catch(error => console.log('error', error));

    }


    return (
        <div className='w-100 d-flex align-items-center justify-content-center'>
            {/* <Container className='d-flex align-items-center w-100'> */}
            <Form className='w-50' onSubmit={handleSubmit}>
                <div className='rounded-circle bg-info mt-4 d-flex justify-content-center align-items-center mx-auto' style={{ width: "48px", height: "48px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-card-text" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </div>
                <p className='w-100 h3 text-center my-2'>New Card</p>
                <Form.Group className="mb-3 shadow-none" controlId="formBasicText">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={e => (SetTitle(e.target.value))} type="text" className='w-100' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control onChange={e => (SetImage(e.target.value))} type="text" className='w-100' />
                </Form.Group>

                <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" onChange={e => (SetContent(e.target.value))} rows={3} className='w-100' />
                </Form.Group>

                <Button variant="info" className='w-100' type="submit">
                    Submit
                </Button>
            </Form>
            {/* </Container> */}
        </div>
    )
}

export default NewCard