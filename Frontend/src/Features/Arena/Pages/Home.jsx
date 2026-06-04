import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useArena from '../hooks/useArena';
import { useSelector } from 'react-redux';
import { fetchChats, fetchChatMessages } from '../services/chatHistory.api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const FormattedText = ({ text }) => {
    if (!text) return null;
    
    // Replace double-escaped newlines with actual newlines
    const processedText = text.replace(/\\n/g, '\n');

    return (
        <div className="markdown-body text-zinc-300 text-sm leading-relaxed font-outfit">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ node, children, ...props }) => (
                        <p className="mb-4 last:mb-0 leading-relaxed break-words" {...props}>
                            {children}
                        </p>
                    ),
                    h1: ({ node, children, ...props }) => (
                        <h1 className="text-2xl font-bold text-zinc-150 mt-6 mb-4 font-bebas tracking-wide" {...props}>
                            {children}
                        </h1>
                    ),
                    h2: ({ node, children, ...props }) => (
                        <h2 className="text-xl font-bold text-zinc-150 mt-5 mb-3 font-bebas tracking-wide" {...props}>
                            {children}
                        </h2>
                    ),
                    h3: ({ node, children, ...props }) => (
                        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2" {...props}>
                            {children}
                        </h3>
                    ),
                    h4: ({ node, children, ...props }) => (
                        <h4 className="text-base font-semibold text-zinc-300 mt-3 mb-1" {...props}>
                            {children}
                        </h4>
                    ),
                    ul: ({ node, children, ...props }) => (
                        <ul className="list-disc pl-6 mb-4 space-y-1.5 text-zinc-350" {...props}>
                            {children}
                        </ul>
                    ),
                    ol: ({ node, children, ...props }) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-zinc-350" {...props}>
                            {children}
                        </ol>
                    ),
                    li: ({ node, children, ...props }) => (
                        <li className="pl-1" {...props}>
                            {children}
                        </li>
                    ),
                    blockquote: ({ node, children, ...props }) => (
                        <blockquote className="border-l-4 border-amber-500/50 bg-zinc-900/30 pl-4 py-1 pr-2 rounded my-4 italic text-zinc-400" {...props}>
                            {children}
                        </blockquote>
                    ),
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isBlock = !inline && (match || String(children).includes('\n'));
                        
                        return isBlock ? (
                            <div className="relative my-4 group">
                                <div className="absolute top-0 right-0 flex items-center justify-end px-3 py-1 text-[10px] text-zinc-500 bg-zinc-900/60 rounded-bl border-l border-b border-zinc-850 font-mono select-none">
                                    {match ? match[1].toUpperCase() : 'CODE'}
                                </div>
                                <pre className="bg-zinc-950 p-4 rounded-xl font-mono text-xs md:text-sm overflow-x-auto border border-zinc-800/80 leading-5 pt-7">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            </div>
                        ) : (
                            <code className="bg-zinc-900/90 text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs border border-zinc-800" {...props}>
                                {children}
                            </code>
                        );
                    },
                    table: ({ node, children, ...props }) => (
                        <div className="overflow-x-auto my-6 border border-zinc-800/85 rounded-xl bg-zinc-900/10">
                            <table className="min-w-full divide-y divide-zinc-800" {...props}>
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ node, children, ...props }) => (
                        <thead className="bg-zinc-900/50" {...props}>
                            {children}
                        </thead>
                    ),
                    tbody: ({ node, children, ...props }) => (
                        <tbody className="divide-y divide-zinc-800/50" {...props}>
                            {children}
                        </tbody>
                    ),
                    tr: ({ node, children, ...props }) => (
                        <tr className="hover:bg-zinc-900/20 transition-colors" {...props}>
                            {children}
                        </tr>
                    ),
                    th: ({ node, children, ...props }) => (
                        <th className="px-4 py-3 text-left text-xs font-bold text-amber-500 uppercase tracking-wider font-bebas" {...props}>
                            {children}
                        </th>
                    ),
                    td: ({ node, children, ...props }) => (
                        <td className="px-4 py-2.5 text-xs md:text-sm text-zinc-300 align-top" {...props}>
                            {children}
                        </td>
                    ),
                    a: ({ node, children, ...props }) => (
                        <a className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                        </a>
                    ),
                    hr: ({ node, ...props }) => (
                        <hr className="my-6 border-zinc-800/80" {...props} />
                    )
                }}
            >
                {processedText}
            </ReactMarkdown>
        </div>
    );
};

