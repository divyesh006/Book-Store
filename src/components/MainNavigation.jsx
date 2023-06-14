import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
//import { useAuthContext } from "../context/auth";
//import { RoutePaths } from "../utils/enum";

import Login from "../pages/Login";
import Register from "../pages/register";
import BookList from "../pages/book-listing/index";
import Book from "../pages/book";
import UpdateProfile from "../pages/update-profile/index";
import EditBook from "../pages/book/editBook";
import Cart from "../pages/cart";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const authData = useSelector((state) => state.auth.user);
  const Redirect = <Navigate to={"/login"} />;


  return (
    /* <Route
        exact
        path={RoutePaths.Register}
        element={!authContext.user.id ? <Register /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.BookListing}
        element={authContext.user.id ? <BookList /> : Redirect}
      />
       <Route
        exact
        path={RoutePaths.Book}
        element={authContext.user.id ? <Book /> : Redirect}
      />
     <Route
        exact
        path={RoutePaths.UpdateProfile}
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      />*/
    <Routes>
   
      <Route path="/login" element={<Login />} />
      <Route
         path="/register"
         element={!authData.id ? <Register /> : Redirect}
      />
      <Route
        path="/"
        element={!authData.id  ? <BookList /> : Redirect}
      />
       <Route
        path= "/Book"
        element={!authData.id  ? <Book /> : Redirect}
      />
     <Route
        path= "/UpdateProfile"
        element={!authData.id  ? <UpdateProfile /> : Redirect}
      />
      <Route        
        path= "/EditBook"
        element={!authData.id  ? <EditBook /> : Redirect}
      />
      <Route       
        path= "/AddBook"
        element={!authData.id  ? <EditBook /> : Redirect}
      />
       <Route     
        path="/Cart"
        element={!authData.id ? <Cart /> : Redirect}
      />
    </Routes>
  );
};

export default AppRoutes;
