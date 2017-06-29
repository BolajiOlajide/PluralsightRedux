//This Component handles the template used on every page.
import React from "react";
import PropTypes from "prop-types";
import Header from "../common/Header";
import {connect} from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
};

export default connect(mapStateToProps)(App);
