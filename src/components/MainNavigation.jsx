import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import { RoutePaths } from "../utils/enum";

import Login from "../pages/Login";
import Register from "../pages/register";
import BookList from "../pages/book-listing/index";
import Book from "../pages/book";
import UpdateProfile from "../pages/update-profile/index";
import EditBook from "../pages/book/editBook";


const AppRoutes = () => {
  const authContext = useAuthContext();

  const Redirect = <Navigate to={RoutePaths.Login} />;

  return (
    <Routes>
      <Route exact path={RoutePaths.Login} element={<Login />} />
      <Route
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
      />
      <Route
        exact
        path={RoutePaths.EditBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.AddBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      />

    </Routes>
  );
};

export default AppRoutes;
