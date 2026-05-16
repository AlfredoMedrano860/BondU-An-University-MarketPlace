import usuarioIcono from "../../assets/imgs/IconoPerfil.png";
import SearchBar from "./SearchBar";

function AppHeader() {
  return (
    <div className="bg-primary px-6 pt-10 pb-6 text-white">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={usuarioIcono} alt="user" className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-sm">Welcome back!</p>
          <h2 className="text-xl font-bold">Alfredo</h2>
        </div>

      </div>

      <SearchBar />
      
    </div>
  );
}

export default AppHeader;
