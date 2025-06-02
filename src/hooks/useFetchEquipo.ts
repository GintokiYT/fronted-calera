import caleraAxios from "@/utils/axios";

export function useFetch() {
  
   const getCatalogoEquipo= async () => {
    try {
      const response = await caleraAxios.get("/api/equipos/catalogo");
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };
  
  return { 
    getCatalogoEquipo
  };
}