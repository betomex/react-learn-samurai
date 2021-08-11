const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
  users: [
    {
      id: 1,
      fullName: 'Ilya',
      status: 'intoxicating, is not it?',
      followed: true,
      avatarUrl: 'https://sun9-79.userapi.com/impg/GvdIERgy93gHCLF_6jBhI1BCxDmMqQ9P6gYZ8A/t21FX9ZYsgg.jpg?size=2160x2160&quality=96&sign=a0a8a26ee2bea6cb55453e58f671ee06&type=album',
      location: {country: 'Russia', city: 'Krasnodar'}
    },
    {
      id: 2,
      fullName: 'Makson',
      status: 'croc is my life',
      followed: false,
      avatarUrl: 'https://sun9-79.userapi.com/impg/GvdIERgy93gHCLF_6jBhI1BCxDmMqQ9P6gYZ8A/t21FX9ZYsgg.jpg?size=2160x2160&quality=96&sign=a0a8a26ee2bea6cb55453e58f671ee06&type=album',
      location: {country: 'Russia', city: 'Krasnodar'}
    },
    {
      id: 3,
      fullName: 'Oks',
      status: 'i am proud of my boyfriend',
      followed: true,
      avatarUrl: 'https://sun9-79.userapi.com/impg/GvdIERgy93gHCLF_6jBhI1BCxDmMqQ9P6gYZ8A/t21FX9ZYsgg.jpg?size=2160x2160&quality=96&sign=a0a8a26ee2bea6cb55453e58f671ee06&type=album',
      location: {country: 'Russia', city: 'Krasnodar'}
    },
  ]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return {...u, followed: true}
          }
          return u;
        })
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return {...u, followed: false}
          }
          return u;
        })
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, action.users]
      }
    }
    default:
      return state;
  }
}

export const followAC = (userID) => ({type: FOLLOW, userID})

export const unfollowAC = (userID) => ({type: UNFOLLOW, userID})

export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer;