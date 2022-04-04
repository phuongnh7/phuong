import React, { Component } from 'react';
import './SendMessage.scss';
import splitMessage from '../logic/TwitMessage';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', orgMessage: '', partMessages: [], error: '' };
    this.inputMessage = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value, orgMessage: '', partMessages: [], error: '' });
  }

  handleClick = () => {
    let orgMessage = this.state.message;

    try {
      let partMessages = splitMessage(orgMessage);
      this.setState({ message: '', orgMessage: orgMessage, partMessages: partMessages });
    } catch (error) {
      this.setState({ orgMessage: orgMessage, error: error.message });
      this.inputMessage.current.focus();
    }
  };

  returnInputMessage = () => {
    return (
      <div>
        <div className="row">
          Please input a message.
          <ul>
            <li>If a user's input is less than or equal to 50 characters, post it as is.</li>
            <li>If a user's input is greater than 50 characters, split it into chunks that each is less than or equal to 50 characters and post each chunk as a separate message       </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="message">Message</label>
          </div>
          <div className="col-75">
            <textarea ref={this.inputMessage} className={this.state.error ? 'error' : ''} id="message" name="message" value={this.state.message} onChange={this.handleChange}></textarea>
            <span className="error">{this.state.error}</span>
          </div>
        </div>
        <div className="row">
          <button disabled={this.state.message === '' ? true : false} id="sendBtn" onClick={this.handleClick}>Send</button>
        </div>
      </div>
    )
  }

  renderOrgMessage = () => {
    if (!this.state.error && this.state.orgMessage) {

      return (
        <div className="org-message-container">
          <div>
            <b>Inputed Message:</b>
          </div>
          <div className="org-message" >
            {this.state.orgMessage}
          </div>
        </div>
      )
    }
  }

  renderPostMessage = () => {
    if (this.state.error) {
      return;//
    }
    else if (this.state.partMessages.length === 1) {
      return (
        <div className="post-message row">
          Short message, post it as is.
        </div>
      )
    }
    else if (this.state.partMessages.length > 1) {
      return (
        <div className="post-message row">
          Message is split it into chunks:
          <ul>
            {this.state.partMessages.map((partMessage, index) => (
              <li key={partMessage}>
                {partMessage}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        {this.returnInputMessage()}
        {this.renderOrgMessage()}
        {this.renderPostMessage()}
      </div>
    );
  }
}

export default SendMessage;