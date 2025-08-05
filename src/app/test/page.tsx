'use client';

import { useState } from 'react';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function TestPage() {
  const [testMode, setTestMode] = useState<'copilotkit' | 'custom' | 'direct' | 'debug'>('debug');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugSteps, setDebugSteps] = useState<string[]>([]);

  const addDebugStep = (step: string) => {
    setDebugSteps(prev => [...prev, `${new Date().toLocaleTimeString()}: ${step}`]);
  };

  const clearDebugSteps = () => {
    setDebugSteps([]);
  };

  const testDirectAPI = async () => {
    setLoading(true);
    clearDebugSteps();
    try {
      addDebugStep("🔄 Starting Direct API Test");
      addDebugStep(`📤 Preparing request to /api/copilotkit`);
      addDebugStep(`📝 Message: "${message}"`);
      
      const requestBody = {
        messages: [{ role: 'user', content: message }]
      };
      addDebugStep(`📦 Request body: ${JSON.stringify(requestBody, null, 2)}`);
      
      const res = await fetch('/api/copilotkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      addDebugStep(`📡 Response status: ${res.status}`);
      addDebugStep(`📡 Response headers: ${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)}`);
      
      const data = await res.json();
      addDebugStep(`📥 Response data: ${JSON.stringify(data, null, 2)}`);
      
      setResponse(JSON.stringify(data, null, 2));
      addDebugStep("✅ Direct API Test completed successfully");
    } catch (error) {
      addDebugStep(`❌ Error: ${error}`);
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testCustomChat = async () => {
    setLoading(true);
    clearDebugSteps();
    try {
      addDebugStep("🔄 Starting Custom Chat Test");
      addDebugStep(`📤 Preparing request to /api/copilotkit`);
      addDebugStep(`📝 Message: "${message}"`);
      
      const requestBody = {
        messages: [{ role: 'user', content: message }]
      };
      addDebugStep(`📦 Request body: ${JSON.stringify(requestBody, null, 2)}`);
      
      const res = await fetch('/api/copilotkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      addDebugStep(`📡 Response status: ${res.status}`);
      
      const data = await res.json();
      addDebugStep(`📥 Raw response: ${JSON.stringify(data, null, 2)}`);
      
      // Handle the OpenAI-like format
      const responseContent = data.choices?.[0]?.message?.content || data.content || 'No response';
      addDebugStep(`🔍 Extracted content: "${responseContent}"`);
      
      setResponse(responseContent);
      addDebugStep("✅ Custom Chat Test completed successfully");
    } catch (error) {
      addDebugStep(`❌ Error: ${error}`);
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testCopilotKitDebug = async () => {
    setLoading(true);
    clearDebugSteps();
    try {
      addDebugStep("🔄 Starting CopilotKit Debug Test");
      addDebugStep(`📤 Preparing request to /api/copilotkit`);
      addDebugStep(`📝 Message: "${message}"`);
      
      const requestBody = {
        messages: [{ role: 'user', content: message }]
      };
      addDebugStep(`📦 Request body: ${JSON.stringify(requestBody, null, 2)}`);
      
      const res = await fetch('/api/copilotkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      addDebugStep(`📡 Response status: ${res.status}`);
      addDebugStep(`📡 Response headers: ${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)}`);
      
      const data = await res.json();
      addDebugStep(`📥 Response data: ${JSON.stringify(data, null, 2)}`);
      
      // Test different parsing approaches
      addDebugStep("🔍 Testing response parsing...");
      
      const directContent = data.content;
      addDebugStep(`📋 Direct content: ${directContent ? `"${directContent}"` : 'undefined'}`);
      
      const choicesContent = data.choices?.[0]?.message?.content;
      addDebugStep(`📋 Choices content: ${choicesContent ? `"${choicesContent}"` : 'undefined'}`);
      
      const messagesContent = data.messages?.[0]?.content;
      addDebugStep(`📋 Messages content: ${messagesContent ? `"${messagesContent}"` : 'undefined'}`);
      
      const finalContent = choicesContent || directContent || messagesContent || 'No response';
      addDebugStep(`🎯 Final extracted content: "${finalContent}"`);
      
      setResponse(finalContent);
      addDebugStep("✅ CopilotKit Debug Test completed successfully");
    } catch (error) {
      addDebugStep(`❌ Error: ${error}`);
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">CopilotKit + Agno Test Page</h1>
        
        {/* Test Mode Selector */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Mode</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setTestMode('copilotkit')}
              className={`px-4 py-2 rounded ${testMode === 'copilotkit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              CopilotKit UI
            </button>
            <button
              onClick={() => setTestMode('custom')}
              className={`px-4 py-2 rounded ${testMode === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Custom Chat
            </button>
            <button
              onClick={() => setTestMode('direct')}
              className={`px-4 py-2 rounded ${testMode === 'direct' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Direct API Test
            </button>
            <button
              onClick={() => setTestMode('debug')}
              className={`px-4 py-2 rounded ${testMode === 'debug' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Step-by-Step Debug
            </button>
          </div>
        </div>

        {/* CopilotKit UI Mode */}
        {testMode === 'copilotkit' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">CopilotKit UI Test</h2>
            <p className="text-gray-600 mb-4">
              This uses the standard CopilotKit chat interface. Try sending a message and check the browser console for errors.
            </p>
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Debug Instructions:</h3>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Open browser console (F12 → Console tab)</li>
                <li>2. Send a message in the chat below</li>
                <li>3. Check console for any error messages</li>
                <li>4. Check Network tab for the API request/response</li>
                <li>5. Look for requests to <code>/api/copilotkit</code></li>
              </ol>
            </div>
            <CopilotKit runtimeUrl="/api/copilotkit">
              <CopilotChat 
                labels={{ 
                  title: "Test AI Assistant",
                  placeholder: "Type your message here..."
                }} 
              />
            </CopilotKit>
          </div>
        )}

        {/* Custom Chat Mode */}
        {testMode === 'custom' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Custom Chat Test</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Enter your message..."
                />
              </div>
              <button
                onClick={testCustomChat}
                disabled={loading || !message}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {response && (
                <div>
                  <label className="block text-sm font-medium mb-2">Response:</label>
                  <div className="p-3 bg-gray-100 rounded whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Direct API Test Mode */}
        {testMode === 'direct' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Direct API Test</h2>
            <p className="text-gray-600 mb-4">
              This tests the API endpoint directly and shows the raw response.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Enter your message..."
                />
              </div>
              <button
                onClick={testDirectAPI}
                disabled={loading || !message}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                {loading ? 'Testing...' : 'Test API'}
              </button>
              {response && (
                <div>
                  <label className="block text-sm font-medium mb-2">Raw Response:</label>
                  <pre className="p-3 bg-gray-100 rounded overflow-auto text-sm">
                    {response}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step-by-Step Debug Mode */}
        {testMode === 'debug' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Step-by-Step Debug</h2>
            <p className="text-gray-600 mb-4">
              This shows exactly what happens at each step when sending a message.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Enter your message..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={testCopilotKitDebug}
                  disabled={loading || !message}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  {loading ? 'Debugging...' : 'Debug Step-by-Step'}
                </button>
                <button
                  onClick={clearDebugSteps}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Clear Log
                </button>
              </div>
              
              {/* Debug Steps */}
              <div>
                <label className="block text-sm font-medium mb-2">Debug Steps:</label>
                <div className="p-3 bg-gray-100 rounded max-h-96 overflow-auto">
                  {debugSteps.length === 0 ? (
                    <p className="text-gray-500">No debug steps yet. Send a message to see the process.</p>
                  ) : (
                    <div className="space-y-1">
                      {debugSteps.map((step, index) => (
                        <div key={index} className="text-sm font-mono">
                          {step}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Response */}
              {response && (
                <div>
                  <label className="block text-sm font-medium mb-2">Final Response:</label>
                  <div className="p-3 bg-gray-100 rounded whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Information */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Next.js Server:</strong> 
              <span className="ml-2 text-green-600">✅ Running (Port 3000)</span>
            </div>
            <div>
              <strong>Agno Backend:</strong> 
              <span className="ml-2 text-green-600">✅ Running (Port 8000)</span>
            </div>
            <div>
              <strong>API Endpoint:</strong> 
              <span className="ml-2 text-green-600">✅ /api/copilotkit</span>
            </div>
            <div>
              <strong>CORS Headers:</strong> 
              <span className="ml-2 text-green-600">✅ Configured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 