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

import React from 'react';
import PropTypes from 'prop-types';
import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';
import StudentListRow from './student_list_row';

// TODO: update for all props/states and styling needed for advisor panel.

class AdvisorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advisorName: 'Sebastian Cabrejos',
    };
  }

  render() {
    const { userInfo } = this.props;
    const searchAdvisees; // TODO: CREATE Search bar for advisees
    let displayed_advisees;
    if (this.props.displayedAdvisees != null) {
      // TODO: add mapping to show each advisor in list
      <StudentListRow
        selected_advisee={this.props.selected_advisee}
        displayAdvisee={this.props.displayAdvisee}
      />
    } else {
      displayed_advisees = <div className="empty-state"><h4> <p> No advisees added yet! </p> </h4></div>;
    } 

    // const displayStudentNames = () => {
    //   const names = [];
    //   const studentList = (this.props.displayed_advisees) ? this.props.displayed_advisees.owner : [];
    //   studentList.forEach(student => names.push(student.userFirstName + " " + student.userLastName));
    //   return names.join(', ');
    // };

    return (
      <div className="comment-forum no-print">
        <div className="cf-name">
          <h3 className="title"> Students </h3>
        </div>
        <div className="cf-header">{/* TODO: add search bar */}</div>
        <div className="comment-forum-container">
          {displayed_advisees}
        </div>
        <div className="as-header" />
      </div>
    );
  }
}

AdvisorPanel.defaultProps = {
  selected_advisee: null,
  displayed_advisees: null,
};

AdvisorPanel.propTypes = {
  userInfo: SemesterlyPropTypes.userInfo.isRequired,
  selected_advisee: PropTypes.string,
  displayed_advisees: PropTypes.arrayOf(PropTypes.string),
};

export default AdvisorPanel;
