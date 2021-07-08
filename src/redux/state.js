let rerenderUI = () => {

}

let state = {
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
}

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0
  };

  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderUI(state);
}

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderUI(state);
}

export const subscribe = (observer) => {
  rerenderUI = observer;
}

export default state;