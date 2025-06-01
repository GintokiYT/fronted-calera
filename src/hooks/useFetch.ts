import caleraAxios from "@/utils/axios";

export function useFetch() {
  
  const getCharacter = async () => {
    try {
      const response = await caleraAxios.get("/character");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return { 
    getCharacter 
  };
}