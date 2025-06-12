import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewAgentDialogue = ({
    open,
    onOpenChange
}: NewAgentDialogueProps) => {
    return (
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />  
        </ResponsiveDialog>
    )
}