import Login from "../login/Login";
import Main from "../main/Main";
import Profile from "../profile/Profile";
import Register from "../register/Register";
import Classic from "../tours/classic/Classic";
import Roamies from "../tours/roamies/Roamies";
import Search from "../search/Search";
import Basket from "../basket/Basket";
import ToursAdmin from "../toursAdmin/ToursAdmin";
import AddClients from "../toursAdmin/addClients/AddClients";

export const routes = [
  {
    path: "/",
    name: "main",
    component: <Main />,
    auth: "notImportant",
  },
  {
    path: "/classic",
    name: "classic",
    component: <Classic />,
    auth: "notImportant",
  },
  {
    path: "/roamies",
    name: "roamies",
    component: <Roamies />,
    auth: "notImportant",
  },
  {
    path: "/search",
    name: "search",
    component: <Search />,
    auth: "notImportant",
  },
  {
    path: "/login",
    name: "login",
    component: <Login />,
    auth: "unAuth",
  },
  {
    path: "/register",
    name: "register",
    component: <Register />,
    auth: "unAuth",
  },
  {
    path: "/profile",
    name: "profile",
    component: <Profile />,
    auth: "auth",
  },
  {
    path: "/basket",
    name: "basket",
    component: <Basket />,
    auth: "auth",
  },
  {
    path: "/addTours",
    name: "Add Tours",
    component: <ToursAdmin />,
    auth: "auth",
    status: "admin",
  },
  {
    path: "/addClients",
    name: "Add Clients",
    component: <AddClients />,
    auth: "auth",
    status: "admin",
  },
];
