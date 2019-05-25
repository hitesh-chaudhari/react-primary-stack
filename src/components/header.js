import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import Logo from "../images/tudip-logo.png";

import Calls from "../apis/calls";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 2px 8px 0 rgba(184, 184, 184, 0.5);
    z-index: 111;
`;

const LogoContainer = styled.div`
    cursor: pointer;
`;

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: white;
    max-width: 1180px;
    display: flex;
    align-items: center;
    justify-content: ${({isLoggedIn}) => isLoggedIn ? "space-between" : "center"};
    height: 80px;
    padding: 0 20px;
`;

const Icon = styled.button`
    border: none;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
    
    i {
        color: #213c6a;
    }
    
    &:active, &:focus {
        outline: none;
    }
`;

export class Header extends Component {

    onLogout = () => {
        const { history } = this.props;
        Calls.logout().then((response) => {
            this.setState({response});
            if(response) {
                localStorage.removeItem("AUTH_TOKEN");
                history.push('/');
            }
        }).catch((error) => {
            throw new Error("Unrecognized error");
        });
    };

    handleNavigation = () => {
        this.props.history.push('/books');
    };

    renderHeaderWhileLogout = (isLoggedIn) => {
        return (
            <Container isLoggedIn={isLoggedIn} data-test="headerComponent">
                <img data-test="logoImage" src={Logo} alt="logo" />
            </Container>
        )
    };

    renderHeaderWithLogin = (isLoggedIn) => {
        return (
            <HeaderWrapper data-test="headerComponent">
                <Container isLoggedIn={isLoggedIn}>
                    <LogoContainer data-test="logoContainer" onClick={this.handleNavigation}>
                        <img data-test="logoImage" src={Logo} alt="logo" />
                    </LogoContainer>
                    <div>
                        <Icon data-test="logoutLink" onClick={this.onLogout} title="Logout">
                            <i className="fa fa-power-off" aria-hidden="true" />
                        </Icon>
                    </div>
                </Container>
            </HeaderWrapper>
        )
    };

    render() {
        const isLoggedIn = localStorage.getItem('AUTH_TOKEN');
        return isLoggedIn ? this.renderHeaderWithLogin(isLoggedIn) : this.renderHeaderWhileLogout(isLoggedIn);
    }
}

export default withRouter(Header);