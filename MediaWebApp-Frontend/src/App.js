import { lazy, Suspense, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import SuspenseLoading from "./components/SuspenseLoading";
import { useLocation } from "react-router-dom";

const Videos = lazy(() => import("./pages/Videos"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Radio = lazy(() => import("./pages/Radio"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const Photo = lazy(() => import("./pages/Photos"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const [player, setPlayer] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const location = useLocation();

  return (
    <>
      {(location.pathname !== "/admin") && 
      ((location.pathname !== "/video" && location.pathname !== "/photo") ||
      (location.pathname === "/video" && !player) ||
      (location.pathname === "/photo" && selectedPhotoIndex === null)) ? (
        <NavBar />
      ) : null}
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/video"
            element={<Videos player={player} setPlayer={setPlayer} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/radio" element={<Radio />} />
          <Route
            path="/photo"
            element={
              <Photo
                selectedPhotoIndex={selectedPhotoIndex}
                setSelectedPhotoIndex={setSelectedPhotoIndex}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {(location.pathname !== "/video" && location.pathname !== "/photo") ||
      (location.pathname === "/video" && !player) ||
      (location.pathname === "/photo" && selectedPhotoIndex === null) ? (
        <Footer />
      ) : null}
    </>
  );
}

export default App;
