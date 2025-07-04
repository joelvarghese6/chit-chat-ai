import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingsView } from "@/modules/meetings/ui/view/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    const quertClient = getQueryClient();
    void quertClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    return (
        <>
            <MeetingsListHeader />
            <HydrationBoundary state={dehydrate(quertClient)}>
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
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Page;