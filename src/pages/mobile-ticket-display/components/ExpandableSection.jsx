import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExpandableSection = ({ title, icon, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;