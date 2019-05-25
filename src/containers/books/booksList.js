import React from "react";
import styled from "styled-components";

import Book from "./book";

const BooksContainer = styled.div`
    width: calc(100% - 20px);
    text-align: center;
    margin: 0 10px;
    border: 1px solid #ccc;
`;

const HeadingContainer = styled.div`
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid white;
    width: 100%;
    background-color: #213c6a;
    display: flex;
    flex-wrap: wrap;
    
    p {
        margin: 0;
        width: calc(100%/5);
        padding: 10px;
        color: white;
        border-right: 1px solid white;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        
        &:nth-last-child(2) {
            width: 25%;
        }
        
        &:last-child {
            width: 15%;
            text-align: center;
            border-right: none;
        }
    }
    
    @media (max-width: 600px) {
        display: none;
    }
`;

const NotFound = styled.div`
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
`;

const BooksList = ({ books, showUpdateForm, openModal }) => {
    return (
        <BooksContainer>
            <HeadingContainer>
                <p>Book Title</p>
                <p>Author Name</p>
                <p>No. of Page(s)</p>
                <p>Annotations</p>
                <p>Actions</p>
            </HeadingContainer>
            {
                (books.length > 0) ? books.map((book, index) => <Book
                    key={index}
                    book={book}
                    showUpdateForm={showUpdateForm}
                    deleteBook={openModal}
                />) : <NotFound>No books found</NotFound>
            }
        </BooksContainer>
    )
};

export default BooksList;