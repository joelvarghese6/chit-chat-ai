"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {

    const trpc = useTRPC();
    const { data, isLoading, isError } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}