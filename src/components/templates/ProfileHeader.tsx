import usuarioIcono from "../../assets/imgs/IconoPerfil.png";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <div className="bg-primary px-6 pt-10 pb-16 text-white flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img src={usuarioIcono} alt="user" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm opacity-80">{email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;