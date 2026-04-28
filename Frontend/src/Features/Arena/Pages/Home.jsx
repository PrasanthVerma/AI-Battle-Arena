import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useArena from '../hooks/useArena';
import { useSelector } from 'react-redux';
import { fetchChats, fetchChatMessages } from '../services/chatHistory.api';

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

function ChatSidebar({ activeChatId, onSelectChat, onNewChat, refreshTrigger }) {
    const [chats, setChats] = useState([]);
    const [sidebarLoading, setSidebarLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setSidebarLoading(true);
        fetchChats()
            .then(setChats)
            .catch(() => setChats([]))
            .finally(() => setSidebarLoading(false));
    }, [refreshTrigger]);

    function formatDate(iso) {
        const d = new Date(iso);
        const now = new Date();
        const diffDays = Math.floor((now - d) / 86400000);
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    return (
        <aside
            className={`flex flex-col h-screen bg-surface border-r border-surface-highest/30 transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-14' : 'w-64'}`}
            style={{ position: 'sticky', top: 0 }}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-3 border-b border-surface-highest/30">
                {!collapsed && (
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">Chat History</span>
                )}
                <button
                    onClick={() => setCollapsed(c => !c)}
                    className="p-1.5 rounded-lg hover:bg-surface-low text-secondary hover:text-on-surface transition-colors ml-auto"
                    title={collapsed ? 'Expand' : 'Collapse'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {collapsed
                            ? <><path d="m9 18 6-6-6-6" /></>
                            : <><path d="m15 18-6-6 6-6" /></>
                        }
                    </svg>
                </button>
            </div>

            {/* New Chat Button */}
            <div className="p-2 border-b border-surface-highest/20">
                <button
                    onClick={onNewChat}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors text-sm ${collapsed ? 'justify-center' : ''}`}
                    title="New chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    {!collapsed && 'New Chat'}
                </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto py-2 space-y-0.5 px-1">
                {sidebarLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                    </div>
                ) : chats.length === 0 ? (
                    !collapsed && (
                        <p className="text-center text-xs text-secondary px-3 py-6">No chats yet.<br />Start a battle!</p>
                    )
                ) : (
                    chats.map(chat => (
                        <button
                            key={chat._id}
                            onClick={() => onSelectChat(chat._id)}
                            title={chat.title}
                            className={`w-full text-left flex items-center gap-2 px-2 py-2 rounded-xl transition-colors text-sm group ${activeChatId === chat._id
                                    ? 'bg-primary/15 text-primary'
                                    : 'hover:bg-surface-low text-on-surface/80 hover:text-on-surface'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {!collapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-xs font-medium">{chat.title}</p>
                                    <p className="text-[10px] text-secondary mt-0.5">{formatDate(chat.createdAt)}</p>
                                </div>
                            )}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
}

export default function Home() {
    const navigate = useNavigate();
    const handleArena = useArena();
    const { data, loading, error } = useSelector((state) => state.arena);
    const { user } = useSelector((state) => state.auth);
    const [input, setInput] = useState('');
    const [activeChatId, setActiveChatId] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setActiveChatId(null);
        setHistoryData(null);
        const result = await handleArena(input);
        if (result) setRefreshTrigger(t => t + 1);
        setInput('');
    };

    const handleSelectChat = async (chatId) => {
        setActiveChatId(chatId);
        setHistoryLoading(true);
        try {
            const data = await fetchChatMessages(chatId);
            setHistoryData(data);
        } catch {
            setHistoryData(null);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleNewChat = () => {
        setActiveChatId(null);
        setHistoryData(null);
    };

    // The data to display: either live result or historical chat
    const displayData = historyData?.messages?.[0] ?? data;

    return (
        <div className="flex h-screen bg-background text-on-surface font-sans overflow-hidden">
            {/* Sidebar */}
            <ChatSidebar
                activeChatId={activeChatId}
                onSelectChat={handleSelectChat}
                onNewChat={handleNewChat}
                refreshTrigger={refreshTrigger}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="flex items-center justify-between px-6 py-3 border-b border-surface-highest/30 bg-surface flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">⚡</span>
                        <span className="font-bold text-on-surface tracking-tight">AI Battle Arena</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {user && (
                            <span className="text-xs text-secondary font-medium hidden sm:block">
                                {user.username || user.displayName}
                            </span>
                        )}
                        <button
                            onClick={() => navigate('/logout')}
                            className="text-sm font-semibold text-secondary hover:text-red-400 transition-colors flex items-center gap-1.5 bg-surface-low px-3 py-1.5 rounded-xl border border-surface-highest/30 hover:border-red-500/30 hover:bg-red-500/10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-36">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {(loading || historyLoading) && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                            </div>
                        )}

                        {error && !loading && (
                            <div className="text-center py-12 text-red-400 bg-surface rounded-2xl">
                                <p className="text-xl font-semibold">Error</p>
                                <p className="text-sm mt-1">{typeof error === 'string' ? error : 'Failed to load data.'}</p>
                            </div>
                        )}

                        {displayData && !loading && !historyLoading && (
                            <>
                                <header className="bg-surface rounded-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,28,29,0.06)] relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="inline-flex items-center space-x-2 bg-surface-low px-3 py-1 rounded-full">
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Problem Statement</span>
                                        </div>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-on-surface">
                                        {displayData?.problem}
                                    </h1>
                                </header>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                    <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
                                        <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
                                            <div className="flex justify-between items-center mb-2">
                                                <h2 className="text-xl font-semibold">Model A</h2>
                                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                                    Score: {displayData?.judgement?.solution_1_score}/10
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
                                            <FormattedText text={displayData?.solution_1} />
                                        </div>
                                    </section>

                                    <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
                                        <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
                                            <div className="flex justify-between items-center mb-2">
                                                <h2 className="text-xl font-semibold">Model B</h2>
                                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                                    Score: {displayData?.judgement?.solution_2_score}/10
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
                                            <FormattedText text={displayData?.solution_2} />
                                        </div>
                                    </section>
                                </div>

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
                                                    Score: {displayData?.judgement?.solution_1_score}/10
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
                                                {displayData?.judgement?.solution_1_reasoning}
                                            </p>
                                        </div>
                                        <div className="bg-surface-low rounded-xl p-5 border border-surface-highest/30 flex flex-col">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Model B Reasoning</h3>
                                                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                                    Score: {displayData?.judgement?.solution_2_score}/10
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
                                                {displayData?.judgement?.solution_2_reasoning}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {!displayData && !loading && !historyLoading && !error && (
                            <div className="text-center py-20 bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)]">
                                <h2 className="text-3xl font-bold text-on-surface mb-4">Welcome to AI Battle Arena ⚔️</h2>
                                <p className="text-on-surface/70 max-w-lg mx-auto">
                                    Enter a prompt below to see two AI models compete in solving your problem. Our judge will evaluate both solutions and determine the winner!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Input Fixed Footer */}
                <div className="flex-shrink-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/95 to-transparent border-t border-surface-highest/20">
                    <div className="max-w-3xl mx-auto">
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
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
        </div>
    );
}
