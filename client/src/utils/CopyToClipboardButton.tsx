import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  copyText: string
}

export default function CopyToClipboardButton ({className, copyText} : ButtonProps){

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (copyText:string) => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

  return (
    <button className={cn('px-3', className)} onClick={()=>copyToClipboard(copyText)}>
      <span className="sr-only">Copy</span>
      {isCopied ? <Check size={16}/> : <Copy size={16} />}
    </button>
  );
};
