import React, { useState } from 'react';
import { Search, Brain, FileText, Activity, TrendingUp, Database, Globe, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const PharmaIntelDashboard = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeAgents, setActiveAgents] = useState([]);
  const [showApproval, setShowApproval] = useState(false);

  const agents = [
    { id: 'patent', name: 'Patent Landscape', icon: FileText, status: 'idle', color: 'bg-blue-500' },
    { id: 'clinical', name: 'Clinical Trials', icon: Activity, status: 'idle', color: 'bg-green-500' },
    { id: 'iqvia', name: 'IQVIA Insights', icon: TrendingUp, status: 'idle', color: 'bg-purple-500' },
    { id: 'exim', name: 'EXIM Trends', icon: Database, status: 'idle', color: 'bg-orange-500' },
    { id: 'internal', name: 'Internal Knowledge', icon: Database, status: 'idle', color: 'bg-red-500' },
    { id: 'web', name: 'Web Intelligence', icon: Globe, status: 'idle', color: 'bg-cyan-500' }
  ];

  const simulateAgentWorkflow = async () => {
    setIsProcessing(true);
    setResults(null);
    setShowApproval(false);
    
    const agentSequence = ['clinical', 'patent', 'internal', 'web', 'iqvia', 'exim'];
    
    for (let i = 0; i < agentSequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActiveAgents(prev => [...prev, agentSequence[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setResults({
      hypothesis: "Develop inhaled sildenafil formulation for pulmonary hypertension",
      reasoning: "Overcomes oral systemic side effects through localized pulmonary delivery",
      patentStatus: "Freedom to operate - oral patents expiring",
      clinicalRationale: "Maintains efficacy while reducing systemic exposure by 70%",
      marketOpportunity: "$2.3B addressable market with unmet safety needs",
      regulatoryPath: "505(b)(2) pathway eligible - 3-year exclusivity potential",
      confidence: 87
    });
    
    setShowApproval(true);
    setIsProcessing(false);
  };

  const handleSubmit = () => {
    if (query.trim()) {
      setActiveAgents([]);
      simulateAgentWorkflow();
    }
  };

  const handleApproval = (approved) => {
    setShowApproval(false);
    if (approved) {
      alert('Hypothesis approved! Proceeding to detailed R&D planning phase.');
    } else {
      alert('Hypothesis rejected. Master Agent will generate alternative approaches.');
    }
  };

  const getAgentStatus = (agentId) => {
    if (!isProcessing && activeAgents.includes(agentId)) return 'complete';
    if (isProcessing && activeAgents.includes(agentId)) return 'active';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold">PharmaIntel</h1>
          </div>
          <p className="text-blue-300 text-lg">Agentic AI for Pharmaceutical Innovation</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 border border-white/20">
          <label className="block text-sm font-medium mb-2">Research Query</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Analyze oral sildenafil failures and suggest alternatives..."
              className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              disabled={isProcessing}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Search className="w-5 h-5" />
              Analyze
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {agents.map((agent) => {
            const status = getAgentStatus(agent.id);
            const Icon = agent.icon;
            
            return (
              <div
                key={agent.id}
                className={`bg-white/10 backdrop-blur-lg rounded-lg p-4 border transition-all ${
                  status === 'active' ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' :
                  status === 'complete' ? 'border-green-400 shadow-lg shadow-green-400/20' :
                  'border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${agent.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold">{agent.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {status === 'idle' && (
                    <>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Waiting</span>
                    </>
                  )}
                  {status === 'active' && (
                    <>
                      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-yellow-400">Processing...</span>
                    </>
                  )}
                  {status === 'complete' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Complete</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {results && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              Master Agent Synthesis
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">Proposed Hypothesis</h3>
                <p className="text-lg">{results.hypothesis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Clinical Rationale</h4>
                  <p className="text-sm">{results.clinicalRationale}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Patent Status</h4>
                  <p className="text-sm">{results.patentStatus}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Market Opportunity</h4>
                  <p className="text-sm">{results.marketOpportunity}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Regulatory Path</h4>
                  <p className="text-sm">{results.regulatoryPath}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Confidence Score:</span>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${results.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{results.confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {showApproval && (
          <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 backdrop-blur-lg">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">Human Approval Required</h3>
                <p className="text-gray-300">
                  The Master Agent has identified a strategic pivot opportunity. Please review the hypothesis 
                  and supporting evidence before proceeding to the next R&D phase.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleApproval(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ✓ Approve Hypothesis
              </button>
              <button
                onClick={() => handleApproval(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ✗ Request Alternatives
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Built with Google ADK • LangGraph Multi-Agent System • MCP Tools Integration</p>
          <p className="mt-1">Team PharmaIntel - EY Techathon 6.0 & Kaggle AI Agents Challenge</p>
        </div>
      </div>
    </div>
  );
};

export default PharmaIntelDashboard;