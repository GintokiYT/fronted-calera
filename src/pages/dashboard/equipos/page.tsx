import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "@/hooks/useFetchEquipo";
import { Loader2Icon } from "lucide-react";

export default function EquipoForm() {
  const { getCatalogoEquipo, registrarEquipo } = useFetch();

  const [tipoDispositivo, setTipoDispositivo] = useState(1);
  const [codigoActivo, setCodigoActivo] = useState("");

  const [ loadingRegister, setLoadingRegister ] = useState(false);

  const handleRegistrar =  async () => {
    console.log("Registrar clickeado");
    let idPertenece: any = catalogo.pertenece.find((item: any) => item.label === formData.pertenece)!;  
    idPertenece = idPertenece?.value ?? "";  

    setLoadingRegister(true);
    registrarEquipo({
      ...formData,
      codigo_activo: codigoActivo,
      creador_id: JSON.parse(localStorage.getItem("user") || "{}").creador_id || "",
      pertenece_id: idPertenece,
      direccion_ip: formData.ip || "",
      estado_impresora_id: formData.estado_equipo_id || "",
      observaciones: formData.comentario || "",
    }).finally(() => {
      setCodigoActivo(generarCodigoActivo());
      setLoadingRegister(false);
    })
  };

  const handleModificar = () => {
    console.log("Modificar clickeado");
    // lógica para modificar equipo
  };

  const handleEliminar = () => {
    console.log("Eliminar clickeado");
    // lógica para eliminar equipo
  };

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
    tiposDispositivo: [],
  });

  const [formData, setFormData] = useState({
    tipoDispositivo: "",
    serie: "",
    pertenece: "",
    comentario: "",
    fecha_instalacion: "",
    ip: "",
    marca_id: "",
    modelo_id: "",
    procesador_id: "",
    memoria_id: "",
    almacenamiento_id: "",
    empresa_alquiler_id: "",
    lote_id: "",
    sede_id: "",
    area_id: "",
    tipo_impresora_id: "",
    estado_equipo_id: "",
    codigo_activo: ""
  });

  useEffect(() => {
    getCatalogoEquipo().then((data) => {
      setCatalogo(data);
      setCodigoActivo(generarCodigoActivo()); // ← Aquí generas el código
    });
  }, []);

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

  const handleChange = (field: string, value: string) => {
    if(field === "pertenece") {
      setFormData((prev) => ({ ...prev, empresa_alquiler_id: "", lote_id: "" }));
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTipoDispositivoChange = (val: string) => {

    setTipoDispositivo(Number(val));

    setFormData({
      tipoDispositivo: "",
      serie: "",
      pertenece: "",
      comentario: "",
      fecha_instalacion: "",
      ip: "",
      marca_id: "",
      modelo_id: "",
      procesador_id: "",
      memoria_id: "",
      almacenamiento_id: "",
      empresa_alquiler_id: "",
      lote_id: "",
      sede_id: "",
      area_id: "",
      tipo_impresora_id: "",
      estado_equipo_id: "",
      codigo_activo: ""
    });
  };


  useEffect(() => {
    const obtenerNombreDispositivo: any = catalogo.tiposDispositivo.find( (ele: any) => ele.value === +tipoDispositivo)!;
    setFormData((prev) => ({
      ...prev,
      tipoDispositivo: obtenerNombreDispositivo?.label || "LAPTOP",
    }))
  }, [tipoDispositivo]);

  const renderLaptopFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Marca</Label>
        <Select onValueChange={(value) => handleChange("marca_id", value)}>
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

      <div className="space-y-2">
        <Label>Modelo</Label>
        <Select onValueChange={(value) => handleChange("modelo_id", value)}>
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

      <div className="space-y-2">
        <Label>Serie</Label>
        <Input
          value={formData.serie}
          onChange={(e) => handleChange("serie", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Procesador</Label>
        <Select onValueChange={(value) => handleChange("procesador_id", value)}>
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

      <div className="space-y-2">
        <Label>Memoria</Label>
        <Select onValueChange={(value) => handleChange("memoria_id", value)}>
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

      <div className="space-y-2">
        <Label>Almacenamiento</Label>
        <Select
          onValueChange={(value) => handleChange("almacenamiento_id", value)}
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

      <div className="space-y-2">
        <Label>Pertenece</Label>
        <Select onValueChange={(value) => handleChange("pertenece", value)}>
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
        <div className="space-y-2">
          <Label>Empresa de Alquiler</Label>
          <Select
            onValueChange={(value) =>
              handleChange("empresa_alquiler_id", value)
            }
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
        <div className="space-y-2">
          <Label>Lote</Label>
          <Select onValueChange={(value) => handleChange("lote_id", value)}>
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
          onChange={(e) => handleChange("comentario", e.target.value)}
        />
      </div>
    </div>
  );

  const renderImpresoraFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <Label>Sede</Label>
        <Select onValueChange={(val) => handleChange("sede_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Sede" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.sedes.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Área</Label>
        <Select onValueChange={(val) => handleChange("area_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Área" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.areas.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Tipo de Impresora</Label>
        <Select onValueChange={(val) => handleChange("tipo_impresora_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Tipo" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.tiposImpresora.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Dirección IP</Label>
        <Input
          value={formData.ip}
          placeholder="Ej. 192.168.1.100"
          onChange={(e) => handleChange("ip", e.target.value)}
        />
      </div>

      <div>
        <Label>Fecha de Instalación</Label>
        <Input
          type="date"
          value={formData.fecha_instalacion}
          onChange={(e) => handleChange("fecha_instalacion", e.target.value)}
        />
      </div>

      <div>
        <Label>Estado del Equipo</Label>
        <Select onValueChange={(val) => handleChange("estado_equipo_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Estado" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.estadosEquipo.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2">
        <Label>Comentario</Label>
        <Input
          value={formData.comentario}
          onChange={(e) => handleChange("comentario", e.target.value)}
        />
      </div>
    </div>
  );

  const renderPCFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Marca</Label>
        <Select onValueChange={(val) => handleChange("marca_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Marca" />
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
        <Select onValueChange={(val) => handleChange("modelo_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Modelo" />
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
          onChange={(e) => handleChange("serie", e.target.value)}
        />
      </div>

      <div>
        <Label>Procesador</Label>
        <Select onValueChange={(val) => handleChange("procesador_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Procesador" />
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
        <Select onValueChange={(val) => handleChange("memoria_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Memoria" />
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
        <Label>Tipo de Disco</Label>
        <Input
          placeholder="Ej. SSD / HDD"
          onChange={(e) => handleChange("tipo_disco", e.target.value)}
        />
      </div>

      <div>
        <Label>Capacidad del Disco</Label>
        <Input
          placeholder="Ej. 256GB / 1TB"
          onChange={(e) => handleChange("capacidad_disco", e.target.value)}
        />
      </div>

      <div>
        <Label>Estado del Equipo</Label>
        <Select onValueChange={(val) => handleChange("estado_equipo_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Estado" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.estadosEquipo.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Pertenece</Label>
        <Select onValueChange={(value) => handleChange("pertenece", value)}>
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
            onValueChange={(value) =>
              handleChange("empresa_alquiler_id", value)
            }
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
          <Select onValueChange={(value) => handleChange("lote_id", value)}>
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
          onChange={(e) => handleChange("comentario", e.target.value)}
        />
      </div>
    </div>
  );

  const renderMonitorFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Marca</Label>
        <Select onValueChange={(val) => handleChange("marca_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Marca" />
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
        <Select onValueChange={(val) => handleChange("modelo_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Modelo" />
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
          onChange={(e) => handleChange("serie", e.target.value)}
        />
      </div>

      <div>
        <Label>Procesador</Label>
        <Select onValueChange={(val) => handleChange("procesador_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Procesador" />
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
        <Label>Estado del Equipo</Label>
        <Select onValueChange={(val) => handleChange("estado_equipo_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona Estado" />
          </SelectTrigger>
          <SelectContent>
            {catalogo.estadosEquipo.map((item: any) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Pertenece</Label>
        <Select onValueChange={(value) => handleChange("pertenece", value)}>
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
            onValueChange={(value) =>
              handleChange("empresa_alquiler_id", value)
            }
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
          <Select onValueChange={(value) => handleChange("lote_id", value)}>
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
          onChange={(e) => handleChange("comentario", e.target.value)}
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
          <div className="space-y-2">
            <Label>Tipo de Dispositivo</Label>
            <Select
              onValueChange={handleTipoDispositivoChange}
              value={tipoDispositivo.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona Tipo de Dispositivo" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(catalogo.tiposDispositivo) &&
                  catalogo.tiposDispositivo.map((item: any) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {codigoActivo && (
            <p className="text-sm text-muted-foreground">
              Código Activo: {codigoActivo}
            </p>
          )}

          {tipoDispositivo === 1 && renderLaptopFields()}
          {tipoDispositivo === 2 && renderImpresoraFields()}
          {tipoDispositivo === 3 && renderPCFields()}
          {tipoDispositivo === 4 && renderMonitorFields()}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button onClick={handleRegistrar} disabled={loadingRegister}>
            {loadingRegister && <Loader2Icon className="animate-spin" />}
            Registrar
          </Button>
          <Button onClick={handleModificar}>Modificar</Button>
          <Button onClick={handleEliminar} variant="destructive">
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
