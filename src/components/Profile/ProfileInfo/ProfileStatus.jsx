import React from 'react';
import './ProfileInfo.css';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.putStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        {!this.state.editMode
          ? <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || "Hello World"}</span>
          </div>
          : <div>
            <input type="text" autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}
                   onChange={this.onStatusChange}/>
          </div>
        }
      </div>
    );
  }
}

export default ProfileStatus;