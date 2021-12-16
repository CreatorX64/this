import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllMeetups from "./pages/AllMeetups";
import NewMeetup from "./pages/NewMeetup";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetups />} />
        <Route path="new-meetup" element={<NewMeetup />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
}
