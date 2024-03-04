import tick from "../assets/tick.svg";
import copy from "../assets/copy.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Main() {
  const [url, setUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const params = useParams();
  const [copied, setCopied] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const frontend_url = "http://localhost:5173";

  async function handleGenerateNewUrl(e) {
    e.preventDefault();
    const response = await fetch(`${backend_url}/url/addurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (response.ok) {
      const data = await response.json();
      setShortedUrl(`${frontend_url}/` + data.shortId);
    }
  }
  async function handleGenerateCustomUrl(e) {
    e.preventDefault();

    const response = await fetch(`${backend_url}/url/addcustomurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (response.ok) {
      const data = response.json();
      console.log(data);
      setShortedUrl(`${frontend_url}/` + data.shortId);
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
          onSubmit={handleGenerateNewUrl}
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
          <button
            type="submit"
            className="px-5 py-3  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
          >
            Quick Generate
          </button>
        </form>
        <form
          className="mt-10 flex flex-col w-full"
          onSubmit={handleGenerateCustomUrl}
        ></form>
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
