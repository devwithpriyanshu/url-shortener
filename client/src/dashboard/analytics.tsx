/*

this component consists of two panels
1st panel displays a list of all the short links user has created these are selectable buttons & can be clicked to view the detail analytics of that particular link shown in the 2nd panel

*/
import { useState } from 'react';
import timestampToDate from '../../utils/TimestampToDate.tsx';
import { data } from '../constants.js';
import Links from './linkslist.tsx';

const Analytics = () => {
  const [id, setId] = useState('');
  const [link, setLink] = useState({
    shortId: '',
    redirectUrl: '',
    dateCreated: 0,
    numberOfClicks: 0,
    visitHistory: [{}],
  });

  function handleLinkChange(id: string) {
    setId(id);
    const linkData = data.find((link) => link.shortId === id);
    if (linkData) setLink({ ...linkData });
  }
  return (
    <div className=" flex ">
      <div className="flex-1 h-full">
        <Links handleLinkChange={handleLinkChange} />
      </div>

      <div className="flex-1 h-full">
        {id && (
          <div className="ml-4 mt-2">
            <h2 className="font-bold">Link Analytics</h2>
            <h3>Short URL: frontendurl/{link.shortId}</h3>
            <h4 className="font-semibold text-lg">
              Redirect URL: {link.redirectUrl}
            </h4>
            <p>Date Created: {timestampToDate(link.dateCreated)}</p>
            <p>Clicks: {link.numberOfClicks}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

/*
    *Improvement
    1.  handleLinkChange is fired when user selects a link, from there it picks up the shortId of the link that was clicked,
         then it stores the analytics associated with that shortId and update link state and updates the component with the updated data
        Problem: as link stores an object I can't set its default value as null to use the link state as conditional rendering.
         Therefore, I have created another state just for this it stores empty string by default and if any link is selected it stores shortId so it can used in conditional rendering
*/
