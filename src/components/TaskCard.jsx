import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function TaskCard({ task, onClick }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Priority color matching modern glass theme
    const priorityColors = {
        Low: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
        Medium: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
        High: 'bg-rose-500/20 text-rose-200 border-rose-500/30'
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white/5 border-2 border-dashed border-indigo-400/60 rounded-2xl h-[120px] backdrop-blur-md opacity-60 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onClick(task)}
            className="group relative bg-white/10 backdrop-blur-none p-5 rounded-2xl shadow-lg border border-white/10 cursor-grab hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] animate-scale-in flex flex-col gap-3"
        >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-2xl pointer-events-none"></div>

            <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-lg leading-tight group-hover:text-indigo-200 transition-colors drop-shadow-md">{task.title}</h3>
            </div>
            {task.description && (
                <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                    {task.description}
                </p>
            )}
            <div className="flex items-center justify-between mt-1">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${priorityColors[task.priority] || priorityColors.Low}`}>
                    {task.priority || 'Low'}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
