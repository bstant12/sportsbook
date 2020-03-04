import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Axios from 'axios';
import Body from './Body';

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        
        return (
            
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-text">
                    <h3 className="text-body"><b>Welcome,</b> {user.name.split(" ")[0]}</h3>
                    </span>  
                    <button onClick={this.onLogoutClick} className="btn btn-primary">Logout</button>
                </nav>
                <div >
                    <Body />
                </div>
            </div> 
        );
    }
}



Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);