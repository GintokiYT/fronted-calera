import caleraAxios from "@/utils/axios";

export function useFetch() {

  const getCatalogoEquipo = async () => {
    try {
      const response = await caleraAxios.get("/api/equipos/catalogo");
      console.log("response : ", response.data)
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const registrarEquipo = async (form: any) => {
    try {
      const response = await caleraAxios.post("/api/equipos/registrar", form);
      return response.data;
    } catch (error) {
      throw new Error("Error al registrar el equipo");
    }
  }

  return {
    getCatalogoEquipo,
    registrarEquipo
  };
}