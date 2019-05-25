import React, { Component } from "react";

import Form from "../components/form";
import Calls from "../apis/calls";

const registerFields = {
    title: "Sign up",
    inputFields: [
        { type: "text", name: "first_name", maxLength: 200, labelText: "First Name" },
        { type: "text", name: "last_name", maxLength: 200, labelText: "Last Name" },
        { type: "text", name: "email", maxLength: 200, labelText: "Email" },
        { type: "password", name: "password", maxLength: 200, labelText: "Password" },
    ],
    buttonText: "Register",
    link: {title: "Have an account? Log In", to: "/"}
};

class Register extends Component {
    constructor() {
        super();
        this.state = {
            response: null
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const token = localStorage.getItem("AUTH_TOKEN");
        if(token) {
            history.push('/books');
        }
    }

    submit = (data) => {
        const { history } = this.props;
        Calls.register(data).then((response) => {
            this.setState({response});
            if(response.token) {
                localStorage.setItem("AUTH_TOKEN", response.token);
                history.push('/books');
            }
        }).catch((error) => {
            throw new Error("Unrecognized error");
        });
    };

    render() {
        const { response } = this.state;
        return <Form
            formData={registerFields}
            submitForm={this.submit}
            errorMessage={response && response.errorMessage}
        />;

    }
}

export default Register;