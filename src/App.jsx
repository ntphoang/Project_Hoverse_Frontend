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

function App() {
  useFetchFavoriteIds();

  return (
      <Routes>
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

        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/users/me" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path={`edit-place/:placeId`}
            element={<PlaceUpdate></PlaceUpdate>}
          ></Route>
          <Route
            path="/favorites"
            element={<PlaceFavorite></PlaceFavorite>}
          ></Route>
        </Route>
      </Routes>
  );
}

export default App;
