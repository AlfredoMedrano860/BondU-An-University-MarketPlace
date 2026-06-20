/**
 * Diálogo reutilizable para mensajes de éxito o error.
 *
 * Comparte la misma estructura con ErrorLogin y ErrorEmptySpace.
 *
 *
 * ErrorEmptySpace:
 * - mensaje: "Rellena todos los espacios"
 * - color: bg-blue-600
 */

interface SuccesfullProps {
  message: string;
  color: string;
  icon?: string;
}

  

function Succesfull({ message, color, icon }: SuccesfullProps) {
  return (
    <div className="mx-7.5 flex items-center justify-center min-h-screen">

      <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">

        <div className="flex flex-col items-center p-3.75 gap-3.75">

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>

          <p className="text-gray-500 text-center">
            {message}
          </p>

        </div>

        <div
          className="h-8"
          style={{ backgroundColor: color }}
        />

      </div>

    </div>
  );
}

/* ejemplo de importación

<Succesfull
  message={{t("dialogs.EmptySpace.message)}
  color={{t("dialogs.EmptySpace.color)}
  icon={{t("dialogs.EmptySpace.icon)}
/>

<Succesfull
  message={{t("dialogs.succesfull.message)}
  color={{t("dialogs.succesfull.color)}
  icon={{t("dialogs.succesfull.icon)}
/>
*/

export default Succesfull;