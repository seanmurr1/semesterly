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
import AdvisorDashboardContainer from './containers/advisor_dashboard_container';
// TODO: Use student list row -> import StudentListRow from './student_list_row';

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
    let transcript;
    if (this.props.displayedAdvisees != null) {
      
    } else {
      transcript = <div className="empty-state"><h4> <p> No advisees added yet! </p> </h4></div>;
    } 

    const displayInput = (this.props.selected_advisee === null) ? null : (
      <StudentListRow
        semester_name={this.props.selected_semester.toString().split(' ')[0]}
        semester_year={this.props.selected_semester.toString().split(' ')[1]}
      />
    );

    const displayStudentNames = () => {
      const names = [];
      const studentList = (this.props.transcript) ? this.props.transcript.owner : [];
      studentList.forEach(student => names.push(student.userFirstName + " " + student.userLastName));
      return names.join(', ');
    };

    return (
      <div className="comment-forum no-print">
        <div className="cf-name">
          <h3 className="title"> Students </h3>
        </div>
        {this.props.selected_advisee &&
          <AdvisorMenu
            student={this.props.selected_advisee}
            advisors={userInfo.advisors}
            transcript={this.props.transcript}
          />
        }
        <div className="cf-header">{this.props.selected_semester && displayStudentNames()}</div>
        <div className="comment-forum-container">
          {transcript}
        </div>
        <div className="as-header" />
        { displayInput}
      </div>
    );
  }
}

AdvisorPanel.defaultProps = {
  selected_advisee: null,
  transcript: null,
};

AdvisorPanel.propTypes = {
  userInfo: SemesterlyPropTypes.userInfo.isRequired,
  selected_advisee: PropTypes.string,
  transcript: SemesterlyPropTypes.transcript,
};

export default AdvisorPanel;
