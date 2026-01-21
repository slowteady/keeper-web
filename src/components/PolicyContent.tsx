'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PolicyContentProps {
  content: string;
}

export function PolicyContent({ content }: PolicyContentProps) {
  return (
    <article className="policy-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">{children}</h1>
          ),
          h2: ({ children }) => <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">{children}</h4>,
          p: ({ children }) => <p className="text-sm text-gray-700 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-outside ml-5 text-sm text-gray-700 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 text-sm text-gray-700 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          hr: () => <hr className="my-6 border-gray-200" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse border border-gray-200">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-200">{children}</tr>,
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border border-gray-200">{children}</th>
          ),
          td: ({ children }) => <td className="px-3 py-2 text-gray-700 border border-gray-200">{children}</td>,
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">{children}</pre>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
