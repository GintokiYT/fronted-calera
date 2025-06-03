import caleraAxios from "@/utils/axios";

export function useFetch() {
  
 const postLogin = async (correo: string, contrasena: string) => {
    try {
      const response = await caleraAxios.post("/api/usuario/login", {
        correo,
        contrasena,
      });
      localStorage.setItem("token", response.data.token); // Guardas el token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Opcional
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // TODO : AQUI ESTA EMPLEADO ABAJO
  const getCatalogoEmpleado = async () => {
    try {
      const response = await caleraAxios.get("/api/empleados/catalogos");
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

    const registrarEmpleado = async (data: FormData) => {
      try {
        const response = await caleraAxios.post("/api/empleados/registrar", data);
        return response.data;
      } catch (error) {
        console.error("Error en registro:", error);
        throw error;
      }
    };
 
  
  return { 
    postLogin ,
    getCatalogoEmpleado,
    registrarEmpleado
  };
}