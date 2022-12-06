import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataContext, { useDataContext } from "./contexts/dataContext";
import AuthContext, { useAuthContext } from "./contexts/authContext";
import LocationContext, { useLocationContext } from "./contexts/locationContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainPage from "./pages/MainPage/MainPage";
import TestResultsPage from "./pages/TestResultsPage/TestResultsPage";
import RequestPage from "./pages/RequestPage/RequestsPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  const dataContextValue = useDataContext();
  const authContextValue = useAuthContext();
  const locationContextValue = useLocationContext();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContextValue}>
        <DataContext.Provider value={dataContextValue}>
          <LocationContext.Provider value={locationContextValue}>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tests" element={<TestResultsPage />} />
                <Route path="/requests" element={<RequestPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </LocationContext.Provider>
        </DataContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
