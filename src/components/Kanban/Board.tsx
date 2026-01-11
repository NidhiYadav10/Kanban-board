import { useState } from "react";
import { ColumnType } from "../../types";
import Column from "../Kanban/Column.tsx";

const initialData: ColumnType[] = [
    {
        id: "todo",
        title: "Todo",
        cards: [
            { id: "1", title: "Create project setup" },
            { id: "2", title: "Design UI layout" }
        ]
    },
    {
        id: "inprogress",
        title: "In Progress",
        cards: [{ id: "3", title: "Build Kanban board" }]
    },
    {
        id: "done",
        title: "Done",
        cards: []
    }
];

export default function KanbanBoard() {
    const [columns, setColumns] = useState<ColumnType[]>(initialData);

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10">
            <h1 className="text-3xl font-semibold text-slate-800 mb-8">
                Kanban Board
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                        columns={columns}
                        setColumns={setColumns}
                    />
                ))}
            </div>
        </div>
    );
}
