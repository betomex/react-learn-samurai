import {followAPI} from "../../api/followAPI";
import {responseType, resultCodeEnum} from "../../api/api";
import { postFollow } from "../usersReducer";

jest.mock("../../api/followAPI")
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>

const result: responseType = {
  resultCode: resultCodeEnum.Success,
  messages: [],
  data: {}
}

followAPIMock.postFollow.mockReturnValue(Promise.resolve(result))

/*
test("follow thunk", async () => {
  const thunk = follow(1)
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})
*/