const RenderMessage = ({ msg, index, total }) => {
    return (
        <div className="space-y-6 border-b border-zinc-900/60 pb-10 last:border-0 last:pb-0">
            {total > 1 && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">
                    <span>Round {index + 1}</span>
                    <div className="flex-1 h-[1px] bg-zinc-800/40" />
                </div>
            )}

            {/* Problem Statement Card */}
            <header className="bg-[#121418] rounded-xl border border-amber-500/20 p-5 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(234,179,8,0.05)] flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500/30" />
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase flex-shrink-0">
                    Problem Statement
                </div>
                <h1 className="font-bebas text-2xl tracking-wide text-zinc-100 flex-1 uppercase">
                    {msg?.problem}
                </h1>
            </header>

            {/* Model Response Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Model A Card */}
                <section className="bg-[#121418] rounded-xl border border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(234,179,8,0.03)] overflow-hidden flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
                    <div className="px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/40 flex justify-between items-center mt-[3px]">
                        <h2 className="text-2xl font-bebas text-amber-500 tracking-wider uppercase">Model A</h2>
                        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-3 py-1 rounded-full text-xs">
                            Score: {msg?.judgement?.solution_1_score}/10
                        </div>
                    </div>
                    <div className="p-5 md:p-6 overflow-y-auto max-h-[500px] flex-grow text-zinc-300 text-sm leading-relaxed scrollbar-thin">
                        <FormattedText text={msg?.solution_1} />
                    </div>
                </section>

                {/* Model B Card */}
                <section className="bg-[#121418] rounded-xl border border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.03)] overflow-hidden flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500" />
                    <div className="px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/40 flex justify-between items-center mt-[3px]">
                        <h2 className="text-2xl font-bebas text-blue-400 tracking-wider uppercase">Model B</h2>
                        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold px-3 py-1 rounded-full text-xs">
                            Score: {msg?.judgement?.solution_2_score}/10
                        </div>
                    </div>
                    <div className="p-5 md:p-6 overflow-y-auto max-h-[500px] flex-grow text-zinc-300 text-sm leading-relaxed scrollbar-thin">
                        <FormattedText text={msg?.solution_2} />
                    </div>
                </section>
            </div>

            {/* Judge's Verdict Card */}
            {msg?.judgement && (
                <section className="bg-[#121418] rounded-xl border border-amber-500/20 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(234,179,8,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500/30" />
                    <h2 className="text-2xl font-bebas tracking-wider text-amber-500 mb-6 flex items-center gap-2">
                        <span className="text-xl">⚖️</span>
                        Judge's Verdict
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Model A Reasoning */}
                        <div className="bg-zinc-900/40 rounded-xl p-5 border border-zinc-800/80 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[10px] font-bold text-amber-500/70 tracking-widest uppercase">Model A Reasoning</h3>
                                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                                    {msg?.judgement?.solution_1_score}/10
                                </div>
                            </div>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-400 flex-grow font-outfit">
                                {msg?.judgement?.solution_1_reasoning}
                            </p>
                        </div>
                        {/* Model B Reasoning */}
                        <div className="bg-zinc-900/40 rounded-xl p-5 border border-zinc-800/80 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[10px] font-bold text-blue-400/70 tracking-widest uppercase">Model B Reasoning</h3>
                                <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                                    {msg?.judgement?.solution_2_score}/10
                                </div>
                            </div>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-400 flex-grow font-outfit">
                                {msg?.judgement?.solution_2_reasoning}
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

function ChatSidebar({ activeChatId, onSelectChat, onNewChat, refreshTrigger }) {
    const [chats, setChats] = useState([]);
    const [sidebarLoading, setSidebarLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

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
            className={`flex flex-col h-screen bg-[#0e1014] border-r border-zinc-800/80 transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-14' : 'w-64'}`}
            style={{ position: 'sticky', top: 0 }}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/80">
                {!collapsed ? (
                    <div className="flex items-center gap-2">
                        <span className="text-amber-500 text-lg">⚡</span>
                        <span className="font-bebas text-amber-500 tracking-wider text-xl">AI Arena</span>
                    </div>
                ) : (
                    <span className="text-amber-500 text-lg mx-auto">⚡</span>
                )}
                <button
                    onClick={() => setCollapsed(c => !c)}
                    className="p-1.5 rounded-lg hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 transition-colors ml-auto"
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

            {/* New Battle Button */}
            <div className="p-3">
                <button
                    onClick={onNewChat}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-bebas tracking-[0.1em] transition-all text-xs uppercase cursor-pointer ${collapsed ? 'justify-center' : ''}`}
                    title="New battle"
                >
                    {!collapsed && 'New Battle'}
                </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1 px-2 scrollbar-thin">
                {!collapsed && (
                    <span className="text-[10px] font-bold text-amber-500/40 uppercase tracking-[0.2em] px-2 block mb-2">History</span>
                )}

                {sidebarLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500" />
                    </div>
                ) : chats.length === 0 ? (
                    !collapsed && (
                        <p className="text-center text-xs text-zinc-500 px-3 py-6 font-outfit">No battles yet.<br />Initiate a challenge!</p>
                    )
                ) : (
                    chats.map(chat => (
                        <button
                            key={chat._id}
                            onClick={() => onSelectChat(chat._id)}
                            title={chat.title}
                            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm group cursor-pointer ${activeChatId === chat._id
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            {!collapsed ? (
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-xs font-semibold">{chat.title}</p>
                                    <p className="text-[9px] opacity-40 mt-0.5">{formatDate(chat.createdAt)}</p>
                                </div>
                            ) : (
                                <span className="text-xs mx-auto opacity-60">💬</span>
                            )}
                        </button>
                    ))
                )}
            </div>

            {/* Sidebar Logout Button */}
            {!collapsed && (
                <div className="p-3 border-t border-zinc-800/80">
                    <button
                        onClick={() => navigate('/logout')}
                        className="w-full bg-transparent border border-zinc-800 hover:border-amber-500/60 hover:bg-amber-500/5 text-zinc-300 hover:text-amber-400 font-bebas tracking-[0.15em] text-xs uppercase rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </aside>
    );
}

export default function Home() {
    const navigate = useNavigate();
    const handleArena = useArena();
    const { data, loading, error, status, model1, model2, judge, streaming, } = useSelector((state) => state.arena);


    const { user } = useSelector((state) => state.auth);
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeChatId, setActiveChatId] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() && !selectedFile) return;

        const currentChatId = activeChatId;

        // If not in a current chat, clear display states to show the live loader
        if (!currentChatId) {
            setActiveChatId(null);
            setHistoryData(null);
        }

        const result = await handleArena(input, selectedFile, currentChatId,true);

        if (result) {
            setRefreshTrigger(t => t + 1);
            const nextChatId = currentChatId || result.chatId;
            if (nextChatId) {
                handleSelectChat(nextChatId);
            }
        }
        setInput('');
        setSelectedFile(null);
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
        setSelectedFile(null);
    };

    // The data to display: either live result or historical chat
    const displayData = historyData?.messages?.[0] ?? data;

    const showStreamingBattle = streaming && (model1 || model2 || judge || status);

    return (
        <div className="flex h-screen bg-[#0b0c0f] text-on-surface font-outfit overflow-hidden grid-bg">
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
                <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#0e1014]/60 backdrop-blur-md flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                        <span className="text-amber-500 text-sm">⚖️</span>
                        <span className="font-bebas text-amber-500 tracking-[0.2em] text-sm uppercase">Battle Arena </span>
                    </div>
                    <div className="flex items-center gap-3">
                        {user && (
                            <span className="text-xs text-zinc-400 font-semibold tracking-wider bg-zinc-900/80 px-3.5 py-1.5 rounded-xl border border-zinc-800/80 hidden sm:block">
                                {user.username || user.displayName}
                            </span>
                        )}
                    </div>
                </header>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-36 scrollbar-thin">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Initial/switch loading spinner */}
                        {(historyLoading || (loading && !activeChatId)) && (
                            <div className="flex justify-center items-center py-24">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
                            </div>
                        )}

                        {error && !loading && (
                            <div className="text-center py-12 text-red-400 bg-[#121418] border border-red-500/20 rounded-2xl shadow-lg">
                                <p className="text-xl font-bold font-bebas tracking-wide">SYSTEM ERROR</p>
                                <p className="text-sm mt-1 text-zinc-400">{typeof error === 'string' ? error : 'Failed to retrieve arena telemetry.'}</p>
                            </div>
                        )}

                        {/* Thread History Messages */}
                        {historyData?.messages && !historyLoading && (
                            <div className="space-y-12">
                                {historyData.messages.map((msg, index) => (
                                    <RenderMessage
                                        key={msg._id || index}
                                        msg={msg}
                                        index={index}
                                        total={historyData.messages.length}
                                    />
                                ))}
                            </div>
                        )}
                        {showStreamingBattle && (
                            <div className="space-y-6">
                                <div className="bg-surface rounded-xl border border-amber-500/20 p-4">
                                    <p className="text-xs uppercase tracking-wider text-amber-400">
                                        {status}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <section className="bg-surface rounded-xl border border-amber-500/20 overflow-hidden flex flex-col h-full relative">
                                        <div className="px-5 py-4 border-b border-zinc-800">
                                            <h2 className="text-2xl font-bebas text-amber-500">
                                                Model A
                                            </h2>
                                        </div>
                                        <div className="p-5 md:p-6 overflow-y-auto max-h-[500px] flex-grow text-zinc-300 text-sm leading-relaxed scrollbar-thin">
                                            <FormattedText text={model1} />
                                        </div>
                                    </section>
                                    <section className="bg-surface rounded-xl border border-blue-500/20 overflow-hidden flex flex-col h-full relative">
                                        <div className="px-5 py-4 border-b border-zinc-800">
                                            <h2 className="text-2xl font-bebas text-blue-400">
                                                Model B
                                            </h2>
                                        </div>
                                        <div className="p-5 md:p-6 overflow-y-auto max-h-[500px] flex-grow text-zinc-300 text-sm leading-relaxed scrollbar-thin">
                                            <FormattedText text={model2} />
                                        </div>
                                    </section>
                                </div>
                                {judge && (
                                    <section className="bg-surface rounded-xl border border-amber-500/20 p-6">
                                        <h2 className="text-2xl font-bebas text-amber-500 mb-4">
                                            Judge Verdict
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-amber-400 mb-2">Model A</h3>
                                                <p>
                                                    Score: {judge.solution_1_score}/10
                                                </p>
                                                <p className="text-zinc-400 mt-2">
                                                    {judge.solution_1_reasoning}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="text-blue-400 mb-2">Model B</h3>
                                                <p>
                                                    Score: {judge.solution_2_score}/10
                                                </p>
                                                <p className="text-zinc-400 mt-2">
                                                    {judge.solution_2_reasoning}
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}

                        {/* Live Single Message (non-thread mode) */}
                        {!historyData && data && !loading && (
                            <RenderMessage msg={data} index={0} total={1} />
                        )}

                        {/* Thinking indicator for consecutive messages in a thread */}
                        {loading && activeChatId && (
                            <div className="space-y-6 animate-pulse mt-12">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">
                                    <span>Round {historyData?.messages ? historyData.messages.length + 1 : 1}</span>
                                    <div className="flex-1 h-[1px] bg-zinc-850/40" />
                                </div>
                                <div className="bg-[#121418] rounded-xl border border-amber-500/20 p-6 flex items-center gap-4 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500/30" />
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500" />
                                    <span className="text-sm font-medium text-amber-400 font-outfit uppercase tracking-wider">Models are battling...</span>
                                </div>
                            </div>
                        )}

                        {/* Welcome screen */}
                        {!historyData && !data && !loading && !historyLoading && !error && (
                            <div className="text-center py-20 bg-[#121418] rounded-xl border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] max-w-2xl mx-auto p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500/10 via-amber-500/40 to-amber-500/10" />
                                <h2 className="text-3xl font-bebas text-amber-500 tracking-wide mb-4">Welcome to AI Battle Arena ⚔️</h2>
                                <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
                                    Enter a prompt below to see two AI models compete in solving your problem. Our judge will evaluate both solutions and determine the winner!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Input Fixed Footer */}
                <div className="flex-shrink-0 p-4 md:p-6 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/95 to-transparent border-t border-zinc-900/80">
                    <div className="max-w-3xl mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="relative flex flex-col bg-zinc-950/80 rounded-2xl border border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden p-2"
                        >
                            {/* File Preview Chip */}
                            {selectedFile && (
                                <div className="flex items-center gap-2 px-3 py-1.5 ml-2 mt-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl w-fit transition-all duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                    </svg>
                                    <span className="max-w-[200px] truncate font-medium">{selectedFile.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile(null)}
                                        className="p-0.5 rounded-full hover:bg-amber-500/20 text-amber-500 hover:text-amber-300 transition-colors cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center w-full">
                                {/* File Input Button */}
                                <label className="p-3 ml-1 bg-transparent hover:bg-zinc-900 text-zinc-500 hover:text-amber-500 rounded-xl transition-all duration-200 flex-shrink-0 cursor-pointer">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setSelectedFile(e.target.files[0]);
                                                e.target.value = '';
                                            }
                                        }}
                                        disabled={loading}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                </label>

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask the models a question..."
                                    className="w-full bg-transparent border-none outline-none text-zinc-100 px-3 py-3 placeholder:text-zinc-600 focus:ring-0 text-sm font-outfit"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={(!input.trim() && !selectedFile) || loading}
                                    className="p-3 mr-1 bg-zinc-900 hover:bg-zinc-800 text-amber-500 hover:text-amber-400 border border-zinc-800 hover:border-amber-500/40 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 cursor-pointer"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
