import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function Column({ column, tasks, onTaskClick, index }) {
    const { setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    return (
        <div
            className="flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl w-full max-w-[340px] md:w-[320px] shrink-0 transition-all duration-300 hover:bg-white/15 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
        >
            <div className="p-5 border-b border-white/10 flex justify-between items-center rounded-t-3xl bg-black/20 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[slide-in-right_3s_infinite_ease-in-out]" style={{ animationDelay: `${index * 500}ms` }}></div>
                <h2 className="font-bold text-lg text-white flex items-center gap-3 relative z-10">
                    <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] ${column.id === 'todo' ? 'bg-blue-400' :
                        column.id === 'in-progress' ? 'bg-yellow-400' :
                            column.id === 'done' ? 'bg-green-400' : 'bg-purple-400'
                        }`}></span>
                    {column.title}
                </h2>
                <span className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full shadow-inner backdrop-blur-md relative z-10">
                    {tasks.length}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto min-h-[500px] scroll-smooth"
            >
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                    ))}
                </SortableContext>

                {tasks.length === 0 && (
                    <div className="text-center text-white/50 py-10 text-sm border-2 border-dashed border-white/20 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-white/40 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50 mb-1 group-hover:scale-110 group-hover:opacity-80 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="font-medium tracking-wide">Ready for tasks</span>
                    </div>
                )}
            </div>
        </div>
    );
}
