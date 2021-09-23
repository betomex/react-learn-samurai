import React from "react";
import {createField, Input, Textarea} from "../../common/FormElements/FormElements";
import {InjectedFormProps, reduxForm} from "redux-form";
import {profileType} from "../../../types/types";

type ownPropsType = {
  userProfile: profileType
}
type profileDataTypeKeys = keyof profileType

const ProfileDataForm: React.FC<InjectedFormProps<profileType, ownPropsType> & ownPropsType> =
    ({userProfile, handleSubmit, error}) => {
      return <form onSubmit={handleSubmit}>
        <div>
          <button>Save</button>
        </div>
        {error && <div className="form-summary-error">{error}</div>}
        <div>
          <b>Full name:</b> {createField<profileDataTypeKeys>("Full Name", "fullName", [], Input)}
        </div>
        <div>
          <b>Looking for a
            job:</b> {createField<profileDataTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
          <b>Description:</b> {createField<profileDataTypeKeys>("Write about yourself...", "lookingForAJobDescription", [], Textarea)}
        </div>
        <b>Contacts: </b> {Object.keys(userProfile.contacts)
          .map(key => <div className="contact" key={key}>
            <b>{key} :</b> {createField(key, "contacts." + key, [], Input)}
          </div>)}
      </form>
    }

export const ProfileDataReduxForm = reduxForm<profileType, ownPropsType>({
  form: "profileUpdateForm"
})(ProfileDataForm);