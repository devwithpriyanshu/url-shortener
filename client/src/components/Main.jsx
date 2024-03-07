import tick from "../assets/tick.svg";
import copy from "../assets/copy.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Main() {
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const params = useParams();
  const [copied, setCopied] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const frontend_url = "https://qklink.vercel.app";

  async function handleGenerateUrl(e) {
    e.preventDefault();

    const response = await fetch(`${backendUrl}/api/url/addurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, id }),
    });
    if (response) {
      const result = await response.json();
      console.log(result);
      setShortedUrl(`${frontend_url}/` + result.data.shortId);
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };
  return (
    <section className="mt-16 w-full max-w-2xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="flex justify-center items-center gap-5"
          onSubmit={handleGenerateUrl}
        >
          <input
            type="url"
            placeholder="Enter the link to Short"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            className="url_input"
          />
          <input
            type="text"
            placeholder="Custom suffix to Url"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}
            className="url_input"
          />
          <button
            type="submit"
            className="px-5 py-3  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
          >
            Quick Generate
          </button>
        </form>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {shortedUrl && (
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="blue_gradient font-satoshi font-bold text-gray-600 text-xl">
              Shortened Url
            </h2>
            <div className="summary_box flex gap-2">
              <a href={shortedUrl} target="_blank">
                {shortedUrl}
              </a>
              <div className="copy_btn" onClick={() => handleCopy(shortedUrl)}>
                <img
                  src={copied === shortedUrl ? tick : copy}
                  alt={copied === shortedUrl ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Main;
