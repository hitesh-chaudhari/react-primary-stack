import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
    width: 100%;
    padding: 0 20px 20px;
    text-align: left;
    position: relative;
    
    i {
        position: absolute;
        left: 20px;
        top: 44px;
        z-index: 1;
        color: #6d6c6c;
    }
`;

const InputLabel = styled.label`
    font-size: 15px;
    font-weight: 500;
`;

const CustomInput = styled.input`
    width: 100%;
    padding: ${({showIcon}) => showIcon ? "13px 13px 13px 30px" : "13px"};
    border-radius: 4px;
    background-color: #ffffff;
    border: 1px solid #cdcbcb;
    font-size: 14px;
    letter-spacing: 0px;
    color: #6d6c6c;
    margin-top: 10px;
    position: relative;
    
    &:hover, &:focus, &:active {
        outline: none;
    }
    
    ::placeholder {
        color: #6d6c6c;
        opacity: 1;
    }
    
    :-ms-input-placeholder {
        color: #6d6c6c;
    }
    
    ::-ms-input-placeholder {
        color: #6d6c6c;
    }
`;

const CustomInputField = ({type, name, labelText, iconClass, dataTest,  ...rest}) => {
    return (
        <InputContainer>
            {labelText ? <InputLabel htmlFor={name}>{labelText}</InputLabel> : ""}
            {iconClass ? <i className={iconClass} aria-hidden="true" /> : ""}
            <CustomInput type={type} id={name} name={name} {...rest} showIcon={iconClass} data-test={dataTest} />
        </InputContainer>
    )
};

export default CustomInputField;