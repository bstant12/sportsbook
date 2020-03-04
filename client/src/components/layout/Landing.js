import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto">
            <h4>Welcome to SportsBook</h4>
            <p>A great place to make your bets </p>
            <br />
            <div className="col s6">
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
            <div className="col s6">
              <Link to="/login" className="btn btn-success">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;