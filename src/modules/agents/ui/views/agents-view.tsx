"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../../components/data-pagination";


export const AgentsView = () => {

    const [filters, setFilters] = useAgentFilter();

    const trpc = useTRPC();
    const { data, isLoading, isError } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 ? (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to make meetings. Each agent will follow your instructions and will talk with you accordingly"
                />
            ) : null}
        </div>
    )
}