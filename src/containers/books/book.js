import React from "react";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";

const Title = styled.h5`
    font-size: 14px;
    margin: 0;
    text-transform: capitalize;
    width: calc(100%/5);
    font-weight: normal;
    border-right: 1px solid #dbe0e0;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    padding: 15px 10px;
    
    @media (max-width: 600px) {
        width: 100%;
        border-right: none;
        font-weight: 600;
    }
`;

const Author = styled.p`
    font-size: 14px;
    margin: 0;
    text-transform: capitalize;
    width: calc(100%/5);
    border-right: 1px solid #dbe0e0;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    padding: 15px 10px;
        
    @media (max-width: 600px) {
        width: 100%;
        border-right: none;
        padding: 0 10px;
    }
`;

const Pages = styled.p`
    font-size: 14px;
    margin: 0;
    line-height: 1.4;
    width: calc(100%/5);
    border-right: 1px solid #dbe0e0;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    padding: 15px 10px;
    
    @media (max-width: 600px) {
        width: 100%;
        border-right: none;
        margin: 10px 0 0 0;
        padding: 0 10px;
    }
`;

const StyledLink = styled.div`
    background-color: #ffffff;
    width: 100%;
    border-bottom: 1px solid #dbe0e0;
    display: flex;
    flex-wrap: wrap;
    
    &:last-child {
        border-bottom: none;
    }
    
    .annotation-section {
        width: 25%;
        border-right: 1px solid #dbe0e0;
        display: flex;
        justify-content: center;
        flex-grow: 1;
        align-items: center;
        flex-direction: column;
        padding: 15px 10px;
        
        @media (max-width: 600px) {
            width: 100%;
            border-right: none;
        }
        
        > p {
            padding: 0 10px;
            font-weight: 600;
            color: #213c6a;
            display: none;
            
            @media (max-width: 600px) {
                width: 100%;
                text-align: center;
                margin: 10px 0 0 0;
            }
        }
    }
    
    &:nth-child(even) {
        background-color: #efefef;
    }
`;

const Annotation = styled.div`
    font-size: 14px;
    margin: 15px 0 0 0;
    font-size: 14px;
    
    &:first-child {
        margin: 0;
    }
    
    .title {
        margin: 0;
        padding: 0 10px;
        text-transform: capitalize;
    }
    
    .pages {
        margin: 5px 0 0 0;
        padding: 0 10px;
    }
`;

const IconsContainer = styled.div`
    width: 15%;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    padding: 15px 10px;
    
    @media (max-width: 600px) {
        width: 100%;
        margin: 10px 0;
        padding: 0 10px;
    }
`;

const Icon = styled.button`
    border: none;
    background-color: transparent;
    padding: 5px 8px;
    font-size: 17px;
    margin-left: 15px;
    border-radius: 50%;
    cursor: pointer;
    
    i {
        color: ${({color}) => color ? color : "black"};
    }
    
    &:first-child {
        margin-left: 0;
    }
    
    &:active, &:focus {
        border: none;
        background-color: transparent;
        outline: none;
    }
    
    ${({disabled}) => disabled && css`
        cursor: not-allowed !important;
        opacity: 0.5;
    `}
`;

const Book = ({book, showUpdateForm, deleteBook}) => {
    const { annotations, title, author, id, number_of_pages, book_user } = book;

    return (
        <StyledLink data-test="bookItem" className="bookItem">
            <Title className="bookItem-title">{title}</Title>
            <Author>{author}</Author>
            <Pages>{number_of_pages}</Pages>
            <div className="annotation-section">
                {
                    !isEmpty(annotations) ? annotations.map((annotation, index) => {
                        const { text, page } = annotation;
                        return (
                            <Annotation key={index}>
                                <p className="title">Text: {text}</p>
                                <p className="pages">Page: {page}</p>
                            </Annotation>
                        )
                    }) : ""
                }
            </div>
            <IconsContainer>
                <Icon disabled={!(book_user && book_user.is_book_owner)} color="#213c6a" onClick={() => showUpdateForm(id)} title="Edit">
                    <i className="fa fa-pencil" aria-hidden="true" />
                </Icon>
                <Icon disabled={!(book_user && book_user.is_book_owner)} color="red" onClick={() => deleteBook(id)} title="Delete">
                    <i className="fa fa-trash-o" aria-hidden="true" />
                </Icon>
            </IconsContainer>
        </StyledLink>
    );
};

export default Book;