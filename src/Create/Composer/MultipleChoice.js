import React from 'react';

export default class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      choice: "",
      choices: [],
      time: props.time.time,
      elapsed: props.time.elapsed,
      type: 'multiple choice'
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  handleSubmit() {
    this.props.handleSubmit(this.state)
  }

  handleChoiceSubmit(e) {
    e.preventDefault()
    let choices = this.state.choices
    let choice = this.state.choice
    choices.push(choice)
    this.setState({ choices: choices, choice: "" })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="question">Please enter your question</label>
          <textarea id="question" className="form-control" name="question" value={this.state.question} onChange={e => this.handleChange(e)} />
        </div>
        <div className="form-group">
          <label htmlFor="answer">What is the correct answer?</label>
          <input id="answer" className="form-control" type="text" name="answer" value={this.state.answer} onChange={e => this.handleChange(e)} />
        </div>
        <form class="form-inline" onSubmit={e => this.handleChoiceSubmit(e)}>
          <div className="form-group">
            <input id="choice" name="choice" onChange={e => this.handleChange(e)} value={this.state.choice} className="form-control" />
            <input type="submit" value="Add to choices" className="btn btn-primary" />
          </div>
        </form>
        <div>{
          this.state.choices.map(choice => {
            return (
              <div key={choice} style={style.choice}>
                {choice}
              </div>
            )
          })
        }</div>

        <button onClick={e => this.handleSubmit(e)} className="btn btn-warning">Submit</button>

      </div >
    )
  }
}

const style = {
  choice : {
    padding: '10px', 
    border: '1px solid gray', 
    margin: '10px 0',
    borderRadius: '4px',
    fontSize: '18px'
  }
}