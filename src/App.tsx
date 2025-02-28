import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ConfirmedBookingsProvider } from "./context";
import { routes } from "./routes";
import { ErrorBoundary } from "./screens";

const App = () => {
  return (
    <ErrorBoundary>
      <ConfirmedBookingsProvider>
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
      </ConfirmedBookingsProvider>
    </ErrorBoundary>
  );
};

export default App;
