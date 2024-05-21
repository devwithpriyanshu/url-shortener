import { useState } from "react";

export default function ClipboardCopy(copyText:string) {
    const [isCopied, setIsCopied] = useState(false);


    const handleCopyClick = () => {
      navigator.clipboard.writeText(copyText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <div>
        <input type="text" value={copyText} readOnly />
        <button onClick={handleCopyClick}>
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    );
  }


