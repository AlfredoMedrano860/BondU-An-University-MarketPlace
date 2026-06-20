/**
 * Diálogo de confirmación para cerrar sesión.
 *
 * > **Pendiente:** los botones aún no tienen handlers conectados; integrar con AuthStore.
 */

/**
 * Diálogo de error de credenciales inválidas en el registro o inicio de sesión.
 *
 * > **Pendiente:** texto hardcodeado en español; migrar a i18n y conectar handlers.
 * 
 * Crear un interfaz con icono, texto, titulo, metodos en botones, diferentes colores, a donde se le pasa los props
 */
interface CloseOrDeleteProps {
  title: string;
  message: string
  cancelText: string;
  confirmText: string;
  color: string;
  // onCancel: () => void;
  // onConfirm: () => void;
  icon?: string;
}

function CloseOrDelete({ title, message, cancelText, confirmText, color, icon }: CloseOrDeleteProps) {
return(
  <div className="mx-7.5 flex items-center justify-center min-h-screen">

    <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">

      <div className="flex flex-col items-center p-3.75 gap-3.75">

        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: color }}>
          {icon}
        </div>
        {title && (
          <h2 className="font-bold text-lg text-center">
            {title}
          </h2>)}

        <p className="text-gray-500 text-center">{message}</p>

        <button
          // onClick={}
          className="w-[calc(100%-60px)] mx-7.5 bg-white rounded-xl py-2 border-[0.5px]"
          style={{color: color,borderColor: color}}>
          {cancelText}
        </button>

        <button
          // onClick={}
          className="w-[calc(100%-60px)] mx-7.5 text-white rounded-xl py-2"
          style={{backgroundColor: color,}}>
          {confirmText}
        </button>

      </div>

      <div className="h-8"style={{backgroundColor: color}}
      />

    </div>

  </div>
  );
}
/*ejemplo de importacion
  <CloseOrDelete 
  title={t("dialogs.deleteAccount.title")}
  message={t("dialogs.deleteAccount.message")}
  cancelText={t("dialogs.deleteAccount.no")}
  confirmText={t("dialogs.deleteAccount.confirm")}
  color={t("dialogs.deleteAccount.color")}
  icon={t("dialogs.deleteAccount.icon")} />

  <CloseOrDelete 
  title={t("dialogs.logout.title")}
  message={t("dialogs.logout.message")}
  cancelText={t("dialogs.logout.no")}
  confirmText={t("dialogs.logout.confirm")}
  color={t("dialogs.logout.color")}
  icon={t("dialogs.logout.icon")} />
*/

export default CloseOrDelete;
