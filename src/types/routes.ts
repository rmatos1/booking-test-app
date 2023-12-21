export enum ScreenPaths {
  home = '/',
  resultsList = 'results-list',
  confirmedBooking = 'confirmed-booking',
  myBookings = 'my-bookings',
  notFound = '*',
}

export interface IRoutes {
  path: ScreenPaths;
  component: JSX.Element;
}
