import React, { useState, useEffect } from 'react';

const options = ['ChatGPT', 'Claude', 'Gemini', 'Otra'];

const CommunityPoll: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    const savedVotes = localStorage.getItem('marketingPollVotes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    const userVote = localStorage.getItem('userMarketingVote');
    if (userVote) {
      setVoted(userVote);
    }
  }, []);

  const handleVote = (option: string) => {
    if (voted) return;
    const newVotes = { ...votes, [option]: (votes[option] || 0) + 1 };
    setVotes(newVotes);
    setVoted(option);
    localStorage.setItem('marketingPollVotes', JSON.stringify(newVotes));
    localStorage.setItem('userMarketingVote', option);
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-ink border border-white/10 rounded-2xl p-8 text-white">
      <h3 className="font-display text-2xl mb-6 text-center">Opinión de la comunidad</h3>
      <p className="text-white/70 text-center mb-8">¿Qué IA usas más en tu trabajo de marketing?</p>
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
              <div className="w-full bg-white/10 rounded-full h-4">
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

export default CommunityPoll;
