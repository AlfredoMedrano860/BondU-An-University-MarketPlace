function ErrorSignUp(){
    return(
<div className="mx-7.5 flex items-center justify-center min-h-screen">
  <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">
    <div className="flex flex-col items-center p-3.75 gap-3.75">
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
        X
      </div>

      <p className="text-gray-500 text-center">
        Usuario o contraseña incorrecto
      </p>

      <button className="w-[calc(100%-60px)] mx-7.5 bg-white text-red-600 border-[0.5px] border-red-600 rounded-xl py-2">
        Ok
      </button>
      
      <button className="w-[calc(100%-60px)] mx-7.5 bg-red-600 text-white rounded-xl py-2">
        Abandonar sitio
      </button>
    </div>

    <div className="h-8 bg-red-600"></div>
  </div>
</div>
);
}

export default ErrorSignUp;