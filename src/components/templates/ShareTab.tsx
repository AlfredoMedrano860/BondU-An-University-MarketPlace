import { CopySimpleIcon } from "@phosphor-icons/react";
import { appBaseUrl } from "../data/Terms";

interface ShareTabProps {
  productId: number;
}

function ShareTab({ productId }: ShareTabProps) {
  const url = `${appBaseUrl}/product/${productId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="mt-2">
      <p className="text-[16px] text-[hsl(26,11%,38%)] mb-3">Puedes compartir este artículo con este url:</p>

      <div className="flex items-center gap-0">
        <div className="relative flex-1">
          <input type="text" readOnly value={url} className="w-full h-12 rounded-full pl-5 pr-5 bg-search text-black text-[13px]" />
          <button onClick={handleCopy} className="cursor-pointer absolute right-0 top-0 h-12 w-12 bg-secondary rounded-full flex items-center justify-center">
            <CopySimpleIcon size={20} color="white" weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareTab;