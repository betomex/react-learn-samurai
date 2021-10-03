import {Field, Formik} from "formik";
import React from "react";
import {filterType} from "../../redux/usersReducer";

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type propsType = {
  onFilterChange: (filter: filterType) => void
}
type formType = {
  term: string
  friend: "true" | "false" | "null"
}

export const UsersSearchForm: React.FC<propsType> = React.memo(({onFilterChange}) => {
  const submit = (values: formType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: filterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    onFilterChange(filter)
  }

  return <Formik
    initialValues={{term: '', friend: "null"}}
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