import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from "react-router";

class RestrictedRoute extends Component {

    renderMergedProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return (
            React.createElement(component, finalProps)
        );
    };

    render() {
        const { component, ...rest } = this.props;
        const AuthToken = localStorage.getItem('AUTH_TOKEN');

        return (
            <Route {...rest} render={(props) => AuthToken ? (
                this.renderMergedProps(component, props)
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            )} />
        )
    }
}

RestrictedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default withRouter(RestrictedRoute);
