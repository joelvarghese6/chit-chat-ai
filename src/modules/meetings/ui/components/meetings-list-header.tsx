"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"

export const MeetingsListHeader = () => {

    const [openNewMeetingDialog, setOpenNewMeetinngDialog] = useState(false);

    return (
        <>
            <NewMeetingDialog open={openNewMeetingDialog} onOpenChange={setOpenNewMeetinngDialog}/>
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5>My Meetings</h5>
                    <Button onClick={() => setOpenNewMeetinngDialog(true)}>
                        <PlusIcon />
                        New Meetings
                    </Button>
                </div>
                <div className="flex items-center gap-x-2">
                    TODO
                </div>
            </div>
        </>
    )
}