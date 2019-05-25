import React, { Component } from "react";
import { isNull } from "lodash";

import Books from "./books/index";

import Calls from "../apis/calls";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            books: null,
            action: "list",
            error: null
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        Calls.getAllBooks().then((response) => {
            if(response.errorMessage) {
                this.setState({error: response.errorMessage});
            } else {
                this.setState({books: response.books});
            }
        }).catch(() => {
            throw new Error("Error while fetching books");
        });
    };

    updateBooks = (data) => {
        this.setState({ books: data })
    };

    updateAction = (action) => {
        this.setState({ action });
    };

    render() {
        const { history } = this.props;
        const { books, action } = this.state;

        if(isNull(books)) {
            return <div>Loading...</div>
        }

        return (
            <Books
                history={history}
                books={books}
                action={action}
                updateAction={this.updateAction}
                updateBooks={this.updateBooks}
            />
        )
    }
}

export default Dashboard;