import axios from "axios";

const caleraAxios = axios.create({
  // baseURL: "https://lenient-shrimp-right.ngrok-free.app",
  baseURL: "http://localhost:3005", // Cambia esto a tu URL base
  // No definir headers por defecto para Content-Type
});


// Interceptor correcto sin error de tipo
caleraAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // config.headers["ngrok-skip-browser-warning"] = "1";
  // Evita agregar token si es login
  if (token && config.url && !config.url.includes("/api/usuario/login")) {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default caleraAxios;
