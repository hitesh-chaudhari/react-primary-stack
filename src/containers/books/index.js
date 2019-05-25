import React, { Component } from "react";
import styled from "styled-components";
import { findIndex } from "lodash";
import Modal from "react-responsive-modal";

import Calls from "../../apis/calls";
import CustomInput from "../../components/input";
import Button from "../../components/button";
import BooksList from "./booksList";
import AddBook from "./addBook";

const Container = styled.div`
    max-width: 1180px;
    margin: 0 auto;
    padding: 100px 20px 0;
`;

const PageTitle = styled.h1`
    margin: 0 0 10px;
    color: #213c6a;
`;

const SearchBar = styled.div`
    text-align: right;
    width: 50%;
    margin-bottom: 20px;
    display: inline-block;
    
    > div {
        padding: 20px 10px;
    }
    
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const ButtonContainer = styled.div`
    text-align: right;
    width: 50%;
    display: inline-block;
    padding: 0 10px 20px;
    
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const IconContainer = styled.div`
    display: inline-block;
    float right;
    cursor: pointer;
`;

const ModalContent = styled.div`
    padding: 30px;
    text-align: center;
    
    p {
        font-weight: 500;
        font-size: 20px;
        margin: 0 0 30px;
    }
    
    button {
        margin-right: 20px;
        
        &:last-child {
            margin-right: 0;
        }
    }
`;

const addBook = {
    title: "Add Book",
    inputFields: [
        { type: "text", name: "title", maxLength: 200, labelText: "Title" },
        { type: "text", name: "author", maxLength: 200, labelText: "Author" },
        { type: "text", name: "number_of_pages", maxLength: 200, labelText: "Number of pages" },
    ],
    buttonText: "Add Book",
    buttonId: "submit",
    cancelButton: "Cancel"
};

const updateBookData = {
    title: "Update Book",
    inputFields: [
        { type: "text", name: "title", maxLength: 200, labelText: "Title" },
        { type: "text", name: "author", maxLength: 200, labelText: "Author" },
        { type: "text", name: "number_of_pages", maxLength: 200, labelText: "Number of pages" },
    ],
    buttonText: "Update Book",
    buttonId: "submit",
    cancelButton: "Cancel"
};

class Books extends Component {
    constructor(props) {
        super();
        this.state = {
            books: props.books || null,
            book: null,
            error: "Error",
            showModal: false,
            action: props.action || "list",
            success: "Success"
        };
    }

    onChange = (event) => {
        Calls.getBooks(null, event.target.value).then((response) => {
            if(response.errorMessage) {
                this.setState({error: response.errorMessage});
            } else {
                this.setState({books: response.books});
            }
        }).catch(() => {
            throw new Error("Error while fetching books");
        });
    };

    renderSearchBar = () => {
        return (
            <SearchBar>
                <CustomInput type="text" onChange={this.onChange} placeholder="Search Annotations" iconClass="fa fa-search" />
            </SearchBar>
        )
    };

    showUpdateForm = (id) => {
        const { books } = this.state;
        const book = books.filter((item) => item.id === id);
        this.setState({ book: book[0] });
        this.updateAction('update');
    };

    showBookList = () => {
        this.updateAction('list');
    };

    addBook = (data) => {
        const { books } = this.state;
        this.setState({error: null, success: null});
        Calls.addBook(data).then((response) => {
            if(response.errorMessage) {
                this.setState({error: response.errorMessage});
            } else {
                const updatedBooks = [response, ...books];
                this.setState({books: updatedBooks, success: response.message});
                this.updateAction('list');
            }
        }).catch((error) => {
            throw new Error("Error while adding a book");
        });
    };

    updateBook = (data) => {
        const { book, books } = this.state;
        this.setState({error: null, success: null});
        Calls.updateBook(book.id, data).then((response) => {
            if(response.errorMessage) {
                this.setState({error: response.errorMessage});
            } else {
                const index = findIndex(books, {id: book.id});
                books.splice(index, 1, response);
                this.setState({ books, success: response.message });
                this.updateAction('list');
            }
        }).catch(() => {
            throw new Error("Error while updating a book");
        });
    };

    deleteBook = () => {
        const { book, books } = this.state;
        this.handleCloseModal();
        Calls.deleteBook(book.id).then((response) => {
            if(response.errorMessage) {
                this.setState({ error: response.errorMessage });
            } else {
                const updatedBooks = books.filter((item) => item.id !== book.id);
                this.setState({ books: updatedBooks });
            }
        }).catch(() => {
            throw new Error("Error while deleting a book");
        });
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    openModal = (id) => {
        const { books } = this.state;
        const book = books.filter((item) => item.id === id);
        this.setState({showModal: true, book: book[0]});
    };

    updateAction = (action) => {
        this.setState({ action });
    };

    render() {
        const { books, book, action, error, success } = this.state;
        const { history } = this.props;

        if(action === "list") {
            return (
                <Container>
                    <PageTitle>Books List</PageTitle>
                    <div>
                        {this.renderSearchBar()}
                        <ButtonContainer>
                            <Button dataTest="addBookButton" onClick={() => this.updateAction('add')}>Add Book</Button>
                        </ButtonContainer>
                    </div>
                    <BooksList
                        books={books}
                        openModal={this.openModal}
                        showUpdateForm={this.showUpdateForm}
                        history={history}
                    />
                    <Modal
                        open={this.state.showModal}
                        onClose={this.handleCloseModal}
                        center
                    >
                        <ModalContent>
                            <p>Do you want to delete this book?</p>
                            <Button onClick={this.deleteBook}>Yes</Button>
                            <Button cancel={true} onClick={this.handleCloseModal}>Cancel</Button>
                        </ModalContent>
                    </Modal>
                </Container>
            )
        }

        if(action === "update") {
            return (
                <AddBook
                    formData={updateBookData}
                    values={book}
                    submitForm={this.updateBook}
                    cancelClick={this.showBookList}
                    disableButton={!(error || success)}
                    dataTest={`${action}form`}
                />
            );
        }

        if(action === "add") {
            return (
                <AddBook
                    formData={addBook}
                    submitForm={this.addBook}
                    cancelClick={this.showBookList}
                    disableButton={!(error || success)}
                    dataTest={`${action}form`}
                />
            );
        }

        return null;
    }
}

export default Books;

export { IconContainer };