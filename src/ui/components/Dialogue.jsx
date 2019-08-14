
import React, { Component } from 'react';

import { ChatPost, ChatInput } from './ChatComponents';
import '../styles/index.scss';

class Dialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // create thread post from chat input
  postThread = async () => {
    const { activeTopic, postMsg, updateThreadError, handleFormChange } = this.props;
    try {
      await activeTopic.post(postMsg);
      handleFormChange(null, 'postMsg');
    } catch (error) {
      updateThreadError(error);
    }
  }

  // delete your own post from a thread
  deletePost = async (postId) => {
    const { activeTopic, updateThreadPosts, updateThreadError } = this.props;
    try {
      await activeTopic.deletePost(postId);
      updateThreadPosts();
    } catch (error) {
      updateThreadError(error);
    }
  }

  render() {
    const {
      topicTitle,
      threadData,
      openTopics,
      handleFormChange,
      myAddress,
      myProfile,
      myDid,
      postMsg,
    } = this.props;
    const isMembersOnly = openTopics[topicTitle] && openTopics[topicTitle]._members;

    return (
      <section className="chatPage_dialogue">
        {topicTitle && (
          <div className="chatPage_dialogue_header">
            <h3>{topicTitle}</h3>
            <p>{isMembersOnly ? 'Members only' : 'Open'}</p>
          </div>
        )}

        <div className="chatPage_dialogue_posts">
          {!!threadData.length && threadData.map(post => (
            <ChatPost
              deletePost={this.deletePost}
              post={post}
              myDid={myDid}
              key={post.postId}
            />
          ))}
        </div>

        {topicTitle && (
          <ChatInput
            postThread={this.postThread}
            handleFormChange={handleFormChange}
            myAddress={myAddress}
            myProfile={myProfile}
            postMsg={postMsg}
          />
        )}
      </section>
    );
  }
}

export default Dialogue;