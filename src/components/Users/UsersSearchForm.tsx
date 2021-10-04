import {Field, Formik} from "formik";
import React from "react";
import {filterType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/selectors/usersSelectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type propsType = {
  onFilterChange: (filter: filterType) => void
}
type friendFormType = "true" | "false" | "null";
type formType = {
  term: string
  friend: friendFormType
}

export const UsersSearchForm: React.FC<propsType> = React.memo(({onFilterChange}) => {
  const filter = useSelector(getUsersFilter)

  const submit = (values: formType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: filterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true"
    }
    onFilterChange(filter)
  }

  return <Formik
    enableReinitialize
    initialValues={{term: filter.term, friend: String(filter.friend) as friendFormType}}
    validate={usersSearchFormValidate}
    onSubmit={submit}
  >
    {({handleSubmit, isSubmitting}) => (
      <form onSubmit={handleSubmit}>
        <Field type={"text"} name={"term"}/>
        <Field name={"friend"} as={"select"}>
          <option value="null">All</option>
          <option value="true">Friends</option>
          <option value="false">Strangers</option>
        </Field>
        <button type="submit">
          Search
        </button>
      </form>
    )}
  </Formik>
})