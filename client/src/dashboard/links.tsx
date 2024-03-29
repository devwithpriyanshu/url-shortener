import { data } from "../constants.ts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import timestampToDate from "@/utils/TimestampToDate.tsx";
import CopyToClipboardButton from "@/utils/CopyToClipboardButton.tsx";

interface LinksProps {
  handleLinkChange: (shortId: string) => void;
}

const items_per_page = 5;

const Links: React.FC<LinksProps> = ({ handleLinkChange }) => {
  const [page, setPage] = useState(1);
  const start_item = (page - 1) * items_per_page;
  const end_item = start_item + items_per_page;
  const max_pages = Math.ceil(data.length / items_per_page);
  const [results, setResults] = useState(data.slice(start_item, end_item));

  useEffect(() => {
    setResults(data.slice(start_item, end_item));
  }, [page]);

  return (
    <>
      <ul className="h-[650px] grid gap-6">
        {results.map((link, index) => (
          <li
            key={index}
            className="border-gray-50 relative rounded-lg border-2 bg-white  shadow transition-all hover:shadow-md "
          >
            <button
              key={link.shortId}
              onClick={() => handleLinkChange(link.shortId)}
              className="w-full h-full sm:p-4 p-3 pr-1"
            >
              <div className="relative flex items-center justify-between">
                <div className="">
                  <div className="flex  items-center gap-2">
                    <h3>{`frontendurl/${link.shortId}`}</h3>
                    <CopyToClipboardButton
                      value={`frontendurl/${link.shortId}`}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p>{timestampToDate(link.dateCreated)}</p>
                    <p>
                      <a href={link.redirectUrl} target="_blank">
                        {link.redirectUrl}
                      </a>
                    </p>
                  </div>
                </div>
                <div>Clicks: {link.numberOfClicks}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 ">
          <Button
            onClick={() => setPage((page) => page - 1)}
            disabled={page == 1}
          >
            Prev
          </Button>
          <p>{page}</p>
          <Button
            onClick={() => setPage((page) => page + 1)}
            disabled={page == max_pages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Links;
