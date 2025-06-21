"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialogue } from "./new-agent-dialogue"
import { useState } from "react"
import { useAgentFilter } from "../hooks/use-agents-filter"
import { SearchFilters } from "./agents-search-filters"
import { DEFAULT_PAGE } from "@/constants"

export const ListHeader = () => {

    const [filters, setfilters] = useAgentFilter();
    const [isDialogueOpen, setIsDialogueOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setfilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewAgentDialogue open={isDialogueOpen} onOpenChange={setIsDialogueOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5>Agents</h5>
                    <Button onClick={() => setIsDialogueOpen((open) => !open)}>
                        <PlusIcon />
                        New agent
                    </Button>
                </div>
                <div className="flex items-center gap-x-2">
                    <SearchFilters />
                    {isAnyFilterModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}