import React, { Component } from 'react'
import './Chat.css'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const allMessages = gql`
  query allMessages($conversationId: ID!) {
    allMessages(filter: {
      conversation: {
        id: $conversationId
      }
    })
    {
      id
      text
      createdAt
      agent {
        id
        slackUserName
        imageUrl
      }
    }
  }
`

class Chat extends Component {

  state = {
    message: '',
  }

  render() {

    if (this.props.allMessagesQuery.loading) {
      return (
        <div
          className='loading-container'
        >
          <div
            style={{backgroundColor: this.props.mainColor || 'rgba(0,0,0,.5)'}}
            className='loading' />
        </div>
      )
    }

    return (
      <Dropzone
        className='dropzone relative'
        onDrop={this._onFileDrop}
        accept='image/*'
        multiple={false}
        disableClick={true}
      >
        <div className='message-body chat-container'>
          <ChatMessages
            messages={this.props.allMessagesQuery.allMessages || []}
            userSpeechBubbleColor={this.props.mainColor}
            profileImageURL={this.props.profileImageURL}
          />
          {this.state.isUploadingImage && <div className='upload-image-indicator'>Uploading image ...</div>}
          <ChatInput
            message={this.state.message}
            onTextInput={message => this.setState({message})}
            onResetText={() => this.setState({message: ''})}
            onSend={this._onSend}
            onDrop={this._onFileDrop}
          />
        </div>
      </Dropzone>
    )
  }

  _onSend = () => {

  }

  _onFileDrop = (acceptedFiles, rejectedFiles) => {

  }

}

export default graphql(allMessages, { name: 'allMessagesQuery' })(Chat)
