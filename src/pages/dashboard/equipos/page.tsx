import { useState } from "react"

export default function Page() {

  const [ state, setState ] = useState("");

  return (
    <div>
      <h1>Equipos</h1>
      <select name="" id="" value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Seleccione un equipo</option>
        <option value="laptop">Laptop</option>
        <option value="impresora">Impresora</option>
      </select>

      { state === "" ? <h1>No ha seleccionado una opcion aun</h1> : <h1>Haz seleccionado { state }</h1>}
    </div>
  )
}
