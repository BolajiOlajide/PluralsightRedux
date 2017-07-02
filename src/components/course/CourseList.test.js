import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import CourseList from "./CourseList";

const setup = () => {
  const props = {
    courses: {id: 1}
  };

  return shallow(<CourseList {...props} />);
};

// describe("CourseList Test via Enzyme", () => {
//   it("renders table", () => {
//     const wrapper = setup();
//     console.log(wrapper);
//     expect(wrapper.find("table").length).toBe(1);
//   });
// });
