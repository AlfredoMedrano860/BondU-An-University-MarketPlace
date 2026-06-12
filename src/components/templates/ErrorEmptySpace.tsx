function ErrorEmptySpace(){
    return(
<div className="mx-7.5 flex items-center justify-center min-h-screen">
  <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">
    <div className="flex flex-col items-center p-3.75 gap-3.75">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
        !
      </div>

      <p className="text-gray-500 text-center">
        Rellena todos los espacios
      </p>
    </div>

    <div className="h-8 bg-blue-600"></div>
  </div>
</div>
    );
}


export default ErrorEmptySpace;