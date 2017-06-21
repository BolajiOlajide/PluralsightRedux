import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../actions/courseAction";

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {title: " "}
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course});
    }

    onClickSave() {
        // since we didn't define a mapDispatchToProps function, connect automatically adds a dispatch prop to the
        // component.
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return (
            <div key={index}>
                {course.title}
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1> Courses </h1>
                {this.props.courses.map(this.courseRow)}
                <h2> Add Course </h2>
                <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />

                <input type="submit" value="Save" onClick={this.onClickSave} />
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
