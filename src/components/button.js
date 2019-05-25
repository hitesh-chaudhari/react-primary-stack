import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background-color: #213c6a;
  border: 1px solid #213c6a;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1.428571429;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  
  @media (max-width: 800px) {
    width: auto;
    padding: 10px 20px;
  }
  
  &:focus, &:active, &:hover {
    outline: none;
  }
  
  ${({disabled}) => disabled && css`
    cursor: not-allowed !important;
    opacity: 0.5;
  `}
  
  ${({cancelButton}) => cancelButton && css`
    margin-left: 20px;
  `}
  
  ${({ cancel }) => cancel && css`
    background-color: #8388a4;
    border: 1px solid #8388a4;
  `}
`;

const Button = ({children, dataTest, buttonId, ...rest}) => (
    <StyledButton data-test={dataTest} id={buttonId} {...rest}>{children}</StyledButton>
);

export default Button;
