import React, { useState } from 'react';

const recommendations = {
  'Social Media Manager': ['Canva AI', 'ChatGPT', 'Midjourney'],
  'Content Creator': ['ChatGPT', 'Surfer SEO', 'Claude'],
  'Growth Marketer': ['Jasper', 'Surfer SEO', 'ChatGPT'],
};

type Role = keyof typeof recommendations;

const AIRecommender: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div className="bg-white border border-border rounded-2xl p-8">
      <h3 className="font-display text-2xl text-ink mb-6 text-center">¿Cuál IA es mejor para tu trabajo?</h3>
      <div className="flex justify-center gap-4 mb-8">
        {Object.keys(recommendations).map(role => (
          <button 
            key={role}
            onClick={() => setSelectedRole(role as Role)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              selectedRole === role 
                ? 'bg-orange text-white' 
                : 'bg-surface text-ink-mid hover:bg-orange-pale'
            }`}>
            Soy {role}
          </button>
        ))}
      </div>
      {selectedRole && (
        <div className="bg-surface rounded-lg p-6">
          <h4 className="font-bold text-ink mb-4">Recomendaciones para {selectedRole}:</h4>
          <ul className="list-disc list-inside space-y-2">
            {recommendations[selectedRole].map(tool => (
              <li key={tool} className="text-ink-mid">{tool}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIRecommender;
