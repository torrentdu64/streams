import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchStreams} from '../../actions';

class StreamList extends Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderDetail() {
    return this.props.streams.map( stream => {
        return (
          <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
            <i className="large middle aligned icon camera" />
              <div className="content">
                  <Link to={`/streams/${stream.id}`} className="header" >
                    {stream.title}
                  </Link>
                <div className="description">{stream.description}</div>
              </div>
          </div>
          );
    });
  }

  renderAdmin(stream){
    if(stream.userId === this.props.currentUserId){
      return (
        <div className="right floated content">
        <Link className="ui button primary" to={`/streams/edit/${stream.id}`} >Edit</Link>
        <Link className="ui button negative" to={`/streams/delete/${stream.id}`} >Delete</Link>
        </div>
      );
    }

  }


  renderCreate(){
    if(this.props.isSignedIn){
      return (
        <div style={ {textAlign: "right"}}>
          <Link to="/streams/new" className="ui button primary">
            create
          </Link>
        </div>
        );
    }
  }

  render() {

    return (
      <div>
        <h2> List</h2>
        <div className="ui celled list">
          {this.renderDetail()}
        </div>
        {this.renderCreate()}
      </div>

    );
  }

}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps , {fetchStreams})(StreamList);
