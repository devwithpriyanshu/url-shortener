import {  LoaderIcon } from 'lucide-react';
const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderIcon size="32px" className='animate-spin' />
    </div>
  );
};

export default PageLoader;
