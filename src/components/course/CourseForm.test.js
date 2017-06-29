import expect from "expect";
import React from "react";
import TestUtils from "react-addons-test-utils";
import CourseForm from "./CourseForm";

const setUp = () => {
  let props = {
    course: {}, loading: false, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
};

describe("CourseForm via React Test Utils", () => {
  it("renders a form & h1 tag", () => {
    const { output } = setUp();
    expect(output.type).toBe("form");
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe("h1");
  });
});
