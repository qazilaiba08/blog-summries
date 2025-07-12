'use client';
import { useState } from 'react';
import processBlog  from '@/lib/blogProcessing';
import type {BlogProcessingResult}  from "@/lib/blogProcessing";

export default function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [result,setResult] = useState<BlogProcessingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const processed = await processBlog(url);
      if (processed.error) {
        setError(processed.error);
      } else {
        setResult(processed);
      }
    } catch (err) {
      setError('Failed to process blog'+ err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-300 dark:from-zinc-900 dark:to-purple-800 text-gray-900 dark:text-white py-10">
  <div className="container mx-auto px-4">
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 space-y-6">

      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">🧠 AI Blog Summarizer</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="🔗 Paste blog URL..."
          className="flex-1 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-zinc-800"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-60 transition"
        >
          {loading ? "⏳ Processing..." : "Summarize"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-800/30 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">📝 Original Content</h2>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{result.originalText}</p>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">💡 English Summary</h2>
            <p className="text-gray-700 dark:text-gray-300">{result.summary}</p>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700" dir="rtl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">🗣️ اردو ترجمہ</h2>
            <p className="font-urdu text-gray-700 dark:text-gray-300">{result.translatedSummary}</p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
