import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;

describe("ProfileStatus component", () => {
  test("status from props must be in the state", () => {
    const component = create(<ProfileStatus status="fur-fur-fur" putStatus={() => {}}/>);
    const root = component.root;
    expect(root.props.status).toBe("fur-fur-fur");
  });

  test("<span> must be showed after creation", () => {
    const component = create(<ProfileStatus status="fur-fur-fur" putStatus={() => {}}/>);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("<input> must not be showed after creation", () => {
    const component = create(<ProfileStatus status="fur-fur-fur" putStatus={() => {}}/>);
    const root = component.root;
    const input = root.findAllByType("input");
    expect(input.length).toBe(0);
  });

  test("<input> must be showed in editMode", () => {
    const component = create(<ProfileStatus status="fur-fur-fur" putStatus={() => {}}/>);
    const root = component.root;
    const span = root.findByType("span");
    act(() => {
      span.props.onDoubleClick();
    });
    const input = root.findByType("input");
    expect(input.props.value).toBe("fur-fur-fur");
  });
});
