 import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetchEquipo";
import { v4 as uuidv4 } from "uuid";
 
export default function EquipoForm() {
  const { getCatalogoEquipo} = useFetch();
   const [tipoDispositivo, setTipoDispositivo] = useState<number | null>(null);
  const [codigoActivo, setCodigoActivo] = useState<string>("");

  const [catalogo, setCatalogo] = useState({
    marcas: [],
    modelos: [],
    pertenece: [],
    procesadores: [],
    memorias: [],
    almacenamientos: [],
    empresasAlquiler: [],
    lotes: [],
    sedes: [],
    areas: [],
    tiposImpresora: [],
    estadosEquipo: [],
    tiposDispositivo: [], // Inicializado como array vacío en lugar de ["HOLA"]
  });



  const [formData, setFormData] = useState({
       serie : "",
       pertenece: "",
       comentario: "",
       fecha_instalacion: "",
       ip: "",
    });


const generarCodigoActivo = () => {
  const uuid = uuidv4().replace(/-/g, "").slice(0, 8); // Recorta el UUID si es muy largo
  const now = new Date();
  const fechaHora =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0") +
    now.getMilliseconds().toString().padStart(3, "0");

  return `${uuid}-${fechaHora}`;
};


    useEffect(() => {
        getCatalogoEquipo().then(data => {
          console.log('data catalogo:', data.data)
          setCatalogo(data.data);
           setCodigoActivo(generarCodigoActivo()); // <- aquí lo generas
           
        });
      }, []);

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
     };
  

     const handleRegister = async () => {
      console.log("SE PRESIONO REGISTRAR")
     }

  const renderLaptopFields = () => (
  <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
 
        <div>
          <Label>Marca</Label>
          <Select onValueChange={value => handleChange("marca_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una Marca" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.marcas.map((item: any) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Modelo</Label>
          <Select onValueChange={value => handleChange("modelo_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un Modelo" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.modelos.map((item: any) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Serie</Label>
          <Input
            value={formData.serie}
            onChange={e => handleChange("serie", e.target.value)}
          />
        </div>

        <div>
          <Label>Procesador</Label>
          <Select onValueChange={value => handleChange("procesador_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un Procesador" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.procesadores.map((item: any) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Memoria</Label>
          <Select onValueChange={value => handleChange("memoria_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una Memoria" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.memorias.map((item: any) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Almacenamiento</Label>
          <Select
            onValueChange={value => handleChange("almacenamiento_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un Almacenamiento" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.almacenamientos.map((item: any) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Pertenece</Label>
          <Select onValueChange={value => handleChange("pertenece", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona dónde pertenece" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.pertenece.map((item: any) => (
                <SelectItem key={item.value} value={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.pertenece === "ALQUILER" && (
          <div>
            <Label>Empresa de Alquiler</Label>
            <Select
              onValueChange={value => handleChange("empresa_alquiler_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una empresa" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.empresasAlquiler.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.pertenece === "LOTE" && (
          <div>
            <Label>Lote</Label>
            <Select onValueChange={value => handleChange("lote_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un lote" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.lotes.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="md:col-span-2">
          <Label>Comentario</Label>
          <Input
            value={formData.comentario}
            onChange={e => handleChange("comentario", e.target.value)}
          />
        </div> 
  </div>
);


 
    const renderImpresoraFields = () => (
  <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
  
        <div>
          <Label>Sede</Label>
          <Select onValueChange={val => handleChange("sede_id", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Sede" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.sedes.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Área</Label>
          <Select onValueChange={val => handleChange("area_id", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Área" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.areas.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tipo de Impresora</Label>
          <Select onValueChange={val => handleChange("tipo_impresora_id", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Tipo" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.tiposImpresora.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Dirección IP</Label>
          <Input
            value={formData.ip}
            placeholder="Ej. 192.168.1.100"
            onChange={e => handleChange("ip", e.target.value)}
          />
        </div>

        <div>
          <Label>Fecha de Instalación</Label>
          <Input
            type="date"
            value={formData.fecha_instalacion}
            onChange={e => handleChange("fecha_instalacion", e.target.value)}
          />
        </div>

        <div>
          <Label>Estado del Equipo</Label>
          <Select onValueChange={val => handleChange("estado_equipo_id", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Estado" />
            </SelectTrigger>
            <SelectContent>
              {catalogo.estadosEquipo.map((item: any) => (
                  <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Comentario</Label>
          <Input
            value={formData.comentario}
            onChange={e => handleChange("comentario", e.target.value)}
          />
        </div> 
  </div>
);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Registro de Equipo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tipo de Dispositivo</Label>
            
          </div>
            {renderLaptopFields()}
          {/* Resto de tu código permanece igual
          {codigoActivo && (
            <p className="text-sm text-muted-foreground">
              Código Activo: {codigoActivo}
            </p>
          )}

          {tipoDispositivo === 1 && renderLaptopFields()}
          {tipoDispositivo === 2 && renderImpresoraFields()}

          {!tipoDispositivo && (
            <p className="text-muted-foreground text-sm">
              Por favor selecciona un tipo de dispositivo para continuar con el registro.
            </p>
          )} */}
        </CardContent>
      </Card>
    </div>
  );

}
