import { Copy } from "lucide-react";

const CopyToClipboardButton: React.FC<{ value: string }> = ({ value }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

  return (
    <button type="submit" className="px-3" onClick={copyToClipboard}>
      <span className="sr-only">Copy</span>
      <Copy className="h-4 w-4" />
    </button>
  );
};

export default CopyToClipboardButton;
