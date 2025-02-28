import { BrowserRouter as Router } from "react-router-dom";
import {
  ConfirmedBookingsProvider,
  IConfirmedBookingsContext,
} from "../../context";
import { IComponentWithChildren } from "../../types";

export interface ITestComponent extends IComponentWithChildren {
  confirmedBookingsContextValue?: IConfirmedBookingsContext;
}

/**
 * component to be used only in the tests
 * @param props.children - component to be rendered
 */
export const TestComponent = ({
  children,
  confirmedBookingsContextValue,
}: ITestComponent) => {
  return (
    <ConfirmedBookingsProvider customValue={confirmedBookingsContextValue}>
      <Router>{children}</Router>
    </ConfirmedBookingsProvider>
  );
};
