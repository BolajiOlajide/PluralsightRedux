import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../actions/courseAction";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
    }


    courseRow(course, index) {
        return (
            <div key={index}>
                {course.title}
            </div>
        );
    }

    render() {
        const {courses} = this.props;

        return (
            <div>
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

//another way to do this is:
// connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
