import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetch } from "@/hooks/useFetch" 

export default function Page() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { postLogin } = useFetch();

 const handleLogin = async () => {
    try {
      await postLogin(correo, contrasena); 
     
      navigate("/dashboard/usuarios");
    } catch (error) {
      alert("Credenciales inválidas o error de red");
    }
  };
 
  return (
    <div className="w-full min-h-dvh flex items-center justify-center p-4 relative">
      <img className="absolute -z-10 w-full h-full object-fill" src="/assets/img/fondo.webp" alt="fondo" />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Email</Label>
            <Input id="username" type="text" placeholder="usuario@ejemplo.com" required  value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye
                   className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Recordarme
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
