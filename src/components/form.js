import React, { Component } from "react";
import styled from "styled-components";
import {omitBy, isNil} from "lodash";
import { Link } from "react-router-dom";

import CustomInput from "./input.js";
import Button from "./button";
import withValidations from "./withValidations";

const FormContainer = styled.div`
    max-width: 400px;
    margin: auto;
    border: 1px solid #ccc;
`;

const StyledForm = styled.form`
    max-width: 500px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    
    ul {
        padding: 0 20px;
        margin: 0;
    }
`;

const FormTitle = styled.h3`
    text-transform: capitalize;
    font-size: 25px;
    color: #213c6a;
`;

const ErrorMessage = styled.li`
    text-align: left;
    margin-bottom: 10px;
    font-size: 14px;
    color: red;
    list-style-type: none;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 60px;
  color: #213c6a;
  cursor: pointer;
  text-decoration: none;
  
  &:active, &:hover {
    color: #b22d2f;
  }
`;

const ButtonContainer = styled.div`
    margin-bottom: ${({isCancelButton}) => isCancelButton ? "25px" : "0"};
`;

class Form extends Component {

    submitForm = (event) => {
        const { touched, submitForm } = this.props;
        event.preventDefault();
        submitForm(touched);
    };

    isButtonDisabled = () => {
        const { formData, errors, touched } = this.props;
        let isDisabled = false;
        let errorKeys = Object.keys(errors);

        for(let key in errorKeys) {
            if(errors[key]) {
                isDisabled = true
            }
        }

        if(Object.keys(omitBy(errors, isNil)).length > 0 || Object.keys(touched).length === 0 || Object.keys(touched).length < formData.inputFields.length) {
            isDisabled = true;
        }

        return isDisabled;
    };

    render() {
        const { formData, errors, touched, errorMessage, children, disableButton, dataTest } = this.props;

        return (
            <FormContainer>
                <StyledForm onSubmit={(e) => this.submitForm(e)} data-test={dataTest} id={dataTest}>
                    {formData.title ? <FormTitle>{formData.title}</FormTitle> : ""}
                    {
                        formData.inputFields ? formData.inputFields.map((item, index) => {
                            return (
                                <div key={index}>
                                    <CustomInput {...item} dataTest={`${dataTest}-${item.name}`} onChange={(e) => this.props.onChange(e)} value={touched[item.name] || ""} />
                                    {(errors[item.name] && !errorMessage) && <ul><ErrorMessage>{errors[item.name]}</ErrorMessage></ul>}
                                </div>
                            )
                        }) : ""
                    }
                    {children ? children : ""}
                    <ButtonContainer isCancelButton={formData.cancelButton}>
                        <Button type="submit" buttonId={formData.buttonId} data-test="submitButton" disabled={(disableButton || this.isButtonDisabled())}>{formData.buttonText}</Button>
                        {formData.cancelButton ? <Button type="button" cancelButton={true} cancel={true} onClick={this.props.cancelClick}>{formData.cancelButton}</Button> : ""}
                    </ButtonContainer>
                    <div>
                        {
                            formData.link && <StyledLink to={formData.link.to}>{formData.link.title}</StyledLink>
                        }
                    </div>
                </StyledForm>
            </FormContainer>
        )
    }
}

export default withValidations(Form);
