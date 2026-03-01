import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import Column from './Column';

import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function Board() {
    const navigate = useNavigate();
    const { columns, tasks, moveTask, reorderTasks } = useTasks();

    const handleTaskClick = (task) => {
        navigate(`/task/${task.id}`);
    };

    const [activeDragElement, setActiveDragElement] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragStart = (event) => {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        setActiveDragElement(task);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';
        const isOverColumn = over.data.current?.type === 'Column';

        if (!isActiveTask) return;

        // Moving task over another task
        if (isActiveTask && isOverTask) {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);

            if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                // Task moved to a different column over another task
                const newTasks = [...tasks];
                newTasks[activeIndex].columnId = tasks[overIndex].columnId;
                reorderTasks(arrayMove(newTasks, activeIndex, overIndex));
            }
        }

        // Moving task over a column directly (mostly when column is empty or dropping at the end)
        if (isActiveTask && isOverColumn) {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            if (tasks[activeIndex].columnId !== overId) {
                const newTasks = [...tasks];
                newTasks[activeIndex].columnId = overId;
                // Move to end of new column array
                reorderTasks(arrayMove(newTasks, activeIndex, newTasks.length - 1));
            }
        }
    };

    const handleDragEnd = (event) => {
        setActiveDragElement(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (activeIndex !== -1 && overIndex !== -1 && tasks[activeIndex].columnId === tasks[overIndex].columnId) {
            // Sorting within same column
            reorderTasks(arrayMove(tasks, activeIndex, overIndex));
        }
    };

    return (
        <div className="min-h-screen bg-transparent p-4 sm:p-6 md:p-10 flex flex-col animate-fade-in-up transition-all font-sans relative">
            {/* Ambient background glow elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none animate-pulse-soft"></div>
                <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px] pointer-events-none animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4 relative z-10 w-full">
                <div className="animate-slide-in-right">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 drop-shadow-sm mb-2">
                        Kanban Board
                    </h1>
                    <p className="text-gray-400 font-medium tracking-wide">Organize your tasks in a smart and simple way</p>
                </div>
                <button
                    onClick={() => navigate('/task/new')}
                    className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-bold flex items-center gap-2 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)] active:scale-95 border border-white/10 shrink-0">
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform group-hover:rotate-90 duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="relative z-10">New Task</span>
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pb-6 pt-2 flex-1 items-center md:items-start md:justify-center relative z-10 w-full overflow-x-auto">
                    {columns.map((col, index) => (
                        <Column
                            key={col.id}
                            index={index}
                            column={col}
                            tasks={tasks.filter(t => t.columnId === col.id)}
                            onTaskClick={handleTaskClick}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeDragElement ? <TaskCard task={activeDragElement} onClick={() => { }} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
