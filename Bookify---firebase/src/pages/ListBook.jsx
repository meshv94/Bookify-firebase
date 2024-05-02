import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFireBase } from "../context/Firebase";

const ListBook = () => {
  const {uploadDataInStore , user} = useFireBase();

  const [bookName , setBookName] = useState('');
  const [isbn , setIsbn] = useState('');
  const [price , setPrice] = useState('10');
  const [bookDescription , setBookDescription] = useState('');
  const [authorName , setAuthorName] = useState('');
  const [coverPicture , setCoverPicture] = useState('');
  const [pdfFile, setPdfFile] = useState('')

  const handleSubmit = (e)=> {
    e.preventDefault();
    uploadDataInStore(bookName , isbn , price , bookDescription , authorName , coverPicture, pdfFile)
    setBookName('')
    setIsbn('')
    setPrice('')
    setBookDescription('')
    setAuthorName('')
    setCoverPicture('')
    // console.log(bookName , isbn , price , bookDescription , authorName , coverPicture)
  }

  return <>
    <section className="container">
    <h2 className="text-center mb-3 p-2"> Add your Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Book name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Book name"
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>ISBN number</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN Number"
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            required
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" >
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price in rupee"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </Form.Group> */}

        <Form.Group className="mb-3" >
          <Form.Label>Book Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Book Description"
            onChange={(e) => setBookDescription(e.target.value)}
            value={bookDescription}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            onChange={(e) => setAuthorName(e.target.value)}
            value={authorName}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Upload Cover Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Cover Image"
            onChange={(e) => setCoverPicture(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Upload PDF </Form.Label>
          <Form.Control
            type="file"
            placeholder="Pdf file"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </section>
  </>
};
export default ListBook;
