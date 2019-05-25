import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { Switch, Route } from "react-router";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./containers/login.js";
import Register from "./containers/register";
import Dashboard from "./containers/dashboard";
import RestrictedRoute from "./components/restrictedRoute";
import Header from "./components/header";

const RoutesWrapper = styled.div`
    margin: 0 0 30px;
`;

const CustomToastContainer = styled(ToastContainer)`    
    .Toastify__toast--error {
        background: #fdd9d7;
        
        .Toastify__toast-body, .Toastify__close-button {
            color: #7f231c;
        }
    }
    
    .Toastify__toast--success  {
        background: #daefdc;
        
        .Toastify__toast-body, .Toastify__close-button {
            color: #285b2a;
        }
    }
`;

const App = () => {
    return (
        <div className="App">
            <Router>
                <div>
                    <Header />
                    <RoutesWrapper>
                      <Switch>
                          <Route path="/register" component={Register} />
                          <RestrictedRoute path="/books" component={Dashboard} />
                          <Route path="/" component={Login} />
                      </Switch>
                    </RoutesWrapper>
                </div>
            </Router>
            <CustomToastContainer hideProgressBar={true} removeCloseButton={true} />
        </div>
    );
};

export default App;
