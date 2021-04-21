/*
Copyright (C) 2017 Semester.ly Technologies, LLC

Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'boron/WaveModal';
import {getTranscriptCommentsBySemester} from "../../constants/endpoints";
import Cookie from "js-cookie";

class AddAdvisorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jhed: '',
      first_name: '',
      last_name: '',
    };
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }

  componentDidUpdate() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }

  sendJHED(event) {
    this.setState({jhed: event.target.value});
  }

  sendFirstName(event) {
    this.setState({first_name: event.target.value});
  }

  sendLastName(event) {
    this.setState({last_name: event.target.value});
  }

  submitContent(semesterName, semesterYear) {
    if (this.state.comment !== '') {
      fetch(getTranscriptCommentsBySemester(semesterName, semesterYear), {
        method: 'POST',
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken'),
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jhed: this.props.userInfo.jhed,
          timestamp: new Date(Date.now()),
          content: this.state.comment,
        })
      })
        .then(() => this.setState({comment: this.state.comment = '', submitted: !this.state.submitted}));
    }
  }

  render() {
    const { jhed, first_name, last_name } = this.state;

    const modalHeader =
      (<div className="modal-content">
        <div className="modal-header">
          <h1>Add New Advisors</h1>
          <div className="modal-close" onClick={() => this.modal.hide()}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>);
    const modalStyle = {
      width: '100%',
    };
    return (
      <Modal
        ref={(c) => {
          this.modal = c;
        }}
        className="SIS-import-data-modal abnb-modal max-modal"
        modalStyle={modalStyle}
        onHide={() => {
          this.props.toggleAddAdvisorModal();
        }}
      >
        {modalHeader}
        <p><br/></p>
        <form action="#1">
          <textarea
            className="cf-input"
            rows="1" placeholder="Enter Advisor JHED"
            value={jhed}
            onChange={event => this.sendJHED(event)}
          />
          <textarea
            className="cf-input"
            rows="1" placeholder="Enter Advisor First Name"
            value={first_name}
            onChange={event => this.sendFirstName(event)}
          />
          <textarea
            className="cf-input"
            rows="1" placeholder="Enter Advisor Last Name"
            value={last_name}
            onChange={event => this.sendLastName(event)}
          />
          <p><br/></p>
          <input
            className="send-btn"
            type="submit"
            value="Send Info"
          />
        </form>
      </Modal>
    );
  }
}

AddAdvisorModal.propTypes = {
  toggleAddAdvisorModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default AddAdvisorModal;

