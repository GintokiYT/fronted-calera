import { useFetch } from "@/hooks/useFetch"
import { useEffect } from "react";

export default function Page() {

  const { getCharacter } = useFetch();

  useEffect(() => {
    getCharacter().then(data => {
      console.log('data: ', data);
    })
  }, []);

  return (
    <div>Usuarios</div>
  )
}
