import React, {Component} from 'react';
import flv from 'flv.js';
import { connect} from 'react-redux'

import { fetchStream} from '../../actions';

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);

    this.buildPlayer();

  }
  componentDidUpdate(prevProps, prevState) {
    this.buildPlayer();
  }

  componentWillUpdate(nextProps, nextState) {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render(){
    if(!this.props.stream){
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <video ref={this.videoRef} style={{width: '100%'}} controls />
        <h1>{this.props.stream.title}</h1>
        <h2>{this.props.stream.description}</h2>
      </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps ,{ fetchStream})(StreamShow);
