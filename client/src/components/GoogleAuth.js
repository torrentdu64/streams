import React, {Component} from 'react';
import {connect} from 'react-redux';

import {signOut, signIn} from '../actions';

class GoogleAuth extends Component {



  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '499274059397-0q062qt4gom5q88k8ug7a42t9417ntsq.apps.googleusercontent.com',
        scope: 'email'
      }).then(() =>{
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }else if(this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui google red button">
        <i className="google icon"></i>
        Sign out
        </button>
        );
    }else{
      return (
        <button onClick={this.onSignInClick} className="ui google green button">
        <i className="google icon"></i>
        Sign In
        </button>
        );
    }

  }

  render(){
    return (
      <div>{this.renderAuthButton()}</div>
      );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps,  {signOut, signIn})(GoogleAuth);
