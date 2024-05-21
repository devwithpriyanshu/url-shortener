import useLinks from '../../hooks/use-links';
import PageLoader from '../../ui/PageLoader';
import Link from './Link';

export default function Links() {
  const { data, error, isLoading } = useLinks();
  console.log(data);

  if (error) return <div>Error Occured</div>;
  if (isLoading) return <PageLoader />;
  if (!data || data.length === 0) {
    return <div>No links found.</div>;
  }

  return (
    <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5">
      <ul className="grid min-h-[66.5vh] auto-rows-min gap-3">
        {data.map((link) => (
          <li
            key={link.shortId}
            className="border-border relative rounded-lg border-2 bg-background p-3 pr-1 shadow transition-all hover:shadow-md sm:p-4"
          >
            <Link {...link} />
          </li>
        ))}
      </ul>
      <div className="sticky bottom-0 mt-4 flex h-20 scale-[1.02] flex-col items-center justify-center space-y-2 rounded-t-md border border-border bg-background shadow-lg">
        <div className="flex items-center gap-4">
          <button className="text-primary flex min-w-[1.5rem] items-center justify-center rounded-md bg-background p-1 font-semibold transition-all hover:bg-background">
            Prev
          </button>
          <p className="text-primary flex min-w-[1.5rem] items-center justify-center rounded-md bg-background p-1 font-semibold transition-all hover:bg-background">
            1
          </p>
          <button className="text-primary flex min-w-[1.5rem] items-center justify-center rounded-md bg-background p-1 font-semibold transition-all hover:bg-background">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
