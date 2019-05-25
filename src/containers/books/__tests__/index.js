import React from "react";
import { mount } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import Books from "../index";

import { instance, BASE_URI } from "../../../apis/calls";
import CONSTANTS from "../../../apis/constants";

const mock = new MockAdapter(instance);

const books = [
    {
        "id": 40,
        "title": "Harry Potter and Deadly Hallows Part 8",
        "number_of_pages": 600,
        "author": "JK Rowling",
        "book_user": {
            "id": 5,
            "is_book_owner": false,
            "username": "hitesh.chaudhari@tudip.com",
            "email": "hitesh.chaudhari@tudip.com"
        },
        "annotations": [
            {
                "id": 54,
                "page": 20,
                "text": "Children movies",
                "annotation_author": "JK Rowling",
                "annotation_book_id": 40
            },
            {
                "id": 55,
                "page": 303,
                "text": "Adult comic ",
                "annotation_author": "JK Rowling",
                "annotation_book_id": 40
            }
        ]
    },
    {
        "id": 39,
        "title": "Harry Potter and Deadly Hallows Part 8",
        "number_of_pages": 600,
        "author": "JK Rowling",
        "book_user": {
            "id": 5,
            "is_book_owner": false,
            "username": "hitesh.chaudhari@tudip.com",
            "email": "hitesh.chaudhari@tudip.com"
        },
        "annotations": [
            {
                "id": 52,
                "page": 20,
                "text": "Children movies",
                "annotation_author": "JK Rowling",
                "annotation_book_id": 39
            },
            {
                "id": 53,
                "page": 303,
                "text": "Adult comic ",
                "annotation_author": "JK Rowling",
                "annotation_book_id": 39
            }
        ]
    },
];

const action = "list";

const setUp = (props = {}) => {
    return mount(<Books {...props} />)
};

describe("Books component", () => {
    let component;

    beforeEach(() => {
        component = setUp({books, action});
    });

    it("entering book details in a form adds a book", () => {
        expect(component.state().books).toBe(books);

        component.find('Button').simulate('click');

        expect(component.state().action).toEqual("add");

        const title = component.find('input#title');
        title.instance().value = 'New book';
        title.simulate('change');
        const author = component.find('input#author');
        author.instance().value = 'James Gosling';
        author.simulate('change');
        const number_of_pages = component.find('input#number_of_pages');
        number_of_pages.instance().value = 200;
        number_of_pages.simulate('change');

        const data = {
            title: title.instance().value,
            author: author.instance().value,
            number_of_pages: number_of_pages.instance().value,
            annotations: []
        };

        const addForm = component.find('form#addform');

        addForm.simulate('submit');

        mock.onPost(`${BASE_URI}${CONSTANTS.ADD_BOOK}`).reply(200, data);

        const authToken = localStorage.getItem('AUTH_TOKEN');

        const headers = {Authorization:`Token ${authToken}`};

        instance.post(`${BASE_URI}${CONSTANTS.ADD_BOOK}`, data, {headers: headers}).then((response) => {
            component.setState({action: "list", books: [response, ...books]}, () => {
                expect(component.state().action).toEqual("list");
                const item = component.find(".bookItem").at(1).find('h5.bookItem-title').text();
                expect(item).toEqual(title.instance().value);

            });
        });
    })
});