import expect from "expect";
import * as courseActions from "./courseAction";
import * as types from "../constants";

import thunk from "redux-thunk";
import nock from "nock";
import configureMockStore from "redux-mock-store";

//Test a sync action
describe("Course Actions", () => {
  describe("CreateCourseSucces", () => {
    it("should create a CREATE_COURSE_SUCCESS action", () => {
      //arrange
      const courses = {id: "clean-code", title: "Clean Code"};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        courses: courses
      };

      //act
      const action = courseActions.createCourseSuccess(courses);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async actions", () => {
  //this just performs a cleanup after each test is run
  afterEach(() => {
    nock.cleanAll();
  });

  it("should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses", (done) => {
    // Here's an example of a call to nock.
    // nock("http://example.com/")
    //  .get("/courses")
    //  .reply(200, { body: {courses: [{id: 1, firstName: "Bolaji", lastName: "Olajide"}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: "clean-code", title: "Clean Code"}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      //this is to tell Mocha that we're done making the mock call
      done();
    });
  });
});
