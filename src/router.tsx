import { createBrowserRouter } from "react-router-dom";
import SignUp from "./features/auth/sign-up";

import ForgotPassword from "./features/auth/forgot-password";
import VerifyOtp from "./features/auth/verify-otp";
import ResetPassword from "./features/auth/reset-password";
import Dashboard from "./features/auth/dashboard";
import Bookings from "./features/bookings/bookings";
import AccountSettings from "./features/auth/account-settings";
import ProfileSettings from "./features/mechanic/profile-settings";
import ServiceRequests from "./features/mechanic/service-requests";
import WorkshopIndexing from "./common/workshop-indexing";
import LandingPage from "./common/landing-page";
import SignIn from "./features/auth/SignIn";
import CustomerServicesRequest from "./features/bookings/customer/customer-bookings.tsx";
import MyBookings from "./features/bookings/customer/my-bookings.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
  },
  {
    path: "/indexing",
    element: <WorkshopIndexing/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "bookings", 
        element: <Bookings />,
      },
      {
        path: "workshop-settings",
        element: <ProfileSettings />
      },
      {
        path: "account-settings", 
        element: <AccountSettings />
      },
      {
        path: "service-requests", 
        element: <ServiceRequests />
      },
      {
        path: "my-service-requests", 
        element: <CustomerServicesRequest/>
      },
      {
        path: "my-bookings", 
        element: <MyBookings/>
      },
    ]
    }
  
]);
