function DeleteAccount(){
    return(
<div className="mx-[30px] flex items-center justify-center min-h-screen">
  <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">
    <div className="flex flex-col items-center p-[15px] gap-[15px]">
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
        !
      </div>

      <p className="text-gray-500 text-center">
       ¿Seguro que quieres eliminar tu cuenta?
      </p>

      <button className="w-[calc(100%-60px)] mx-[30px] bg-white text-red-600 border-[0.5px] border-red-600 rounded-xl py-2">
        No
      </button>
      
      <button className="w-[calc(100%-60px)] mx-[30px] bg-red-600 text-white rounded-xl py-2">
        Eliminar definitivamente
      </button>
    </div>

    <div className="h-8 bg-red-600"></div>
  </div>
</div>
);
}

export default DeleteAccount;