import React from "react";
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component", () => {
  test("correct number of items in the portion (10)", () => {
    const component = create(<Paginator totalItemsCount={25} pageSize={2} portionSize={10} currentPage={1}
                                        onCurrentPageChange={() => {
                                        }}/>);
    const root = component.root;
    const spans = root.findAllByType("span");
    expect(spans.length).toBe(10);
  });

  test("is the NEXT button displayed", () => {
    const component = create(<Paginator totalItemsCount={25} pageSize={2} portionSize={10} currentPage={1}
                                        onCurrentPageChange={() => {
                                        }}/>);
    const root = component.root;
    const buttons = root.findAllByType("button");
    expect(buttons.length).toBe(1);
  });

  test("is both button displayed", () => {
    const component = create(<Paginator totalItemsCount={50} pageSize={2} currentPage={12} portionSize={10}
                                        onCurrentPageChange={() => {
                                        }}/>);
    const root = component.root;
    const buttons = root.findAllByType("button");
    expect(buttons.length).toBe(2);
  });
});