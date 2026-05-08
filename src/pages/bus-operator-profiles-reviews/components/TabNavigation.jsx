import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'policies', label: 'Policies', icon: 'FileText' },
    { id: 'contact', label: 'Contact', icon: 'Phone' }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200
                ${activeTab === tab.id
                  ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;