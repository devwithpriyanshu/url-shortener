import { Spin } from 'antd';
const PageLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
