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
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';
import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';

class StudentListRow extends React.Component {

  sendSelectedAdvisee() {
    if (this.props.selected_advisee !== null) {
      this.props.displayAdvisee();
    }
  }

  render() {
    // TODO: replace with proper mapping of displayed_advisees
    const plannedCourseList = (this.props.selected_advisee == null) ?
    this.props.coursesInTimetable.map((course) => {
      return (<div className="empty-state">
      <img src="/static/img/emptystates/masterslots.png" alt="No courses added." />
      <h3>Looks like you don&#39;t have any courses yet!</h3>
      <h4>Your selections will appear here along with credits, professors and friends
      in the class</h4>
    </div>);
    }) : (<div className="empty-state">
    <img src="/static/img/emptystates/masterslots.png" alt="No courses added." />
    <h3>Looks like you don&#39;t have any courses yet!</h3>
    <h4>Your selections will appear here along with credits, professors and friends
    in the class</h4>
    </div>);

    return (
      <div
        handleTriggerClick={() => { this.sendSelectedAdvisee(); }}
      >
        <div>
          { courseList }
        </div>
      </div>
    );
  }
}

StudentListRow.defaultProps = {
  selected_semester: null,
};

StudentListRow.propTypes = {
  selected_advisee: PropTypes.string,
  displayed_semester: PropTypes.string.isRequired,
  selected_semester: PropTypes.string,
  current_semester: PropTypes.string.isRequired,
  parentParentCallback: PropTypes.func.isRequired,
  coursesInTimetable: PropTypes.arrayOf(SemesterlyPropTypes.denormalizedCourse).isRequired,
  courseToColourIndex: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  courseToClassmates: PropTypes.shape({ '*': SemesterlyPropTypes.classmates }).isRequired,
  isCourseInRoster: PropTypes.func.isRequired,
  fetchCourseInfo: PropTypes.func.isRequired,
};

export default StudentListRow;
