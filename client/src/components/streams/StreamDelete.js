import React from 'react';
import {connect } from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../../history';

import Modal from '../modal';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDeleteClick = () => {
      this.props.deleteStream(this.props.match.params.id)
  }

renderActions(){
  return (
    <React.Fragment>
     <button onClick={this.onDeleteClick} className="ui button negative">Delete</button>
     <Link to={`/`}className="ui button">Cancel</Link>
    </React.Fragment>
    );
}

renderContent() {
  if(!this.props.stream){
    return 'Are you sure ?'
  }
  return `Do you want delete ${this.props.stream.title}`
}

  render() {
    return (
    <div>
      StreamDelete
      <Modal
      title="delete stream"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/')}
      />
    </div>
    );
  }


}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
