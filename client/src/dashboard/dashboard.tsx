/*
Dashboard
  * user navbar contains user information on the navbar
  * dialog used for creating a new link
  * Analytics for detailed link analytics
*/

import { UserNav } from "./user-nav.tsx";
import Analytics from "./analytics.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import CopyToClipboardButton from "@/utils/CopyToClipboardButton.tsx";
import URLForm from "./url-form.tsx";

export default function Dashboard() {
  //state variable for conditional rendering if inside URLForm the form submission is successful change the state variable, hide the URLForm and render a card with Shortened link inside it and add a copy button into it and if form submission is not successful change the state variable so that the URLForm is displayed
  const [dialogActive, setDialogActive] = useState(true);

  return (
    <>

        <div className="h-dvh flex flex-col">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="ml-auto flex items-center space-x-8">
              <UserNav />
            </div>
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
            <Analytics />
          </div>
        </div>
    </>
  );
}

/*
Improvements
  1.  using DialogActive for condtional rendering escpecially because we have to pass it in the URLForm component to update its state
*/
