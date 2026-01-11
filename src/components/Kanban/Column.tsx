import { ColumnType } from "../../types";
import Card from "../Kanban/Card.tsx";

interface Props {
    column: ColumnType;
    columns: ColumnType[];
    setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const columnStyles: Record<string, string> = {
  todo: "from-blue-500 to-blue-600",
  inprogress: "from-orange-400 to-orange-500",
  done: "from-green-400 to-green-500",
};

const indicatorStyles: Record<string, string> = {
  todo: "bg-yellow-400",
  inprogress: "bg-yellow-400",
  done: "bg-green-400",
};

export default function Column({ column, columns, setColumns }: Props) {
    const addCard = () => {
        const title = prompt("Enter card title");
        if (!title) return;

        setColumns(
            columns.map((col) =>
                col.id === column.id
                    ? {
                        ...col,
                        cards: [...col.cards, { id: Date.now().toString(), title }]
                    }
                    : col
            )
        );
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const fromColumnId = e.dataTransfer.getData("fromColumnId");

        if (fromColumnId === column.id) return;

        let movedCard: any;

        const updated = columns.map((col) => {
            if (col.id === fromColumnId) {
                movedCard = col.cards.find((c) => c.id === cardId);
                return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
            }
            return col;
        });

        setColumns(
            updated.map((col) =>
                col.id === column.id
                    ? { ...col, cards: [...col.cards, movedCard] }
                    : col
            )
        );
    };

    return (
        <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="bg-white rounded-xl shadow-md overflow-hidden"
        >
    <div
        className={`
        bg-gradient-to-r ${columnStyles[column.id]}
        text-white px-4 py-3
        flex items-center justify-between
        `}
    >
        <div className="flex items-center gap-2">
        <h2 className="font-semibold">{column.title}</h2>
        <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">
            {column.cards.length}
        </span>
        </div>

        <button
        onClick={addCard}
        className="
            bg-white/20 hover:bg-white/30
            transition rounded-md p-1
        "
        >
        +
        </button>
    </div>

    {/* Body */}
    <div className="p-4 space-y-3 bg-slate-50 min-h-[300px]">
        <button
        onClick={addCard}
        className="
            w-full flex items-center justify-center gap-2
            bg-white border border-slate-200
            rounded-lg py-2 text-sm
            hover:bg-slate-100
            transition
        "
        >
        + Add Card
        </button>

        {column.cards.map((card) => (
        <Card
            key={card.id}
            card={card}
            columnId={column.id}
            columns={columns}
            setColumns={setColumns}
            indicatorColor={indicatorStyles[column.id]}
        />
        ))}
    </div>
    </div>
    );
}
