import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const data = {
//   "problem": "write a code to sort an array of integers in ascending order",
//   "solution_1": "Here's a simple code snippet to sort an array of integers in ascending order using the **Bubble Sort** algorithm in Python:\n\n### Python Code (Bubble Sort)\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# Example usage\narray = [64, 34, 25, 12, 22, 11, 90]\nsorted_array = bubble_sort(array)\nprint(\"Sorted array:\", sorted_array)\n```\n\n### Output:\n```\nSorted array: [11, 12, 22, 25, 34, 64, 90]\n```\n\n---\n\n### Alternative (Using Python's Built-in `sorted()`)\nFor simplicity, you can also use Python's built-in `sorted()` function:\n```python\narray = [64, 34, 25, 12, 22, 11, 90]\nsorted_array = sorted(array)\nprint(\"Sorted array:\", sorted_array)\n```\n\n### Alternative (Using `list.sort()` for In-Place Sorting)\n```python\narray = [64, 34, 25, 12, 22, 11, 90]\narray.sort()\nprint(\"Sorted array:\", array)\n```\n\n---\n\n### JavaScript Code (Bubble Sort)\n```javascript\nfunction bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap\n            }\n        }\n    }\n    return arr;\n}\n\n// Example usage\nlet array = [64, 34, 25, 12, 22, 11, 90];\nlet sortedArray = bubbleSort(array);\nconsole.log(\"Sorted array:\", sortedArray);\n```\n\n### JavaScript (Using `Array.sort()`)\n```javascript\nlet array = [64, 34, 25, 12, 22, 11, 90];\narray.sort((a, b) => a - b);\nconsole.log(\"Sorted array:\", array);\n```\n\n---\n\n### C++ Code (Using `std::sort`)\n```cpp\n#include <iostream>\n#include <algorithm>\n#include <vector>\n\nint main() {\n    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};\n    std::sort(arr.begin(), arr.end());\n\n    std::cout << \"Sorted array: \";\n    for (int num : arr) {\n        std::cout << num << \" \";\n    }\n    return 0;\n}\n```\n\n### Output:\n```\nSorted array: 11 12 22 25 34 64 90\n```",
//   "solution_2": "Certainly! Below is a Python code that sorts an array of integers in ascending order using the built-in `sorted()` function. If you'd like to implement a specific sorting algorithm (like Bubble Sort, Merge Sort, or Quick Sort), let me know!\n\n```python\ndef sort_array(arr):\n    return sorted(arr)\n\n# Example usage:\narray = [64, 34, 25, 12, 22, 11, 90]\nsorted_array = sort_array(array)\nprint(\"Sorted array:\", sorted_array)\n```\n\n**Output:**\n```\nSorted array: [11, 12, 22, 25, 34, 64, 90]\n```\n\n### Alternative: Using Bubble Sort (for educational purposes)\n\nHere’s an implementation of Bubble Sort to sort the array in ascending order:\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        # Flag to detect if any swapping happened\n        swapped = False\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                swapped = True\n        # If no elements were swapped, the array is already sorted\n        if not swapped:\n            break\n    return arr\n\n# Example usage:\narray = [64, 34, 25, 12, 22, 11, 90]\nsorted_array = bubble_sort(array)\nprint(\"Sorted array using Bubble Sort:\", sorted_array)\n```\n\n**Output:**\n```\nSorted array using Bubble Sort: [11, 12, 22, 25, 34, 64, 90]\n```\n\nLet me know if you'd like to see other sorting algorithms!",
//   "judgement": {
//       "solution_1_score": 9,
//       "solution_2_score": 8,
//       "solution_1_reasoning": "Solution 1 provides comprehensive examples in multiple programming languages (Python, JavaScript, C++) and demonstrates both custom implementations (Bubble Sort) and built-in functions for sorting. This breadth makes it a very thorough and useful solution. The inclusion of different languages and both custom and built-in methods addresses the problem from multiple angles.",
//       "solution_2_reasoning": "Solution 2 correctly solves the problem using Python and offers both a simple built-in function approach and an alternative Bubble Sort implementation. However, it is limited to Python and doesn't explore as many options or languages as Solution 1. The inclusion of the `swapped` flag in the Bubble Sort is a good optimization, but overall, the solution is less comprehensive than Solution 1."
//   }
// };

// const FormattedText = ({ text }) => {
//   return (
//     <div className="prose prose-sm md:prose-base prose-slate max-w-none">
//       {text.split('\\n').map((line, i) => (
//         <React.Fragment key={i}>
//           {line.startsWith('```') ? (
//             <div className="bg-surface-highest p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto whitespace-pre">
//               {line}
//             </div>
//           ) : line.startsWith('###') ? (
//             <h3 className="text-lg font-semibold text-primary mt-6 mb-2">{line.replace('###', '')}</h3>
//           ) : (
//             <p className="mb-2 whitespace-pre-wrap leading-relaxed">{line}</p>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

export default function App() {
  // const [input, setInput] = useState('');
  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
    
  //   console.log("Sending to backend:", input);
  //   setInput('');
  // };

  // return (
  //   <div className="min-h-screen bg-background text-on-surface p-4 md:p-8 lg:p-12 font-sans">
  //     <div className="max-w-6xl mx-auto space-y-8 pb-32">
        
  //       {/* Header / Problem Statement */}
  //       <header className="bg-surface rounded-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,28,29,0.06)] relative">
  //         <div className="flex justify-between items-start mb-4">
  //           <div className="inline-flex items-center space-x-2 bg-surface-low px-3 py-1 rounded-full">
  //             <span className="w-2 h-2 rounded-full bg-primary"></span>
  //             <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Problem Statement</span>
  //           </div>
  //           <button
  //             onClick={() => navigate('/logout')}
  //             className="text-sm font-semibold text-secondary hover:text-red-500 transition-colors flex items-center gap-2 bg-surface-low px-4 py-2 rounded-xl border border-surface-highest/30 hover:border-red-500/30 hover:bg-red-500/10"
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
  //               <polyline points="16 17 21 12 16 7"></polyline>
  //               <line x1="21" y1="12" x2="9" y2="12"></line>
  //             </svg>
  //             Logout
  //           </button>
  //         </div>
  //         <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-on-surface">
  //           {data.problem}
  //         </h1>
  //       </header>

  //       {/* Solutions Grid */}
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
  //         {/* Solution 1 */}
  //         <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
  //           <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
  //             <div className="flex justify-between items-center mb-2">
  //               <h2 className="text-xl font-semibold">Model A</h2>
  //               <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
  //                 Score: {data.judgement.solution_1_score}/10
  //               </div>
  //             </div>
  //           </div>
  //           <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
  //              <FormattedText text={data.solution_1} />
  //           </div>
  //         </section>

  //         {/* Solution 2 */}
  //         <section className="bg-surface rounded-2xl shadow-[0_12px_40px_rgba(26,28,29,0.06)] overflow-hidden flex flex-col h-full">
  //           <div className="p-6 md:p-8 border-b border-surface-highest/50 bg-gradient-to-br from-surface to-surface-low">
  //              <div className="flex justify-between items-center mb-2">
  //               <h2 className="text-xl font-semibold">Model B</h2>
  //               <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
  //                 Score: {data.judgement.solution_2_score}/10
  //               </div>
  //             </div>
  //           </div>
  //           <div className="p-6 md:p-8 overflow-y-auto max-h-[600px] flex-grow">
  //              <FormattedText text={data.solution_2} />
  //           </div>
  //         </section>

  //       </div>

  //       {/* Judgement Section */}
  //       <section className="bg-surface rounded-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(26,28,29,0.06)]">
  //         <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
  //           <span className="text-2xl">⚖️</span> 
  //           Judge's Verdict
  //         </h2>
          
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           <div className="bg-surface-low rounded-xl p-5 border border-surface-highest/30 flex flex-col">
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Model A Reasoning</h3>
  //               <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
  //                 Score: {data.judgement.solution_1_score}/10
  //               </div>
  //             </div>
  //             <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
  //               {data.judgement.solution_1_reasoning}
  //             </p>
  //           </div>
            
  //           <div className="bg-surface-low rounded-xl p-5 border border-surface-highest/30 flex flex-col">
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Model B Reasoning</h3>
  //               <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
  //                 Score: {data.judgement.solution_2_score}/10
  //               </div>
  //             </div>
  //             <p className="text-sm md:text-base leading-relaxed text-on-surface/90 flex-grow">
  //               {data.judgement.solution_2_reasoning}
  //             </p>
  //           </div>
  //         </div>
  //       </section>

  //     </div>

  //     {/* Chat Input Fixed Footer */}
  //     <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none pb-6 md:pb-10">
  //       <div className="max-w-4xl mx-auto pointer-events-auto">
  //         <form 
  //           onSubmit={handleSubmit}
  //           className="relative flex items-center bg-surface-low rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-surface-highest overflow-hidden p-2"
  //         >
  //           <input
  //             type="text"
  //             value={input}
  //             onChange={(e) => setInput(e.target.value)}
  //             placeholder="Ask the models a question..."
  //             className="w-full bg-transparent border-none outline-none text-on-surface px-4 py-3 placeholder:text-secondary focus:ring-0"
  //           />
  //           <button 
  //             type="submit"
  //             disabled={!input.trim()}
  //             className="p-3 mr-1 bg-primary text-white rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //               <path d="m22 2-7 20-4-9-9-4Z"/>
  //               <path d="M22 2 11 13"/>
  //             </svg>
  //           </button>
  //         </form>
  //       </div>
  //     </div>

  //   </div>
  // );
}
