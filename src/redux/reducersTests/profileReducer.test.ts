import profileReducer, {actions} from "../profileReducer";

let state = {
  posts: [
    {id: 1, message: "Good day, how are you?", likesCount: 10},
    {id: 2, message: "That is my first post", likesCount: 2},
    {id: 3, message: "New Post", likesCount: 11},
    {id: 4, message: "Yet another", likesCount: 11},
  ],
  userProfile: null,
  status: ""
};

it('increasing count of posts after adding a new one', () => {
  let action = actions.addPostActionCreator("testText");
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(5);
});

it('newState corresponding data', function () {
  let action = actions.addPostActionCreator("testText");
  let newState = profileReducer(state, action);

  expect(newState.posts[4].message).toBe("testText");
  expect(newState.posts[4].likesCount).toBe(0);
});

it('decreasing count of posts after deleting', () => {
  let action = actions.deletePost(1);
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it('dont change count of posts after deleting the post with wrong id', () => {
  let action = actions.deletePost(1000);
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});