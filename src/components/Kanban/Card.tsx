import { useState } from "react";
import { CardType, ColumnType } from "../../types";

interface Props {
  card: CardType;
  columnId: string;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  indicatorColor: string;
}


export default function Card({
    card,
    columnId,
    columns,
    setColumns
}: Props) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(card.title);

    const deleteCard = () => {
        setColumns(
            columns.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((c) => c.id !== card.id) }
                    : col
            )
        );
    };

    const saveEdit = () => {
        setColumns(
            columns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.map((c) =>
                            c.id === card.id ? { ...c, title } : c
                        )
                    }
                    : col
            )
        );
        setEditing(false);
    };

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("cardId", card.id);
                e.dataTransfer.setData("fromColumnId", columnId);
            }}
            className="
    group
    bg-white
    border border-slate-200
    rounded-lg
    p-3
    shadow-sm
    cursor-grab
    transition-all duration-200 ease-out
    hover:-translate-y-1
    hover:shadow-lg
    active:scale-95
  "
        >
            {editing ? (
                <input
                    className="
        w-full text-sm
        border border-slate-300
        rounded-md
        px-2 py-1
        focus:outline-none
        focus:ring-2 focus:ring-slate-400
      "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={saveEdit}
                    autoFocus
                />
            ) : (
                <div
                    onDoubleClick={() => setEditing(true)}
                    className="text-sm text-slate-700 leading-snug"
                >
                    {title}
                </div>
            )}

            <button
                onClick={deleteCard}
                className="
      mt-2 text-xs text-red-500
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
    "
            >
                Delete
            </button>
        </div>
    );
}
