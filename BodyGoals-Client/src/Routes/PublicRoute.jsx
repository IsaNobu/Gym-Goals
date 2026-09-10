import { createBrowserRouter } from "react-router-dom";
import Root from "../root/MainPageRoot";
import Home from "../Main Page/Home/Home/Home";
import Login from "../Main Page/Authentication/Login";
import Registration from "../Main Page/Authentication/Registration";
import BeATrainer from "../Main Page/Be A Trainer/Be-A-Trainer";
import DashboardRoot from "../root/DashboardRoot";
import UpdateProfile from "../Dashboard/UpdateProfile";
import NewsletterSubscribers from "../Dashboard/Admin/NewsletterSubscribers";
import AllTrainer from "../Dashboard/Admin/AllTrainer";
import HomeAllTrainer from "../Main Page/Trainer/AllTrainer";
import AppliedTrainersDetails from "../Dashboard/Admin/Applied Trainers/AppliedTrainersDetails";
import AppliedTrainers from "../Dashboard/Admin/Applied Trainers/AppliedTrainersTable";
import AddClass from "../Dashboard/Admin/AddClass";
import ManageSlots from "../Dashboard/Trainer/ManageSlots";
import AddSlots from "../Dashboard/Trainer/AddSlots";
import AllClassesDetails from "../Main Page/All Classes/AllClassesDetails";
import AllClasses from "../Main Page/All Classes/AllClasses";
import TrainerBookPage from "../Main Page/Trainer/TrainerBookPage";
import PrivetRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TrainerRoute from "./TrainerRoute";
import BookTrainer from "../Main Page/Trainer/BookTrainer";
import TrainerDetails from "../Main Page/Trainer/TrainerDetails";
import CommunityForm from "../Dashboard/CommunityForm";
import CommunityPage from "../Main Page/Community/CommunityPage";
import ActivityLog from "../Dashboard/User/ActivityLog";
import BookedTrainer from "../Dashboard/User/BookedTrainer";
import Balance from "../Dashboard/Admin/Balance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/all-trainer",
        element: (
          <PrivetRoute>
            <HomeAllTrainer />
          </PrivetRoute>
        ),
      },
      {
        path: "/be-a-trainer",
        element: (
          <PrivetRoute>
            <BeATrainer />
          </PrivetRoute>
        ),
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/all-classes/:id",
        element: (
          <PrivetRoute>
            <AllClassesDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/trainer-book-page/:id",
        element: (
          <PrivetRoute>
            <TrainerBookPage />
          </PrivetRoute>
        ),
      },
      {
        path: "/trainer-details/:id",
        element: (
          <PrivetRoute>
            <TrainerDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/book-trainer",
        element: (
          <PrivetRoute>
            <BookTrainer />
          </PrivetRoute>
        ),
      },
      {
        path: "/community-posts",
        element: (
          <PrivetRoute>
            <CommunityPage />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    Path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardRoot />
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UpdateProfile />,
      },
      {
        path: "/dashboard/subscribers",
        element: (
          <AdminRoute>
            <NewsletterSubscribers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-trainer",
        element: (
          <AdminRoute>
            <AllTrainer />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/applied-trainers",
        element: (
          <AdminRoute>
            <AppliedTrainers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/applied-trainers/:id",
        element: (
          <AdminRoute>
            <AppliedTrainersDetails />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/Add-class",
        element: (
          <AdminRoute>
            <AddClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-slots",
        element: (
          <TrainerRoute>
            <ManageSlots />
          </TrainerRoute>
        ),
      },
      {
        path: "/dashboard/add-slots",
        element: (
          <TrainerRoute>
            <AddSlots />
          </TrainerRoute>
        ),
      },
      {
        path: "/dashboard/add-community",
        element: <CommunityForm />,
      },
      {
        path: "/dashboard/activity-log",
        element: <ActivityLog />,
      },
      {
        path: "/dashboard/booked-trainer",
        element: <BookedTrainer />,
      },
      {
        path: "/dashboard/balance",
        element: (
          <AdminRoute>
            <Balance />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
