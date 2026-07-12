import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Profile from "./features/user/pages/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PlaceDetail from "./features/place/pages/PlaceDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route
        path={`/places/:placeId`}
        element={<PlaceDetail></PlaceDetail>}
      ></Route>

      <Route element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
