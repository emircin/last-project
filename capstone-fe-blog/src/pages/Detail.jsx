import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NoImage from "../assets/no-image-icon.jpg"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Detail = () => {

    const { id } = useParams();
    const { currentuser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [detailCard, SetDetailCard] = useState([])
    const [addComment, SetAddComment] = useState("")
    const [addLike, SetAddLike] = useState("")
    const [getLike, SetGetLike] = useState("")
    console.log(getLike)

    useEffect(() => {
        handleDetail()
        getLikeF()
    }, [])

    let showComment;

    const handleDetail = (e) => {

        const axios = require('axios');

        const config = {
            method: 'get',
            url: `http://127.0.0.1:8000/cards/update/${id}`,
            headers: {
                'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type': 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                SetDetailCard(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showComment = handleDetail;



    const addDefaultSrc = (e) => {
        e.target.src = NoImage
    }
    const updateCard = () => {
        navigate(`/update-blog`, { state: { detailCard } })
    }

    const commentAdd = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "text": addComment,
            "card_id": detailCard?.id
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/cards/comment/${detailCard?.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                showComment()
                SetAddComment("")

            })
            .catch(error => console.log('error', error));
    }

    const deleteCard = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/cards/update/${detailCard?.id}`, requestOptions)
            .then(response => response.text())
            .then(result => navigate(-1))
            .catch(error => console.log('error', error));
    }

    const getLikeF = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
        myHeaders.append("Content-Type", "application/json");


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/cards/likes/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => SetGetLike(result))
        .catch(error => console.log('error', error));
    }

    const like = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "card_id": id
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/cards/likes/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            SetAddLike(result)
            getLikeF()
        
        }
        )
        .catch(error => console.log('error', error));
}

    return (
        <div>
            <Container>
                <Card className='mt-5'>
                    <div className='d-flex justify-content-center'>
                        <Card.Img variant="top" onError={addDefaultSrc} style={{ height: "50%", width: "50%" }} src={detailCard?.image} />
                    </div>
                    <Card.Body>
                        <Card.Title>{detailCard?.title}</Card.Title>
                        <Card.Text>
                            {detailCard?.content}
                        </Card.Text>
                        <Card.Text>
                            {detailCard?.date_created}
                        </Card.Text>
                        <Card.Text>
                            by {detailCard?.author}
                        </Card.Text>

                        <button className='my-2' onClick={like}>
                            {getLike?.length == 0 ? 
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-suit-heart-fill mx-3 text-muted"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                          </svg>
                          :
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="red"
                          className="bi bi-suit-heart-fill mx-3 text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                        </svg> 
                        }
              </button>

                        {detailCard?.author === currentuser ?
                            <div className='d-flex justify-content-center'>
                                <Button variant="info" onClick={updateCard} className='mx-3'>Update</Button>
                                <Button variant="info" onClick={deleteCard} >Delete</Button>
                            </div>

                            : null}


                        <Form onSubmit={commentAdd}>
                            <Form.Group className="my-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='h5' >AddComment</Form.Label>
                                <Form.Control as="textarea" onChange={e => (SetAddComment(e.target.value))} value={addComment ?? "" } rows={2} className='w-100 mb-4' />
                                <Button variant="info" className='w-25' type="submit">
                                    Add Comment
                                </Button>
                            </Form.Group>
                        </Form>

                        {detailCard?.comment?.length > 0 ?
                            <div>
                                <h5>Comments</h5>
                                <hr />
                                {detailCard?.comment.map((comment) =>

                                (
                                    <div key={comment.id}>
                                        <p>{comment?.text}</p>
                                        <p><small><b>{comment?.author}</b></small></p>
                                        <hr />
                                    </div>
                                ))
                                }
                            </div>
                            :
                            "No Comments"
                        }

                    </Card.Body>

                </Card>
            </Container>
        </div>
    )
}

export default Detail