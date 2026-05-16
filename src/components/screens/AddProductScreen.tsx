import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { useState, useRef } from "react";
import { CirclePlus } from "lucide-react";

interface AddProductScreenProps {
  onBack: () => void;
}

function AddProductScreen({ onBack }: AddProductScreenProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
  // Documentación para agregar una imagen
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSave = () => {
    //Aqui no se como añadir estos datos al arreglo
    // para que aparezcan en home y market
    // De momento solo esta este console.log
    // para ver si funciona.
    // Si gustan pueden trabajar en ello.
    console.log({ name, price, state, description, image });
    onBack();
  };

  return (
    <div className="h-screen bg-[#eee7dd] overflow-y-auto no-scrollbar">

      <div className="relative w-full h-72.5 bg-white overflow-hidden">

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>

        <div className="w-full h-full bg-[#d9cfc4] flex items-center justify-center">
          {image ? ( <img src={image} alt="preview" className="w-full h-full object-cover" /> ) : ( <CirclePlus size={60} color="hsl(67, 100%, 35%)" strokeWidth={1} />)}
        </div>

        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>

        <button onClick={() => fileInputRef.current?.click()} className=" color-primary absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center" >
          <CirclePlus size={24} color="hsl(54, 80%, 63%)" strokeWidth={1.5} />
        </button>
      </div>


      <div className="bg-[#eee7dd] px-4 pt-6 pb-10">
        <h1 className="color-primary text-[32px] font-bold text-center mb-6">Nuevo Producto</h1>

        <div className="flex flex-col gap-4">
          <InputSpace placeholder="Nombre del producto..." value={name} onChange={setName} />
          <InputSpace placeholder="Precio del producto..." value={price} onChange={setPrice} />
          <InputSpace placeholder="Estado del producto..." value={state} onChange={setState} />
          <InputSpace placeholder="Descripción del producto..." value={description} onChange={setDescription} multiline />
        </div>

        <div className="mt-8">
          <PrimaryButton text="GUARDAR" onClick={handleSave} />
        </div>
      </div>

    </div>
  );
}

export default AddProductScreen;