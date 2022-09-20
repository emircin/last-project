import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../components/BlogCard'

const Dashboard = () => {


    const [cardsList, SetCardsList] = useState([])
    console.log(cardsList)

    useEffect(() => {
      cardList()
    
    }, [])
    

    const cardList = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 247685d52766a9e04cc10c5343dc3e2fbf121b6d");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/cards/add/", requestOptions)
            .then(response => response.json())
            .then(result => SetCardsList(result))
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <Container>
                <Row className='d-flex justify-content-center p-2'>
                    {cardsList.map((card)=>(<BlogCard card={card} key={card?.date_created}/>))}
                </Row>
            </Container>
        </div>


    )
}

export default Dashboard