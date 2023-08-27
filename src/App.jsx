import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.js";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import {
//   Account,
//   Bookings,
//   Cabins,
//   Dashboard,
//   Login,
//   PageNotFound,
//   Settings,
//   Users,
// } from "./pages";
import { Dashboard, PDF } from "./pages";
import styled from "styled-components";
const Bookings = lazy(() => import("./pages/Bookings.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const Cabins = lazy(() => import("./pages/Cabins.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const Booking = lazy(() => import("./pages/Booking.jsx"));
const CheckIn = lazy(() => import("./pages/CheckIn.jsx"));

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
import AppLayout from "./ui/AppLayout.jsx";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Spinner from "./ui/Spinner.jsx";

// setting up react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Suspense
            fallback={
              <FullPage>
                <Spinner />
              </FullPage>
            }
          >
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<CheckIn />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="pdf" element={<PDF />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
