import React, { useState, useEffect } from 'react';

const options = ['Cursor', 'Trae', 'Antigravity', 'VS Code'];

const EditorPoll: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    const savedVotes = localStorage.getItem('devPollVotes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    const userVote = localStorage.getItem('userDevVote');
    if (userVote) {
      setVoted(userVote);
    }
  }, []);

  const handleVote = (option: string) => {
    if (voted) return;
    const newVotes = { ...votes, [option]: (votes[option] || 0) + 1 };
    setVotes(newVotes);
    setVoted(option);
    localStorage.setItem('devPollVotes', JSON.stringify(newVotes));
    localStorage.setItem('userDevVote', option);
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white border border-border rounded-2xl p-8">
      <h3 className="font-display text-2xl text-ink mb-6 text-center">¿Qué editor usas tú?</h3>
      <div className="space-y-4">
        {options.map(option => {
          const percentage = totalVotes > 0 ? ((votes[option] || 0) / totalVotes) * 100 : 0;
          return (
            <div key={option}>
              <button 
                onClick={() => handleVote(option)}
                disabled={!!voted}
                className="w-full text-left mb-2 font-bold disabled:cursor-not-allowed">
                {option}
              </button>
              <div className="w-full bg-surface rounded-full h-4">
                <div 
                  className="bg-orange h-4 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorPoll;
