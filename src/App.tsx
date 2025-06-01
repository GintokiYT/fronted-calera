import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/page";
import UsuariosPage from "./pages/dashboard/usuarios/page";
import EquiposPage from "./pages/dashboard/equipos/page";
import AsignacionPage from "./pages/dashboard/asignacion/page";

import DashboardLayout from "./layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard/usuarios" replace />
      },
      {
        path: "usuarios",
        element: <UsuariosPage />
      },
      {
        path: "equipos",
        element: <EquiposPage />
      },
      {
        path: "asignacion",
        element: <AsignacionPage />
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
