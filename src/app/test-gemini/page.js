'use client';

import { useState } from 'react';
import { testGeminiModels } from '@/actions/test-gemini';

export default function TestGeminiPage() {
    const [testing, setTesting] = useState(false);
    const [results, setResults] = useState(null);

    const runTest = async () => {
        setTesting(true);
        const result = await testGeminiModels();
        setResults(result);
        setTesting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Gemini API Model Test</h1>

                <button
                    onClick={runTest}
                    disabled={testing}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {testing ? 'Testing...' : 'Test Available Models'}
                </button>

                {results && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Results:</h2>
                        {results.success ? (
                            <div className="space-y-4">
                                {results.results.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border ${result.status === 'SUCCESS'
                                                ? 'bg-green-50 border-green-200'
                                                : 'bg-red-50 border-red-200'
                                            }`}
                                    >
                                        <div className="font-mono font-semibold">{result.model}</div>
                                        <div className="text-sm mt-1">
                                            Status: <span className="font-medium">{result.status}</span>
                                        </div>
                                        {result.error && (
                                            <div className="text-sm text-red-600 mt-1">
                                                Error: {result.error}
                                            </div>
                                        )}
                                        {result.statusCode && (
                                            <div className="text-sm text-gray-600">
                                                Status Code: {result.statusCode}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                Error: {results.error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
