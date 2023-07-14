import { Route, Routes } from "react-router-dom";
import Dashboards from "../../Pages/Dashboards";
import Students from "../../Pages/Students";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboards />}></Route>
            <Route path="/students" element={<Students />}></Route>
        </Routes>
    );
}

export default AppRoutes;