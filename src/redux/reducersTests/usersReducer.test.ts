import usersReducer, {actions, initialStateType} from "../usersReducer";

let state: initialStateType

beforeEach(() => {
  state = {
    users: [
      {id: 0, name: 'Ilya', followed: false, status: "stat", photos: {small: null, large: null}},
      {id: 1, name: 'Maks', followed: true, status: "stat", photos: {small: null, large: null}},
      {id: 2, name: 'Oks', followed: false, status: "stat", photos: {small: null, large: null}},
      {id: 3, name: 'Katya', followed: true, status: "stat", photos: {small: null, large: null}}
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1452,
    isFetching: false,
    isFollowingInProgress: [],
    filter: {
      friend: null,
      term: ''
    }
  }
})

test("follow user", () => {
  const newState = usersReducer(state, actions.followSuccess(2))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeTruthy()
})

test("unfollow user", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[1].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})