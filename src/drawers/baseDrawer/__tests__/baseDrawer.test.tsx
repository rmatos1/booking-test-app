import { describe, test, expect, jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react";
import { TestComponent } from "../../../components";
import { BaseDrawer } from "..";

const defaultProps = {
  children: <div data-testid="test-element" />,
  isDrawerVisible: true,
  onCloseDrawer: jest.fn(),
};

const setup = (props = {}): JSX.Element => {
  return (
    <TestComponent>
      <BaseDrawer {...defaultProps} {...props} />
    </TestComponent>
  );
};

describe("<BaseDrawer />", () => {
  test("should render the defined children element correctly", () => {
    const wrapper = render(setup());

    const children = wrapper.getByTestId("test-element");
    expect(children).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the drawer when isDrawerVisible is true", () => {
    const wrapper = render(setup({ isDrawerVisible: true }));

    const drawer = wrapper.getByTestId("base-drawer");
    expect(drawer).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should call onCloseDrawer when the close button is clicked", () => {
    const onCloseDrawerMock = jest.fn();
    const wrapper = render(setup({ onCloseDrawer: onCloseDrawerMock }));

    const closeButton = wrapper.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(onCloseDrawerMock).toHaveBeenCalled();
  });

  test("should hide the scroll when the drawer is visible", () => {
    render(setup({ isDrawerVisible: true }));

    expect(document.body.style.overflow).toBe("hidden");
  });

  test("should restore the scroll when the drawer is closed", () => {
    const { rerender } = render(setup({ isDrawerVisible: true }));

    rerender(setup({ isDrawerVisible: false }));

    expect(document.body.style.overflow).toBe("unset");
  });
});
