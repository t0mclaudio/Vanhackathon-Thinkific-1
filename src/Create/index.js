import React from 'react';
import Composer from './Composer';
import ComposerWrapper from './Composer/ComposerWrapper';
import Form from './Form';
import Canvas from './Canvas';
import Player from '../Components/Player';
import Questions from './Questions';
import ViewBtn from './ViewBtn';
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
    // To Refactor: Checks if duplipate entry in time
    if (questions.find(q => q.time === data.time)) {
      let i = questions.findIndex(q => q.time === data.time);
      questions[i] = data
    } else {
      questions.push(data)
    }

    // sorts the questions
    questions.sort((a,b) => {
      return a.time - b.time
    })
    this.setState({ questions: questions })
    this.closeComposer()
  }

  handleInsertClick(time) {
    this.openComposer()
  }

  reportElapsedSeconds(elapsed) {
    if (this.state.questions.find(q => q.time === elapsed)) {
      this.player.current.pause()
      this.player.current.seekTo(elapsed)
    }
  }

  handleViewVideo() {
    this.props.handleViewVideo(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <Canvas>
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
          {this.state.isInfoSet && this.state.questions.length > 0 ?
            <Link to="/view" 
              style={style.viewVideoBtn} 
              className="btn btn-success" 
              onClick={() => this.handleViewVideo()}><ViewBtn/></Link>  
          : "" }
        </Canvas>
        {this.state.isInfoSet ? <Questions state={this.state.questions} /> : ""}
      </React.Fragment>
    )
  }
}

const style = {
  viewVideoBtn : {
    position: 'absolute',
    top: '15px',
    right: '15px'

  }
}
