import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap"; // Assuming you're using react-bootstrap for styling
import styled from "styled-components";
import { useFireBase } from "../context/Firebase";
import ShowBook from "./ShowBook";
import { Button } from "react-bootstrap";

const HoverCard = styled(Card)`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const BookCard = ({ book }) => {
  const { getImageUrl, getPdfUrl } = useFireBase();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleShowBook = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  useEffect(() => {
    getImageUrl(book.coverPicture).then((url) => {
      setUrl(url);
      setLoading(false);
    });

    getPdfUrl(book.pdfFile).then((url) => {
      setPdfUrl(url);
      setLoading(false);
      // console.log(url, "here is url")
    });
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status" className="p-4 align-self-center mt-4">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }
  return (
    <HoverCard>
      <Card className="book-card" style={{ transition: "transform 0.3s ease" }}>
        {isOpen ? (
          <ShowBook book={book} toggleShowBook={toggleShowBook} />
        )
          :
          (
            <Card.Img variant="top" src={url} alt="Book Cover" height={290} />
          )}
        <Card.Body>
          <Card.Title>{book.bookName}</Card.Title>
          <Card.Text>Author: {book.authorName}</Card.Text>
          {/* <Card.Text>Description: {book.bookDescription}</Card.Text> */}
          <Card.Text>ISBN: {book.isbn}</Card.Text>
          {/* <Card.Text>Price: ₹{book.price}</Card.Text> */}
          <Card.Text>Uploaded By: {book.uploadedBy}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {book.userPhotoURL ? <img
            src={book.userPhotoURL}
            alt="Uploader Photo"
            className="rounded-circle"
            width="20"
          /> : ''}
          <span className="ms-2">{book.userEmail}</span>
        </Card.Footer>
        <div className="w-full d-flex justify-content-center p-2">
          <Button onClick={toggleShowBook} className="p-2 m-1 text-white">{ isOpen ? " Hide " : "Show"}</Button>
          <Button className='p-2 m-1'><a href={pdfUrl} className='text-white' target='_blank' download={`${book.bookName}.pdf`}>Download Pdf</a></Button>
        </div>
      </Card>

    </HoverCard>
  );
};

export default BookCard;
