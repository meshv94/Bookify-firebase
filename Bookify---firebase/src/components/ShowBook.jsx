import React, { useEffect, useState } from 'react'
import { useFireBase } from '../context/Firebase'
import { Spinner } from 'react-bootstrap';

const ShowBook = ({ book, toggleShowBook }) => {
    const { getPdfUrl } = useFireBase()
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPdfUrl(book.pdfFile).then((url) => {
            setUrl(url);
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
        <>
            
            {/* <div style={{ cursor:'pointer'}} className='d-flex justify-content-end '>
                <span className='p-1' onClick={() => toggleShowBook()}>❌</span>
            </div> */}
            <embed src={`${url}#toolbar=0`} frameBorder="0" height={290} />

        </>
    )
}

export default ShowBook