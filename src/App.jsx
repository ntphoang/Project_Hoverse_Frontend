import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "@/pages/Home";
import { Login, Register } from "@/features/auth";
import { ProfilePage } from "@/features/user";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { PlaceDetail, PlaceUpdate } from "@/features/place";

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
        <Route path="/users/me" element={<ProfilePage></ProfilePage>}></Route>
        <Route
          path={`edit-place/:placeId`}
          element={<PlaceUpdate></PlaceUpdate>}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
