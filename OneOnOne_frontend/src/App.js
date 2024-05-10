// import {Navbar} from "./components/navbar";
// import {Footer} from "./components/Footer"
// import {Header} from "./components/indexHeader"
// import {IndexFeatures} from "./components/indexFeatures"

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Invite from "./pages/Invite";
import Contacts from "./pages/Contacts";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import {NotFoundPage} from "./pages/NotFoundPage";
import { UserProvider } from './contexts/UserContext';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />)
            <Route path='/dashboard' element={<Dashboard />} />)
            <Route path='/calendar' element={<Calendar />} />)
            <Route path='/invite' element={<Invite />} />)
            <Route path='/contacts' element={<Contacts />} />)
            <Route path='/contacts' element={<Contacts />} />)
            <Route path='/signin' element={<Signin />} />)
            <Route path='/signup' element={<SignUp />} />)
            <Route path='/profile' element={<Profile />} />)
            <Route path='*' element={<NotFoundPage />} />)
        </Route>
    )
);

const App = () => {
    return (
      <UserProvider>
          <RouterProvider router={router} />
      </UserProvider>
    );
  };

export default App;
