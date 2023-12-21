import {
  ConfirmedBooking,
  Home,
  MyBookings,
  Notfound,
  ResultsList,
} from '../screens';
import { IRoutes, ScreenPaths } from '../types';

export const routes: IRoutes[] = [
  {
    path: ScreenPaths.home,
    component: <Home />,
  },
  {
    path: ScreenPaths.resultsList,
    component: <ResultsList />,
  },
  {
    path: ScreenPaths.confirmedBooking,
    component: <ConfirmedBooking />,
  },
  {
    path: ScreenPaths.myBookings,
    component: <MyBookings />,
  },
  {
    path: ScreenPaths.notFound,
    component: <Notfound />,
  },
];
