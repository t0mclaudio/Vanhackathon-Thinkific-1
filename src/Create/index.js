import React from 'react';
import Composer from './Composer';
import ComposerWrapper from './Composer/ComposerWrapper';
import Form from './Form';
import Canvas from './Canvas';
import Player from '../Components/Player';
import Questions from './Questions';
import { Link } from 'react-router-dom';


export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      isInfoSet: false,
      isComposing: false,
      time: {},
      activeInModal: 'A',
      questions: [],
      stamps: []
    }
    this.player = React.createRef();
  }

  handleInfoSubmit(info) {
    this.setState({ info: info, isInfoSet: true })
  }

  openComposer() {
    this.player.current.pause();
    this.setState({
      isComposing: true,
      time: this.player.current.reportTime()
    })
  }

  closeComposer() {
    this.setState({ isComposing: false, activeInModal: 'A' })
  }

  updateModalModule(id) {
    this.setState({ activeInModal: id })
  }

  handleSubmit(data) {
    let questions = this.state.questions;
    questions.push(data)
    let stamps = new Array() 
    questions.map(q => {
      console.log(q)
      stamps.push(q.time)
    })
    stamps.sort()
    this.setState({ questions: questions, stamps:stamps })
    this.closeComposer()
  }

  handleInsertClick(time) {
    this.openComposer()
  }

  reportElapsedSeconds(elapsed) {
    if (this.state.stamps.includes(elapsed)) {
      this.player.current.pause()
      this.player.current.seekTo(elapsed) // go to next second
    }
  }

  handleViewVideo() {
    this.props.handleViewVideo(this.state)
  }

  render() {
    return (
      <div className="row mt-3" style={{ width: '990px' }}>
        <Canvas>
          <div style={{ backgroundColor: '#222f3e' }}>
            {this.state.isComposing ?
              <ComposerWrapper
                state={this.state}
                closeComposer={() => this.closeComposer()}
                updateModalModule={(id) => this.updateModalModule(id)}>
                <Composer
                  state={this.state}
                  updateModalModule={(id) => this.updateModalModule(id)}
                  handleSubmit={data => this.handleSubmit(data)} />
              </ComposerWrapper>
              : ""}
            {this.state.isInfoSet ?
              <Player
                info={this.state.info}
                ref={this.player}
                allowInsert={true}
                reportElapsedTime={(e) => this.reportElapsedSeconds(e)}
                handleInsertClick={time => this.handleInsertClick(time)}
              /> :
              <Form handleInfoSubmit={info => this.handleInfoSubmit(info)} />
            }
          </div>
          {this.state.isInfoSet ? <h2>{this.state.info.title}</h2> : "" }
          {this.state.isInfoSet && this.state.stamps.length > 0 ?
          <Link to="/view" className="btn btn-success" onClick={() => this.handleViewVideo()} >View video</Link>  
          : "" }
        </Canvas>
        {this.state.isInfoSet ? <Questions state={this.state.questions} /> : ""}

      </div>
    )
  }
}
