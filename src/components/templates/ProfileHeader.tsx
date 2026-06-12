/**
 * Props de ProfileHeader.
 */
interface ProfileHeaderProps {
  /** Nombre de usuario a mostrar. */
  name: string;
  /** Correo electrónico del usuario. */
  email: string;
  /** URL del avatar del usuario. */
  avatar: string;
}

/**
 * Encabezado de perfil del usuario.
 *
 * Muestra el avatar, nombre y correo del usuario.
 * Usado en {@link SettingsScreen} como cabecera de la pantalla de ajustes.
 *
 * @param name - Nombre de usuario a mostrar.
 * @param email - Correo electrónico del usuario.
 * @param avatar - URL del avatar del usuario.
 */
function ProfileHeader({ name, email, avatar }: ProfileHeaderProps) {
  return (
    <div className="bg-primary px-6 sm:px-10 md:px-16 lg:px-20 pt-10 pb-6 text-white flex items-center gap-4 shadow-md">

      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img src={avatar} alt="user" className="w-full h-full object-cover" />
      </div>

      {/* Nombre y correo */}
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm opacity-80">{email}</p>
      </div>

    </div>
  );
}

export default ProfileHeader;