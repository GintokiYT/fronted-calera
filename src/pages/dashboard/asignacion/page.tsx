import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useFetch } from "@/hooks/useFetch";
// import SignaturePad from "./SignaturePad"; // Componente personalizado para firmas
// import PdfPreview from "./PdfPreview"; // Componente para previsualizar PDF

export default function AsignacionUbicacionPage() {
  // const { getCatalogoAsignacion, registrarAsignacion } = useFetch();
  
   const [catalogo, setCatalogo] = useState({
    empleados: [],
     tiposDispositivo: [],
     ubicaciones: []
   });

  const [formData, setFormData] = useState({
    codigo_activo: "",
    fecha_asignacion: new Date().toISOString().split('T')[0],
    host_name: "",
    empleado_id: "",
    tipo_dispositivo_id: "",
    ubicacion_id: "",
   documento_pdf: null as File | null,
     firma: null as string | null // Base64 de la firma
  });

  // useEffect(() => {
  //   getCatalogoAsignacion().then(data => {
  //     setCatalogo(data.data);
  //   });
  // }, []);

 const handleChange = (field: string, value: string) => {
     setFormData(prev => ({ ...prev, [field]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFormData(prev => ({ ...prev, documento_pdf: e.target.files![0] }));
  //   }
  // };

  // const handleSignatureSave = (signatureData: string) => {
  //   setFormData(prev => ({ ...prev, firma: signatureData }));
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const formDataToSend = new FormData();
      
  //     // Agregar campos del formulario
  //     Object.keys(formData).forEach(key => {
  //       if (key !== 'documento_pdf' && key !== 'firma' && formData[key as keyof typeof formData]) {
  //         formDataToSend.append(key, formData[key as keyof typeof formData]);
  //       }
  //     });

  //     // Agregar archivo PDF si existe
  //     if (formData.documento_pdf) {
  //       formDataToSend.append("pdf", formData.documento_pdf);
  //     }

  //     // Agregar firma si existe
  //     if (formData.firma) {
  //       formDataToSend.append("firma", formData.firma);
  //     }

  //     const result = await registrarAsignacion(formDataToSend);
  //     console.log("Asignación registrada:", result);
  //     // Resetear formulario o redireccionar
      
  //   } catch (error) {
  //     console.error("Error al registrar asignación:", error);
  //   }
  // };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Asignación de Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos del formulario */}
          <div className="space-y-2">
            <Label>Código de Activo</Label>
            <Input
              value={formData.codigo_activo}
              onChange={e => handleChange("codigo_activo", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Fecha de Asignación</Label>
            <Input
              type="date"
              value={formData.fecha_asignacion}
              onChange={e => handleChange("fecha_asignacion", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Host Name</Label>
            <Input
              value={formData.host_name}
              onChange={e => handleChange("host_name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Empleado</Label>
            <Select onValueChange={value => handleChange("empleado_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un empleado" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.empleados.map((empleado: any) => (
                  <SelectItem key={empleado.id} value={empleado.id.toString()}>
                    {`${empleado.nombre} ${empleado.apellido} (${empleado.numero_documento})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Dispositivo</Label>
            <Select onValueChange={value => handleChange("tipo_dispositivo_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.tiposDispositivo.map((tipo: any) => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Select onValueChange={value => handleChange("ubicacion_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una ubicación" />
              </SelectTrigger>
              <SelectContent>
                {catalogo.ubicaciones.map((ubicacion: any) => (
                  <SelectItem key={ubicacion.id} value={ubicacion.id.toString()}>
                    {ubicacion.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Componente para subir PDF */}
          <div className="col-span-2 space-y-2">
            <Label>Documento PDF</Label>
            <Input 
              type="file" 
              accept="application/pdf"
              // onChange={handleFileChange}
            />
            {/* {formData.documento_pdf && (
              // <PdfPreview file={formData.documento_pdf} />
            )} */}
          </div>

          {/* Componente para firma digital */}
          <div className="col-span-2 space-y-2">
            <Label>Firma Digital</Label>
            {/* <SignaturePad onSave={handleSignatureSave} /> */}
            {formData.firma && (
              <img 
                src={formData.firma} 
                alt="Firma" 
                className="mt-2 border rounded"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={() => console.log("GUARDAR ASIGNACION")}>Guardar Asignación</Button>
        </CardFooter>
      </Card>
    </div>
  );
}