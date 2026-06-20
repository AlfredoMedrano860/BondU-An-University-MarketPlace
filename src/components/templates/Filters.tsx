import { useState } from "react";
interface FiltersProps{
    onApply: () => void;
}
function Filtros({onApply}: FiltersProps) {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
    const [precio, setPrecio] = useState(0);

    const categorias = ["Nuevo", "Usado", "Detalle"];
    const carreras = ["ITM", "IE", "EL"];

    const botonBase = "px-4 py-2 rounded-full transition-all duration-200 font-medium";

    return (
        <div className="w-full max-w-sm bg-[#DAD1C2] rounded-3xl p-6 ">
            {/* Título */}
            <h2 className="text-[22px] font-bold text-[#5C7126] text-center mb-6">
                Filtros
            </h2>

            {/* Categorías */}
            <h3 className="text-[16px] text-[#5C7126] mb-3">Categorías</h3>

            <div className="flex gap-[10px] mb-6">
                {categorias.map((categoria) => (
                    <button
                        key={categoria}
                        onClick={() => setCategoriaSeleccionada(categoria)}
                        className={`${botonBase} ${categoriaSeleccionada === categoria
                                ? "bg-[#9BAA04] text-white"
                                : "bg-[#EEE7DD] text-[#8C8882]"
                            } flex-1` }
                    >
                        {categoria}
                    </button>
                ))}
            </div>
            {/* Carreras */}
            <h3 className="text-[16px] text-[#5C7126] mb-3">Carreras</h3>

            <div className="flex gap-[10px] mb-6">
                {carreras.map((carrera) => (
                    <button
                        key={carrera}
                        onClick={() => setCarreraSeleccionada(carrera)}
                        className={`${botonBase} ${carreraSeleccionada === carrera
                                ? "bg-[#9BAA04] text-white"
                                : "bg-[#EEE7DD] text-[#8C8882]"
                            } flex-1`}
                    >
                        {carrera}
                    </button>
                ))}
            </div>

            {/* Precio */}
            <h3 className="text-[16px] text-[#5C7126] mb-4">Precio</h3>

            <div className="mb-8">
                <input type="range" min="0" max="100" value={precio} 
                onChange={(e) => setPrecio(Number(e.target.value))}
                    className="w-full accent-[#9BAB00] cursor-pointer"
                />

                <div className="flex justify-center mt-2">
                    <span className="text-[#5C7126] font-medium">
                        ₡ {precio}
                    </span>
                </div>
            </div>

            {/* Aplicar */}
            <button className="w-full bg-[#9BAA04] text-[#EEE7DD] text-[22px] font-bold py-3 rounded-full hover:brightness-95 transition-all"
            onClick={onApply}>
                APLICAR
            </button>
        </div>
    );
}

export default Filtros;