import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ManagementTeam from "../pages/ManagementTeam";
import StudentTable from "../pages/students/StudentsTable";
import Photos from "../pages/Photos";
import Contact from "../pages/Contact";
import Details from "../components/Details";
import SuccessContent from "../components/SuccessContent";
import BlogList from "../pages/BlogList";
import SingleBlogPage from "../pages/SingleBlogPage";
import Admin from "../components/Admin";
import AddBlog from "../pages/Add/AddBlog";
import AddStudent from "../pages/Add/AddStudent";
import AddImages from "../pages/Add/AddImages";
import AllImages from "../pages/List/AllImages";
import AllStudents from "../pages/List/AllStudents";
import AllBlogs from "../pages/List/AllBlogs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "management-team", element: <ManagementTeam /> },
      { path: "students", element: <StudentTable /> },
      { path: "gallery/photos", element: <Photos /> },
      { path: "contact-us", element: <Contact /> },
      { path: "details/:name", element: <Details /> },
      { path: "success", element: <SuccessContent /> },
      { path: "blogs", element: <BlogList /> },
      { path: "blogs/:name", element: <SingleBlogPage /> },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "addBlog", element: <AddBlog /> },
          { path: "addStudent", element: <AddStudent /> },
          { path: "updateStudent/:studentId", element: <AddStudent /> },
          { path: "addImages", element: <AddImages /> },
          { path: "allBlogs", element: <AllBlogs/> },
          { path: "allImages", element: <AllImages /> },
          { path: "allStudents", element: <AllStudents /> }
        ]
      }
    ]
  }
]);

export default router;