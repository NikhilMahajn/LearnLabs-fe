import {Copy, Check,Lightbulb, AlertCircle} from 'lucide-react';
import { useState } from 'react';

export default function SectionRenderer({ section, index }) {

	const [copiedCode, setCopiedCode] = useState('');
	
	const copyToClipboard = async (code, id) => {
		try {
		await navigator.clipboard.writeText(code);
		setCopiedCode(id);
		setTimeout(() => setCopiedCode(''), 2000);
		} catch (err) {
		console.error('Failed to copy code:', err);
		}
 	 };

    switch (section.type) {
      case 'content':
        return (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="prose prose-lg max-w-none">
              {section.content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-gray-700 mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                  return (
                    <li key={i} className="text-gray-600 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-800">{section.title}</h3>
            </div>
            <div className="text-blue-700">
              {section.content.split('\n').map((line, i) => {
                if (line.startsWith('•')) {
                  return (
                    <li key={i} className="ml-4 mb-1">
                      {line.substring(2)}
                    </li>
                  );
                } else if (line.trim()) {
                  return <p key={i} className="mb-2">{line}</p>;
                }
                return null;
              })}
            </div>
          </div>
        );

      case 'code':
        const codeId = `code-${index}`;
        return (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                <span className="text-gray-300 text-sm font-medium">{section.language}</span>
                <button
                  onClick={() => copyToClipboard(section.content, codeId)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  {copiedCode === codeId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === codeId ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-gray-300 overflow-x-auto text-sm">
                <code>{section.content}</code>
              </pre>
            </div>
            {section.explanation && (
              <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{section.explanation}</p>
              </div>
            )}
          </div>
        );

      case 'tip':
        return (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">{section.content}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }