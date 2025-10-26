'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          temperature: temperature,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.response);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err: any) {
      setError(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-circle absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="floating-circle absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float-delayed"></div>
        <div className="floating-circle absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-float-slow"></div>
      </div>

      <div className={`relative z-10 container mx-auto px-4 py-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <header className="text-center mb-12 animate-slide-down">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            <span className="inline-block animate-glow">AI</span>{' '}
            <span className="inline-block animate-glow-delayed">Content</span>{' '}
            <span className="inline-block animate-glow-slow">Generator</span>
          </h1>
          <p className="text-xl text-blue-200 animate-fade-in">
            Powered by Google Gemini 2.0 Flash
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="prompt" className="block text-white text-lg font-semibold">
                  Enter Your Prompt
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me anything..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="temperature" className="block text-white text-lg font-semibold">
                  Temperature: <span className="text-blue-300">{temperature.toFixed(1)}</span>
                </label>
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-blue-200">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Response'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl animate-shake">
                <p className="text-red-200 text-center font-semibold">{error}</p>
              </div>
            )}

            {response && (
              <div className="mt-6 p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 animate-fade-in-up">
                <h3 className="text-white text-xl font-bold mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Response
                </h3>
                <div className="text-blue-50 whitespace-pre-wrap leading-relaxed">
                  {response}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-12 text-blue-200 animate-fade-in">
          <p className="text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
