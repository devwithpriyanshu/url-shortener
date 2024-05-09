import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import Link from './Link.tsx';

interface LinksProps {
  handleLinkChange: (shortId: string) => void;
}
interface UrlData {
  _id: string;
  shortId: string;
  redirectURL: string;
  clicks: number;
  createdAt: number;
  updatedAt: number;
}

const items_per_page = 5;
const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

const Links: React.FC<LinksProps> = ({ handleLinkChange }) => {
  const [data, setData] = useState<UrlData[]>([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<UrlData[]>([]);
  const [maxPages, setMaxPages] = useState(1);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/user/geturls`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const linksData = await response.json();
        console.log(linksData);
        setData(linksData);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };
  if (data.length === 0) {
    return <EmptyUrls />;
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const start_item = (page - 1) * items_per_page;
    const end_item = start_item + items_per_page;
    setResults(data.slice(start_item, end_item));
  }, [data, page]);
  useEffect(() => {
    setMaxPages(Math.ceil(data.length / items_per_page));
  }, [data]);

  return (
    <>
      <ul className="h-[650px] grid gap-6">
        {results.map((link) => (
          <Link {...link} key={link._id} handleLinkChange={handleLinkChange} />
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 ">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || data.length === 0}
          >
            Prev
          </Button>
          <p>{page}</p>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === maxPages || data.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Links;

const EmptyUrls = () => {
  return <div>No URLs found</div>;
};
