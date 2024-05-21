import Login from '@/Authentication/Login';
import { Button } from '@/components/ui/button';
import { MaxWidthWrapper } from '@/ui/MaxWidthWrapper';
import { ModeToggle } from '@/ui/ModeToggle';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <div className="flex h-16 items-center justify-between ">
            <Link to="/" className="hidden sm:block font-bold">
              Zipli
            </Link>

            <div className="flex items-center gap-4">
              <Button size="lg">
                <Link
                  to="/login"
                >
                  Get Started
                </Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <section className="bg-background">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Unlock Your Link's Potential.
              <strong className="font-extrabold text-primary sm:block">
                Shorten, Track, Analyze, Succeed!{' '}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed font-light">
              Zipli is more than just a link shortener. We've built a suite of
              powerful features that gives you marketing superpowers.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg">
                <Link
                  to="/login"
                >
                  Get Started
                </Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
