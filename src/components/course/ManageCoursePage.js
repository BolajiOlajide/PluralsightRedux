import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../actions/courseAction";
import CourseForm from "./CourseForm";
import toastr from "toastr";

class ManageCoursePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      //Necessary to populatre form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success("Course Successfully Updated!");
    this.context.router.push("/courses");
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        onSave={this.saveCourse}
        onChange={this.updateCourseState}
        allAuthors={this.props.authors}
        loading={this.state.saving}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id == id );
  if (course.length) return course[0]; //since filter returns an array, have to grab the first element
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id; //from the path `/course/:id`
  let course = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + " " + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
