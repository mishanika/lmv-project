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
    status: "member",
  },
  {
    path: "/classic",
    name: "classic",
    component: <Classic />,
    auth: "notImportant",
    status: "member",
  },
  {
    path: "/roamies",
    name: "roamies",
    component: <Roamies />,
    auth: "notImportant",
    status: "member",
  },
  {
    path: "/search",
    name: "search",
    component: <Search />,
    auth: "notImportant",
    status: "member",
  },
  {
    path: "/login",
    name: "login",
    component: <Login />,
    auth: "unAuth",
    status: "member",
  },
  {
    path: "/register",
    name: "register",
    component: <Register />,
    auth: "unAuth",
    status: "member",
  },
  {
    path: "/profile",
    name: "profile",
    component: <Profile />,
    auth: "auth",
    status: "member",
  },
  {
    path: "/basket",
    name: "basket",
    component: <Basket />,
    auth: "auth",
    status: "member",
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
