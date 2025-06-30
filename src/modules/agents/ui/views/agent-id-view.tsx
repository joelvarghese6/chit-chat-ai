"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { UpdateAgentDialog } from "../../components/update-agent-dialogue";

interface Props {
    agentId: string
}


export const AgentIdView = ({ agentId }: Props) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    const [updateAgentsDialogOpen, setUpdateAgentsDialogOpen] = useState(false);

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
                //queryClient.invalidateQueries(trpc.agents.getMany({}))
                router.push("/agents")
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    )

    return (
        <>
        <UpdateAgentDialog open={updateAgentsDialogOpen} onOpenChange={setUpdateAgentsDialogOpen} initialValues={data}/>
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-8">
            <AgentIdViewHeader
                agentId={data.id}
                agentName={data.name}
                onEdit={() => setUpdateAgentsDialogOpen(true)}
                onRemove={() => removeAgent.mutate({ id: data.id })}
            />
            <div className="bg-white rounded-lg border">
                <div className="px-4 py-4 gap-y-5 flex flex-col col-span-5">
                    <div className="flex items-center gap-x-3">
                        <GeneratedAvatar
                            variant="botttsNeutral"
                            seed={data.name}
                            classname="size-10"
                        />
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>
                    <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4">
                        <VideoIcon className="text-blue-700" />
                        {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
                    </Badge>
                    <div className="flex flex-col gap-y-4">
                        <p className="text-lg font-medium">Instructions</p>
                        <p className="text-neutral-800">{data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}

export const AgentIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agent"
            description="This may take a few seconds"
        />
    )
}

export const AgentIdViewError = () => {
    return (
        <ErrorState
            title="Error loading agent data"
            description="Something went wrong, try again later."
        />
    )
}