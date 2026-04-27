import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArena from '../hooks/useArena';
import { useSelector } from 'react-redux';

const FormattedText = ({ text }) => {
    if (!text) return null;
    return (
        <div className="prose prose-sm md:prose-base prose-slate max-w-none">
            {text.split('\\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line.startsWith('```') ? (
                        <div className="bg-surface-highest p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto whitespace-pre">
                            {line}
                        </div>
                    ) : line.startsWith('###') ? (
                        <h3 className="text-lg font-semibold text-primary mt-6 mb-2">{line.replace('###', '')}</h3>
                    ) : (
                        <p className="mb-2 whitespace-pre-wrap leading-relaxed">{line}</p>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};


export default function Home() {

    const navigate = useNavigate();
    const handleArena = useArena();
    const { data, loading, error } = useSelector((state) => state.arena);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        await handleArena(input);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-background text-on-surface p-4 md:p-8 lg:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-8 pb-32">

                <div className="flex justify-end">
                    <button
                        onClick={() => navigate('/logout')}
                        className="text-sm font-semibold text-secondary hover:text-red-500 transition-colors flex items-center gap-2 bg-surface-low px-4 py-2 rounded-xl border border-surface-highest/30 hover:border-red-500/30 hover:bg-red-500/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-500">
                        <p className="text-xl font-semibold">Error</p>
                        <p>{typeof error === 'string' ? error : 'Failed to load data.'}</p>
                    </div>
                )}

                {data && !loading && (
                    <>
                        {/* Header / Problem Statement */}
                        <header className="bg-surface rounded-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,28,29,0.06)] relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className="inline-flex items-center space-x-2 bg-surface-low px-3 py-1 rounded-full">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Problem Statement</span>
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-on-surface">
                                {data?.problem}
                            </h1>
                        </header>

                        {/* Solutions Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                            {/* Solution 1 */}
                            <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
                                <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold">Model A</h2>
                                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                            Score: {data?.judgement?.solution_1_score}/10
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
                                    <FormattedText text={data?.solution_1} />
                                </div>
                            </section>

                            {/* Solution 2 */}
                            <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
                                <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold">Model B</h2>
                                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                            Score: {data?.judgement?.solution_2_score}/10
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
                                    <FormattedText text={data?.solution_2} />
                                </div>
                            </section>

                        </div>

                        {/* Judgement Section */}
                        <section className="bg-surface rounded-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,28,29,0.06)]">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-2xl">⚖️</span>
                                Judge's Verdict
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface-low rounded-xl p-5 border border-surface-highest/30 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Model A Reasoning</h3>
                                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                            Score: {data?.judgement?.solution_1_score}/10
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
                                        {data?.judgement?.solution_1_reasoning}
                                    </p>
                                </div>

                                <div className="bg-surface-low rounded-xl p-5 border border-surface-highest/30 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Model B Reasoning</h3>
                                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                            Score: {data?.judgement?.solution_2_score}/10
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
                                        {data?.judgement?.solution_2_reasoning}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {!data && !loading && !error && (
                    <div className="text-center py-20 bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)]">
                        <h2 className="text-3xl font-bold text-on-surface mb-4">Welcome to AI Battle Arena ⚔️</h2>
                        <p className="text-on-surface/70 max-w-lg mx-auto">Enter a prompt below to see two AI models compete in solving your problem. Our judge will evaluate both solutions and determine the winner!</p>
                    </div>
                )}

            </div>

            {/* Chat Input Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none pb-6 md:pb-10">
                <div className="max-w-4xl mx-auto pointer-events-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-center bg-surface-low rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-surface-highest overflow-hidden p-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the models a question..."
                            className="w-full bg-transparent border-none outline-none text-on-surface px-4 py-3 placeholder:text-secondary focus:ring-0"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="p-3 mr-1 bg-primary text-white rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 2-7 20-4-9-9-4Z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
