import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addTask, updateTask, deleteTask, columns, tasks } = useTasks();

    const isNew = !id || id === 'new';

    // Find existing task if editing
    const existingTask = !isNew ? tasks.find(t => t.id === id) : null;

    // Redirect to home if invalid ID provided
    useEffect(() => {
        if (!isNew && !existingTask) {
            navigate('/');
        }
    }, [isNew, existingTask, navigate]);

    const [formData, setFormData] = useState({
        title: existingTask?.title || '',
        description: existingTask?.description || '',
        priority: existingTask?.priority || 'Medium',
        columnId: existingTask?.columnId || 'todo'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        if (isNew) {
            addTask(formData);
        } else if (existingTask) {
            updateTask(existingTask.id, formData);
        }

        // Go back to the board
        navigate('/');
    };

    const handleDelete = () => {
        if (existingTask && window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(existingTask.id);
            navigate('/');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    // Before redirect resolves to avoid flickering
    if (!isNew && !existingTask) return null;

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-transparent relative animate-fade-in-up">
            {/* Ambient background glow elements from the Board theme */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none animate-pulse-soft"></div>
            <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px] pointer-events-none animate-pulse-soft" style={{ animationDelay: '1s' }}></div>

            <div className="bg-[#1e1e2e]/95 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden relative z-10 mx-4" onClick={e => e.stopPropagation()}>
                {/* Decorative background glow inside modal */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-[50px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                        {isNew ? 'New Task' : 'Edit Task'}
                    </h2>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wide">Task Title <span className="text-pink-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Add Task Name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 shadow-inner"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wide">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Add details about this task..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 resize-none shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wide">Status</label>
                            <select
                                name="columnId"
                                value={formData.columnId}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 shadow-inner appearance-none cursor-pointer"
                            >
                                {columns.map(col => (
                                    <option key={col.id} value={col.id} className="bg-gray-800 text-white">{col.title}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wide">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 shadow-inner appearance-none cursor-pointer"
                            >
                                <option value="Low" className="bg-gray-800 text-white">Low</option>
                                <option value="Medium" className="bg-gray-800 text-white">Medium</option>
                                <option value="High" className="bg-gray-800 text-white">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                        {!isNew ? (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-4 py-2.5 rounded-xl transition-colors text-sm font-bold flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        ) : <div />}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 text-sm font-bold active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] text-sm font-bold active:scale-95"
                            >
                                {isNew ? 'Create Task' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
