// ROUTE COMPONENTS
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';

const routes = [
    {
      path: "/",
      element: <Dashboard />,
      title: "Dashboard",
    },
    {
      path: "/profile",
      element: <Profile />,
      title: "Profile",
    },
    {
      path: "/settings",
      element: <Settings />,
      title: "Settings",
    }
  ];
  
  export default routes;
