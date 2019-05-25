/* eslint-disable camelcase,no-console,no-undef */
import React from 'react'
import PropTypes from "prop-types";

import utils from "../helpers/utils";

const validations = {
    email: (value) => {
        if (!value.trim()) {
            return 'Email is required'
        } else if (!utils.isValidEmail(value)) {
            return 'Invalid Email'
        }
        return null
    },

    password: (value) => {
        if (!(value.trim())) {
            return 'Password is required'
        } else if(value.trim().length < 8) {
            return 'Must be at least 8 characters'
        }
        return null
    },

    first_name: (value) => {
        if (!(value.trim())) {
            return 'First Name is required'
        }
        return null
    },

    last_name: (value) => {
        if (!(value.trim())) {
            return 'Last Name is required'
        }
        return null
    },

    title: (value) => {
        if (!(value.trim())) {
            return 'Title is required'
        }
        return null
    },

    author: (value) => {
        if (!(value.trim())) {
            return 'Author is required'
        }
        return null
    },

    number_of_pages: (value) => {
        if (!value) {
            return 'Number of pages is required'
        }
        return null
    },
};

const withValidations = (Component) => {
    class FormComponent extends React.Component {
        constructor(props) {
            super();
            this.state = {
                touched: props.values || {},
                errors: {}
            }
        }

        onChange = (e) => {
            const { name, value } = e.target;
            const { touched } = this.state;
            if (validations[name]) {
                touched[name] = value;
                this.setState({ touched });
                this.validate(touched);
            }
        };

        validate = (props) => {
            const errors = this.state.errors;
            for (let key in validations) {
                const touched = this.state.touched[key];

                if (touched !== '') {
                    if (!touched) continue;
                }

                const validator = validations[key];
                const value = props[key];
                errors[key] = validator(value)
            }
            this.setState({ errors })
        };

        render () {
            return (
                <Component
                    {...this.props}
                    {...this.state}
                    onChange={(e) => this.onChange(e)}
                    id="validation"
                />
            )
        }
    }

    FormComponent.propTypes = {
        userData: PropTypes.object
    };

    return FormComponent;
};

export default withValidations;
