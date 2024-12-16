import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/navbar";
import Explore from "./components/Explore";
import Home from "./components/Home";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./components/CreateEvent";
import Support from "./components/Support";
import MyEvents from "./components/MyEvents";
import AccountInfo from "./components/AccountInfo";
import EventDetails from "./components/EventDetails";
import Dashboard from "./components/Dashboard";
import AdminRoute from "./components/AdminRoute";
import EditEvent from "./components/EditEvent";
import { AuthProvider } from "../context/AuthProvider";
import ManageAttendees from "./components/ManageAttendees";

const App = () => {
  return (

    <BrowserRouter>
      <AuthProvider >
        <Navbar />
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="explore" element={<Explore />} />
          <Route path="/userlist" element={<UsersList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/createEvent" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
          <Route path="/support" element={<Support />} />
          <Route path="/account/events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
          <Route path="/account/info" element={<ProtectedRoute><AccountInfo /></ProtectedRoute>} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/account/events/edit/:eventId" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route
            path="/events/:eventId/manage-attendees"
            element={<ManageAttendees />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
};

export default App;
