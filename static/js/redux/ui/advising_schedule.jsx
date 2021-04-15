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
import CourseListRow from './course_list_row';
import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';

class AdvisingSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const courseListRows = (this.props.displayed_semesters.length > 0) ?
      this.props.displayed_semesters.map(semester =>
        (<CourseListRow
          key={semester}
          parentParentCallback={this.props.parentCallback}
          displayed_semester={semester}
          current_semester={`${this.props.semester.name} ${this.props.semester.year}`}
          selected_semester={this.props.selected_semester}
          coursesInTimetable={this.props.coursesInTimetable}
          courseToClassmates={this.props.courseToClassmates}
          courseToColourIndex={this.props.courseToColourIndex}
          isCourseInRoster={this.props.isCourseInRoster}
          fetchCourseInfo={this.props.fetchCourseInfo}
        />),
      ) : <div className="empty-state"><h4><p> No semesters yet! </p></h4></div>;

    return (
      <div className="advising-schedule-inner">
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '25px' }}>
          Course Summary
        </p>
        {courseListRows}
      </div>
    );
  }
}

AdvisingSchedule.defaultProps = {
  selected_semester: null,
};

AdvisingSchedule.propTypes = {
  selected_semester: PropTypes.string,
  coursesInTimetable: PropTypes.arrayOf(SemesterlyPropTypes.denormalizedCourse).isRequired,
  courseToColourIndex: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  courseToClassmates: PropTypes.shape({ '*': SemesterlyPropTypes.classmates }).isRequired,
  parentCallback: PropTypes.func.isRequired,
  isCourseInRoster: PropTypes.func.isRequired,
  fetchCourseInfo: PropTypes.func.isRequired,
  semester: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdvisingSchedule;
