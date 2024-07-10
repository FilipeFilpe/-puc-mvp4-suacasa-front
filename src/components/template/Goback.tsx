import { useNavigate } from "react-router-dom";

export function Goback() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)} className="font-normal underline text-blue-500 hover:text-blue-400 mt-4">
        Voltar
      </button>
    </div>
  )
}