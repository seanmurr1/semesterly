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
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import SearchAdviseesInputContainer from '../ui/containers/search_advisees_input_container';
// import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';

class AdvisorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSelectedAdvisee: null,
      showingAdvisee: false,
    };
  }

  sendSelectedAdvisee(newSelectedAdvisee) {
    this.props.displayAdvisee(newSelectedAdvisee);
    this.setState({ showingAdvisee: !this.state.showingAdvisee });
  }

  render() {
    // TODO: fix search bar so it works, test with multiple students
    const searchAdviseesInput = (this.props.displayed_advisees === null) ?
    null : (<SearchAdviseesInputContainer
      displayed_advisees={this.props.displayed_advisees}
      selected_advisee={this.props.selected_advisee}
      displayAdvisee={this.props.displayAdvisee}
    />);
    const backButton = (
      <div className="cal-btn-wrapper" style={{ display: this.state.showingAdvisee ? 'inline-block' : 'none', verticalAlign: 'middle', float: 'left', marginTop: 11 }}>
        <a href="/advising">
          <button
            data-tip
            className="save-timetable add-button"
            data-for="back-btn-tooltip"
          >
            <i className="fa fa-chevron-circle-left" />
          </button>
        </a>
        <ReactTooltip
          id="back-btn-tooltip"
          class="tooltip"
          type="dark"
          place="right"
          effect="solid"
        >
          <span>Back</span>
        </ReactTooltip>
      </div>
    );

    // TODO: add unread comment note under student name (insert in div below)
    const adviseeList = (this.props.displayed_advisees != null) ?
    this.props.displayed_advisees.map(advisee =>
      (<button
        className="empty-state"
        onClick={
          () => { this.sendSelectedAdvisee(advisee); }
        }
        key={advisee.owner_jhed}
      >
        <h3>{ advisee.owner_name }</h3>
      </button>),
    ) : (<div className="empty-state"><h4> <p> No advisees added yet! </p> </h4></div>);

    return (
      <div className="comment-forum no-print">
        <div className="cf-name" style={{ display: 'inline-block', float: 'left' }}>
          <h3 className="title"> Students </h3>
        </div>
        { backButton }
        { searchAdviseesInput }
        <div className="cf-header" />
        <div className="comment-forum-container">
          { adviseeList }
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
  selected_advisee: PropTypes.shape({
    owner_name: PropTypes.string,
    owner_jhed: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
      author_name: PropTypes.string,
      content: PropTypes.string,
      timestamp: PropTypes.date,
    })),
    semester_name: PropTypes.string,
    semester_year: PropTypes.string,

  }),
  displayed_advisees: PropTypes.arrayOf(PropTypes.object),
  displayAdvisee: PropTypes.func.isRequired,
};

export default AdvisorPanel;
