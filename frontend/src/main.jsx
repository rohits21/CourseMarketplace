import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import ColorModeSwitcher from './ColorModeSwitcher.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


import Home from './components/Home/Home.jsx'
import Courses from './components/Courses/Courses.jsx'
import Login from './components/Auth/Login/Login.jsx'
import SignUp from './components/Auth/SignUp/SignUp.jsx'
import ForgetPassword from './components/Auth/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './components/Auth/ResetPassword/ResetPassword.jsx'
import ContactUs from './components/Contact/ContactUs.jsx'
import RequestCourse from './components/RequestCourse/RequestCourse.jsx'
import About from './components/About/About.jsx'
import NotFound from './components/NotFound.jsx'
import Subscribe from './components/Payment/Subscribe.jsx'
import PaymentFailed from './components/Payment/PaymentFailed.jsx'
import PaymentSuccess from './components/Payment/PaymentSuccess.jsx'
import CoursePage from './components/CoursePage/CoursePage.jsx'
import Profile from './components/Profile/Profile.jsx'
import UpdateProfile from './components/Profile/UpdateProfile.jsx'
import ChangePassword from './components/Profile/ChangePassword.jsx'
import Dashboard from './components/Admin/Dashboard/Dashboard.jsx'
import CreateCourse from './components/Admin/CreateCourse.jsx/CreateCourse.jsx'
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.jsx'
import Users from './components/Admin/Users/Users.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AdminLayout from './components/AuthAdminLayout.jsx'


const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/courses',
        element: <Courses />
      },
      {
        path: '/login',
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: '/signup',
        element: <AuthLayout authentication={false}>
        <SignUp />
      </AuthLayout>
      },
      {
        path: '/forgetpassword',
        element: <ForgetPassword />
      },
      {
        path: '/resetpassword/:token',
        element: <ResetPassword />
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: '/request',
        element: <RequestCourse />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/subscribe',
        element: <Subscribe />
      },
      {
        path: '/paymentfailed',
        element: <PaymentFailed />

      },
      {
        path: '/paymentsuccess',
        element: <PaymentSuccess />

      },
      {
        path: '/course/:id',
        element: <CoursePage />

      },
      {
        path: '/profile',
        element: <AuthLayout authentication>
          <Profile />
        </AuthLayout>

      },
      {
        path: '/updateprofile',
        element: <UpdateProfile />

      },
      {
        path: '/changepassword',
        element: <ChangePassword />

      },
      {
        path: '/admin/dashboard',
        element:  <AdminLayout><Dashboard /></AdminLayout> 

      },
      {
        path: '/admin/createcourse',
        element: <CreateCourse />

      },
      {
        path: '/admin/courses',
        element: <AdminCourses />

      },
      {
        path: '/admin/users',
        element: <Users />

      },
      {
        path: '/*',
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <RouterProvider router={router} />
      </ChakraProvider>

    </Provider>

  </React.StrictMode>,
)
