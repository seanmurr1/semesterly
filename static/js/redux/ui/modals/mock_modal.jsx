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
import * as SemesterlyPropTypes from '../../constants/semesterlyPropTypes';

class MockModal extends React.Component {
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

  render() {
    const modalHeader =
      (<div className="modal-content">
        <div className="modal-header">
          <h1>Mock Modal!</h1>
        </div>
      </div>);
    const modalStyle = {
      width: '100%',
    };

    return (
      <Modal
        ref={(c) => { this.modal = c; }}
        className="mock-modal abnb-modal max-modal"
        modalStyle={modalStyle}
        onHide={() => {
          this.props.toggleMockModal();
          history.replaceState({}, 'Semester.ly', '/');
        }}
      >
        {modalHeader}

        <div className="mock-modal__container">
          <br />
          <h3>First Name: {this.props.mockUserInfo.first_name}</h3>
          <h3>Last Name: {this.props.mockUserInfo.last_name}</h3>
          <h3>Graduating class: {this.props.mockUserInfo.class_year}</h3>
          <br />
        </div>
      </Modal>
    );
  }
}

MockModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleMockModal: PropTypes.func.isRequired,
  mockUserInfo: SemesterlyPropTypes.mockUserInfo.isRequired,
  userInfo: SemesterlyPropTypes.userInfo.isRequired,
};

export default MockModal;

