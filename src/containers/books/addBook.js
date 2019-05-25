import React, { Component } from "react";
import styled, { css } from "styled-components";
import { pullAt } from "lodash";

import Form from "../../components/form";
import CustomInput from "../../components/input";
import Button from "../../components/button";

const ButtonContainer = styled.div`
    width: 100%;
    text-align: right;
    padding: 0 20px 20px;
    
    button {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
        margin-right: 5px;
    }
`;

const FormContainer = styled.div`
    width: 100%;
    padding: 100px 0 0;
    max-width: 600px;
    margin: auto;
`;

const InputContainer = styled.div`
    display: inline-block;
    width: ${({buttonContainer}) => buttonContainer ? "10%" : "45%"};
    > div {
        padding: 10px;
    }
    
    input {
        margin-top: 0;    
    }
    
    ${({buttonContainer}) => buttonContainer && css`
        padding: 10px 0;
        vertical-align: middle;
    `}
    
    button {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
    }
`;

const InputLabel = styled.label`
    font-size: 15px;
    font-weight: 500;
`;

const TitleContainer = styled.div`
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;  
`;

const CustomForm = styled.div`
    padding: 10px 20px 10px 10px;
`;

class AddBook extends Component {
    constructor(props) {
        super();
        this.state = {
            annotations: (props.values && props.values.annotations) ? props.values.annotations : [{
                text: "",
                page: ""
            }]
        }
    }

    onChange = (event, index) => {
        const { annotations } = this.state;
        const name = event.target.name;
        annotations[index][name] = event.target.value;
        this.setState({annotations});
    };

    addAnnotation = () => {
        this.setState({
            annotations: [
                ...this.state.annotations,
                {
                    text: "",
                    page: ""
                }
            ]
        })
    };

    removeAnnotation = (e, index) => {
        const { annotations } = this.state;
        pullAt(annotations, index);
        this.setState({ annotations });
    };

    submit = (data) => {
        const { annotations } = this.state;
        const updatedAnnotations = annotations.filter((item) => item.text !== "" && item.page !== "");

        const addBookData = {...data, annotations: updatedAnnotations};
        this.props.submitForm(addBookData);
    };

    render() {
        const { annotations } = this.state;
        const { values, formData, cancelClick, disableButton, dataTest } = this.props;

        return (
            <FormContainer>
                <Form
                    formData={formData}
                    values={values || null}
                    submitForm={this.submit}
                    cancelClick={cancelClick}
                    disableButton={disableButton}
                    dataTest={dataTest}
                >
                    <TitleContainer>
                        <InputLabel>Annotations</InputLabel>
                    </TitleContainer>
                    {
                        annotations.map((item, index) => {
                            return (
                                <CustomForm key={index}>
                                    <InputContainer>
                                        <CustomInput
                                            type="text"
                                            onChange={(e) => this.onChange(e, index)}
                                            name="text"
                                            value={item.text}
                                            placeholder="Text"
                                            dataTest={`${dataTest}-text`}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <CustomInput
                                            type="number"
                                            onChange={(e) => this.onChange(e, index)}
                                            name="page"
                                            value={item.page}
                                            placeholder="Page"
                                            dataTest={`${dataTest}-page`}
                                        />
                                    </InputContainer>
                                    <InputContainer buttonContainer>
                                        <Button type="button" onClick={(e) => this.removeAnnotation(e, index)}>-</Button>
                                    </InputContainer>
                                </CustomForm>
                            )
                        })
                    }
                    <ButtonContainer>
                        <Button type="button" onClick={this.addAnnotation}>+</Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        )
    }
}

export default AddBook;