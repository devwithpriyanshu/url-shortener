/*
Dashboard
  * user navbar contains user information on the navbar
  * dialog used for creating a new link
  * Analytics for detailed link analytics
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog.tsx';
import { MaxWidthWrapper } from '@/ui/MaxWidthWrapper.tsx';
import Divider from '../../ui/divider.tsx';
import { ModeToggle } from '@/ui/ModeToggle.tsx';
import CopyToClipboardButton from '../../utils/CopyToClipboardButton.tsx';

import URLForm from './url-form.tsx';
import Logout from '@/Authentication/Logout.tsx';
import Links from '@/pages/dashboard/Links.tsx';

export default function Dashboard() {
  //state variable for conditional rendering if inside URLForm the form submission is successful change the state variable, hide the URLForm and render a card with Shortened link inside it and add a copy button into it and if form submission is not successful change the state variable so that the URLForm is displayed
  const [dialogActive, setDialogActive] = useState(true);

  return (
    <>
      {/* <div className="h-dvh flex flex-col">
        <div className="flex h-32 justify-between items-center px-4 border-b">
          <UserNav />
          <Button variant="outline">
            <Logout />
          </Button>
        </div>
        <div className="flex-1 mx-16 my-8">
          <div className="flex justify-between">
            <h2 className="font-bold">Dashboard</h2>
            <Button>
              <Dialog>
                <DialogTrigger onClick={() => setDialogActive(true)}>
                  Create Link
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {dialogActive ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Create a short link</DialogTitle>
                      </DialogHeader>
                      <URLForm setDialogActive={setDialogActive} />
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Share the Shortened link</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <Input defaultValue={`shortid`} readOnly />
                        <CopyToClipboardButton value={`shortid`} />
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </Button>
          </div>
        </div>
      </div> */}
      <div className="min-h-screen w-full bg-background">
        <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
          <MaxWidthWrapper className='max-w-screen-2xl'>
            <div className="flex h-16 items-center justify-between ">
              <div className="flex items-center">
                <Link to="/" className="hidden sm:block font-bold">
                  {/* <NavLogo variant="symbol" isInApp /> */} Zipli
                </Link>
                <Divider className="hidden h-8 w-8 text-primary sm:ml-3 sm:block" />
                <h2 className="">Dashboard</h2>
              </div>
              <div className="flex items-center gap-4">
                {/* <Button>
                  <Dialog>
                    <DialogTrigger onClick={() => setDialogActive(true)}>
                      Create Link
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      {dialogActive ? (
                        <>
                          <DialogHeader>
                            <DialogTitle>Create a short link</DialogTitle>
                          </DialogHeader>
                          <URLForm setDialogActive={setDialogActive} />
                        </>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Share the Shortened link</DialogTitle>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <Input defaultValue={`shortid`} readOnly />
                            <CopyToClipboardButton copyText={`shortid`} />
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </Button> */}
                <Button>
                  <Logout />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
        <MaxWidthWrapper className='my-8'>
          <Links />
        </MaxWidthWrapper>
      </div>
    </>
  );
}

/*
Improvements
  1.  using DialogActive for condtional rendering escpecially because we have to pass it in the URLForm component to update its state
*/


