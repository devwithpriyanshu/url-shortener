import React from 'react';
import formatDate from '@/utils/formatDate';
import CopyToClipboardButton from '@/utils/CopyToClipboardButton.tsx';
import { BarChart } from 'lucide-react';

const {VITE_FRONTEND_URL} = import.meta.env;

interface LinkProps {
  clicks: number;
  createdAt: number;
  redirectURL: string;
  shortId: string;
  updatedAt: number;
  visitHistory?: any[]; // Assuming visitHistory is an array of any type,
  handleLinkChange: (shortId: string) => void;
}

const Link: React.FC<LinkProps> = ({
  clicks,
  createdAt,
  redirectURL,
  shortId,
  updatedAt,
  visitHistory,
  handleLinkChange,
}) => {
  return (
    <div className="relative flex items-center justify-between">
      <div className="relative flex shrink items-center">
        <div className="ml-2 sm:ml-4">
          <div className="flex max-w-fit flex-wrap items-center gap-x-2">
            <a
              href={`/${shortId}`}
              className="max-w-[140px] truncate text-sm font-semibold text-primary  sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]"
              target="_blank"
              rel="noreferrer"
            >
              {`${VITE_FRONTEND_URL}/${shortId}`}
            </a>
            <CopyToClipboardButton
              copyText={`${VITE_FRONTEND_URL}/${shortId}`}
              className="group rounded-full bg-background p-1.5 transition-all duration-75 hover:scale-105 hover:bg-background active:scale-95"
            />
          </div>
          <div className="flex max-w-fit items-center space-x-1">
            <p className="whitespace-nowrap text-sm text-gray-500">
              {updatedAt}
            </p>
            <p className="xs:block hidden">•</p>
            <a
              href={`/${shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="xs:block hidden max-w-[140px] truncate text-sm font-medium text-gray-700 underline-offset-2 hover:underline sm:max-w-[300px] md:max-w-[360px] xl:max-w-[420px]"
            >
              {redirectURL}
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <a className="flex items-center space-x-1 rounded-md bg-background px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100">
          <BarChart />
          <p className="whitespace-nowrap text-sm text-gray-500">
            {clicks}
            <span className="ml-1 hidden sm:inline-block">clicks</span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default Link;
