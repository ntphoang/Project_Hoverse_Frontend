import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { Login, Register, VerifyEmail } from "@/features/auth";
import { ProfilePage } from "@/features/user";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import {
  PlaceDetail,
  PlaceUpdate,
  PlaceFavorite,
  useFetchFavoriteIds,
} from "@/features/place";
import { ToastContainer } from "react-toastify";

function App() {
  useFetchFavoriteIds();

  return (
    <>
      <Routes>
        {/* CÁC TRANG CÔNG KHAI */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/verify-email"
          element={<VerifyEmail></VerifyEmail>}
        ></Route>
        <Route
          path={`/places/:placeId`}
          element={<PlaceDetail></PlaceDetail>}
        ></Route>

        {/* CÁC TRANG YÊU CÂU LOGIN */}
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/users/me" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/favorites"
            element={<PlaceFavorite></PlaceFavorite>}
          ></Route>
        </Route>

        {/* CÁC TRANG YÊU CẦU LOGIN + XÁC THỰC EMAIL */}
        <Route
          element={<ProtectedRoute requireVerified={true}></ProtectedRoute>}
        >
          <Route
            path={`edit-place/:placeId`}
            element={<PlaceUpdate></PlaceUpdate>}
          ></Route>
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
