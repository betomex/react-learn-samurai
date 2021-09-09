import React from "react";
import {createField, Input, Textarea} from "../../common/FormElements/FormElements";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({userProfile, handleSubmit, error}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <button>Save</button>
    </div>
    {error && <div className="form-summary-error">{error}</div>}
    <div>
      <b>Full name:</b> {createField("Full Name", "fullName", [], Input)}
    </div>
    <div>
      <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
    </div>
    <div>
      <b>Description:</b> {createField("Write about yourself...", "lookingForAJobDescription", [], Textarea)}
    </div>
    <b>Contacts: </b> {Object.keys(userProfile.contacts)
    .map(key => <div className="contact" key={key}>
      <b>{key} :</b> {createField(key, "contacts." + key, [], Input)}
    </div>)}
  </form>
}

const ProfileDataReduxForm = reduxForm({
  form: "profileUpdateForm"
})(ProfileDataForm);

export default ProfileDataReduxForm;