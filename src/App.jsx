import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "@/pages/Home";
import { Login, Register } from "@/features/auth";
import { Profile } from "@/features/user";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { PlaceDetail } from "@/features/place";

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
