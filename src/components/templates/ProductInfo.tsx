interface ProductInfoProps {
  name: string;
  price: number;
}

function ProductInfo({ name, price }: ProductInfoProps) {
  return (
    <div>

      <div className="flex justify-center mb-4">
        <span className="bg-primary text-white text-[11px] px-5 py-1 rounded-md font-medium"> NUEVO </span>
      </div>


      <div className="text-center mb-6">
        <h1 className="color-primary text-[38px] font-bold leading-none">{name}</h1>
        <p className="text-black text-[28px] mt-2">${price}</p>
      </div>
    </div>
  );
}

export default ProductInfo;