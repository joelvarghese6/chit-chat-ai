"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";    


export const MeetingsView = () => {

    const trpc = useTRPC();
    const {data} = useQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}