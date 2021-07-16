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
    },
    profilePage: {
      posts: [
        {id: 1, message: "Good day, how are you?", likesCount: 10},
        {id: 2, message: "That is my first post", likesCount: 2},
        {id: 3, message: "New Post", likesCount: 11},
        {id: 4, message: "Yet another", likesCount: 11},
      ],
      newPostText: 'test text for a new post'
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('State changed');
  },
  addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: 0
    };

    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
}

export default store;