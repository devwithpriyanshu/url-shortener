import React from "react";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <h1 className="text-2xl font-bold leading-[3.15] tracking-wider items-center">
          ShortIt
        </h1>

        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/devwithpriyanshu/", "_blank")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Quick & Easy <br className="max-md:hidden" />
        <span className="orange_gradient ">URL Shortener</span>
      </h1>
      <h2 className="desc">
        A simple, interactive and powerful URL shortening platform developed
        using NodeJS, Express & MongoDB. It allows you to create a unique URL
        for any long URL and also provides analytics of the clicks on that
        generated URL.
      </h2>
    </header>
  );
};

export default Hero;
