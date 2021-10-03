import {useSelector} from "react-redux";
import React from "react";
import '../common/Preloader/Preloader.css';
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/usersSelectors";
import { Users } from "./Users";

type propsType = {
  pageTitle: string
}

export const UsersPage: React.FC<propsType> = (props) => {
  const isFetching = useSelector(getIsFetching)

  return <>
    <h2>{props.pageTitle}</h2>
    {isFetching ? <Preloader/> : null}
    <Users/>
  </>
}