const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
  _state: {
    dialogsPage: {
      dialogs: [
        {id: 1, name: "Ilya"},
        {id: 2, name: "Makson"},
        {id: 3, name: "Oks"},
        {id: 4, name: "Ekaterina"},
        {id: 5, name: "Andrey"},
      ],
      messages: [
        {id: 1, message: "What a nice day today"},
        {id: 2, message: "It's the best way to relax"},
        {id: 3, message: "What do you think about going for a walk?"},
      ],
      newMessageText : "",
    },
    profilePage: {
      posts: [
        {id: 1, message: "Good day, how are you?", likesCount: 10},
        {id: 2, message: "That is my first post", likesCount: 2},
        {id: 3, message: "New Post", likesCount: 11},
        {id: 4, message: "Yet another", likesCount: 11},
      ],
      newPostText: 'test text for a new post',
    }
  },
  _callSubscriber() {
    console.log('State changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };

      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state);
    }
    else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newPText;
      this._callSubscriber(this._state);
    }
    else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
      this._state.dialogsPage.newMessageText = action.newMText;
      this._callSubscriber(this._state);
    }
    else if (action.type === SEND_MESSAGE) {
      let messageText = this._state.dialogsPage.newMessageText;
      this._state.dialogsPage.newMessageText = '';
      this._state.dialogsPage.messages.push({id: 4, message: messageText});
      this._callSubscriber(this._state);
    }
  },
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newPText: text})

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMText: text})

export default store;