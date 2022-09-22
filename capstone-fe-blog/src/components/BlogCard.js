import React from "react";
import { Card, Col } from "react-bootstrap";
import NoImage from "../assets/no-image-icon.jpg"
import "../App.css"
import { useNavigate } from 'react-router-dom';

const BlogCard = ({card}) => {

  const navigate = useNavigate();


  const addDefaultSrc = (e) =>{
    e.target.src = NoImage
  }

  const handleDetail = async () => {

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
          "card_id": card?.id
      });

      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch(`http://127.0.0.1:8000/cards/views/${card?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        navigate("detail/" + card?.id)
      
      }
      )
      .catch(error => console.log('error', error));
}
 
  return (
      <Col xs={12} sm={6} lg={4} className="mt-5 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            onError={addDefaultSrc}
            variant="top"
            style={{ height: "11rem" }}
            src={card?.image}
          />
          <Card.Body className="content-body" onClick={handleDetail} style={{ cursor: "pointer" }}>
            <Card.Title>{card?.title}</Card.Title>
            <Card.Text className="text-muted my-2">
              {" "}
              <small>{card?.date_created}</small>{" "}
            </Card.Text>
            <Card.Text className="content-text">
              {card?.content}
            </Card.Text>
            <Card.Text>
              <small>by {card?.author}</small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-start align-items-center">
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
              {card?.likes_count}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-eye-fill mx-3 text-muted"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
              {card?.views_count}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-chat-left-dots-fill mx-3 text-muted"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              {card?.comment_count}
            </div>
          </Card.Footer>
        </Card>
      </Col>
  );
};

export default BlogCard;
