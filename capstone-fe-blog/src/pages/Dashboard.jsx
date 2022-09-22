import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../components/BlogCard'
import Pagination from 'react-bootstrap/Pagination';


const Dashboard = () => {


    const [cardsList, SetCardsList] = useState([])
    const [cardsForward, SetForwardList] = useState([])
    const [count, setCount] = useState(1);

    useEffect(() => {
      cardList()
    
    }, [])

    const forward = page => e => {

        e.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 247685d52766a9e04cc10c5343dc3e2fbf121b6d");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

    fetch(`http://127.0.0.1:8000/cards/add/?offset=${(page-1)*6}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            SetCardsList(result)
            setCount(page)
        })
        .catch(error => console.log('error', error));
}
        let active = 1;
        let items = [];
            for (let number = 1; number <= Math.ceil(cardsList?.count/6); number++) {
                items.push(
            <Pagination.Item className='pagination' onClick={forward(number)} key={number} active={number === count}>
                    {number}
            </Pagination.Item>
);
}

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
                    {cardsList?.results?.map((card)=>(<BlogCard card={card} key={card?.date_created}/>))}
                </Row>
                <Pagination className='my-5 d-flex justify-content-center'>{items}</Pagination>
            </Container>
        </div>


    )
}

export default Dashboard