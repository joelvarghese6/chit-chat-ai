import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { ListHeader } from "@/modules/agents/components/agents-list-header";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"

const Agents = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());


    return (
        <>
        <ListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={
                <LoadingState
                    title="Loading Agents"
                    description="This may take a few seconds"
                />
            }>
                <ErrorBoundary fallback={
                    <ErrorState
                        title="Error fetching agents"
                        description="The client was not able to successfully fetch the data."
                    />
                }>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default Agents;