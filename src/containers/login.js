import React, { Component } from "react";

import Form from "../components/form";
import Calls from "../apis/calls";

const loginFields = {
    title: "login to your account",
    inputFields: [
        { type: "text", name: "email", maxLength: 200, labelText: "Email" },
        { type: "password", name: "password", maxLength: 200, labelText: "Password" }
    ],
    buttonText: "login",
    link: {title: "Don't have an account yet? Sign Up", to: "/register"}
};

class Login extends Component {
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
        Calls.login(data).then((response) => {
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
            formData={loginFields}
            submitForm={this.submit}
            errorMessage={response && response.errorMessage}
            data-test="loginForm"
        />;

    }
}

export default Login;