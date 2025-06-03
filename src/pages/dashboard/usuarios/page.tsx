import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";

export default function Page() {
  const { getCatalogoEmpleado, registrarEmpleado } = useFetch();
  
   const [catalogo, setCatalogo] = useState({
    documentos: [],
    sedes: [],
    gerencias: [],
    areas: [],
    cargos: [],
    estados: [],
    roles: []
  });


  const [formData, setFormData] = useState({
    tipo_documento_id: "1",
    numero_documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    usuario_ad: "",
    fecha_ingreso: "",
    estado_id: "",
    gerencia_id: "",
    sede_id: "",
    area_id: "",
    cargo_id: "",
    foto: null as File | null,  // nuevo campo para la foto
  });


  useEffect(() => {
    getCatalogoEmpleado().then(data => {
      setCatalogo(data.data);
    });
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
    const handleRegister = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          alert("Usuario no autenticado");
          return;
        }
        const user = JSON.parse(userString);

        const formDataToSend = new FormData();
        formDataToSend.append("tipo_documento", formData.tipo_documento_id); // O mapea según tu lógica
        formDataToSend.append("numero_documento", formData.numero_documento);
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("apellido", formData.apellido);
        formDataToSend.append("correo", formData.correo);
        formDataToSend.append("telefono", formData.telefono);
        formDataToSend.append("usuario_ad", formData.usuario_ad);
        formDataToSend.append("fecha_ingreso", formData.fecha_ingreso);
        formDataToSend.append("estado_id", formData.estado_id);
        formDataToSend.append("gerencia_id", formData.gerencia_id);
        formDataToSend.append("sede_id", formData.sede_id);
        formDataToSend.append("area_id", formData.area_id);
        formDataToSend.append("cargo_id", formData.cargo_id);
        formDataToSend.append("creador_id", user.id.toString());

        if (formData.foto) {
          formDataToSend.append("foto", formData.foto);
        }

        const result = await registrarEmpleado(formDataToSend);
        alert("Empleado registrado correctamente");
        console.log(result);

        // Limpiar formulario
        setFormData({
          tipo_documento_id: "1",
          numero_documento: "",
          nombre: "",
          apellido: "",
          correo: "",
          telefono: "",
          usuario_ad: "",
          fecha_ingreso: "",
          estado_id: "",
          gerencia_id: "",
          sede_id: "",
          area_id: "",
          cargo_id: "",
          foto: null,
        });

      } catch (error) {
        alert("Error al registrar empleado");
        console.error(error);
      }
    };


  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Registro de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Tipo de Documento</Label>
            <Select onValueChange={value => handleChange("tipo_documento_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo de documento" />
              </SelectTrigger>
              <SelectContent>
              {catalogo.documentos.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div> 

          <div>
            <Label>Número de Documento</Label>
            <Input
              value={formData.numero_documento}
              onChange={e => handleChange("numero_documento", e.target.value)}
            />
          </div>

          <div>
            <Label>Nombre</Label>
            <Input
              value={formData.nombre}
              onChange={e => handleChange("nombre", e.target.value)}
            />
          </div>

          <div>
            <Label>Apellido</Label>
            <Input
              value={formData.apellido}
              onChange={e => handleChange("apellido", e.target.value)}
            />
          </div>

          <div>
            <Label>Sede</Label>
            <Select onValueChange={value => handleChange("sede_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una sede" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.sedes.map((sede: any) => (
                  <SelectItem key={sede.value} value={sede.value.toString()}>{sede.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Gerencia</Label>
            <Select onValueChange={value => handleChange("gerencia_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una gerencia" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.gerencias.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Área</Label>
            <Select onValueChange={value => handleChange("area_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un área" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.areas.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Cargo</Label>
            <Select onValueChange={value => handleChange("cargo_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cargo" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.cargos.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Teléfono</Label>
            <Input
              value={formData.telefono}
              onChange={e => handleChange("telefono", e.target.value)}
            />
          </div>

          <div>
            <Label>Usuario AD</Label>
            <Input
              value={formData.usuario_ad}
              onChange={e => handleChange("usuario_ad", e.target.value)}
            />
          </div>

          <div>
            <Label>Correo Corporativo</Label>
            <Input
              value={formData.correo}
              onChange={e => handleChange("correo", e.target.value)}
            />
          </div>

          <div>
            <Label>Fecha de Ingreso</Label>
            <Input
              type="date"
              value={formData.fecha_ingreso}
              onChange={e => handleChange("fecha_ingreso", e.target.value)}
            />
          </div>

          <div>
            <Label>Estado</Label>
            <Select onValueChange={value => handleChange("estado_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.estados.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
          <Label>Foto</Label>
          <label
            htmlFor="foto-upload"
            className="cursor-pointer inline-flex items-center justify-center rounded-md border border-dashed border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {formData.foto ? formData.foto.name : "Selecciona una imagen..."}
          </label>
          <input
            id="foto-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setFormData(prev => ({ ...prev, foto: e.target.files![0] }));
              }
            }}
          />
          
          {/* Preview de la imagen cargada */}
          {formData.foto && (
            <img
              src={URL.createObjectURL(formData.foto)}
              alt="Vista previa"
              className="mt-2 max-w-xs rounded-md border border-gray-300"
              onLoad={e => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // liberar memoria
            />
          )}
        </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Modificar</Button>
          <Button variant="destructive">Eliminar</Button>
          <Button onClick={handleRegister}>Registrar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
