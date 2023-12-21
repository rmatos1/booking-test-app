import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  BookingProvider,
  ConfirmedBookingsProvider,
  DrawerProvider,
} from './context';
import { routes } from './routes';
import { ErrorBoundary } from './screens';

const App = () => {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <ConfirmedBookingsProvider>
          <DrawerProvider>
            <Router>
              <Routes>
                {routes.map((item, index) => (
                  <Route
                    key={`route${index}`}
                    path={item.path}
                    element={item.component}
                  />
                ))}
              </Routes>
            </Router>
          </DrawerProvider>
        </ConfirmedBookingsProvider>
      </BookingProvider>
    </ErrorBoundary>
  );
};

export default App;
