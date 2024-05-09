import React from 'react';
import timestampToDate from '../../utils/TimestampToDate.tsx';

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
    <div>
      <button onClick={() => handleLinkChange(shortId)}>
        <p>Clicks: {clicks}</p>
        <p>Created At: {timestampToDate(createdAt)}</p>
        <p>Redirect URL: {redirectURL}</p>
        <p>Short ID: {shortId}</p>
        <p>Updated At: {timestampToDate(updatedAt)}</p>
        <p>Visit History: {JSON.stringify(visitHistory)}</p>
      </button>
    </div>
  );
};

export default Link;
