import React, { useState } from 'react';
import LiquidityDistributionChart from './textareachart';
import LiquidityManagementDashboard from './LiquidityManagement';
import StrategyComparisonDiagram from './StrategyComparisonDiagram';
import Overview from './Overview';
import Analytics from './Analytics';

const Left = ({data}) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="text-white w-full">

      <div className="flex gap-4 mb-6">
        <button 
          className={`px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl ${activeTab === 'Overview' ? 'bg-[#383b45]' : 'bg-[#1E212A]'}`}
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </button>
        <button 
          className={`px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl ${activeTab === 'Analytics' ? 'bg-[#383b45]' : 'bg-[#1E212A]'}`}
          onClick={() => setActiveTab('Analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'Overview' && (
        <Overview data = {data} />
      )}

      {activeTab === 'Analytics' && (
        <Analytics data={data} />
      )}
    </div>
  );
};

export default Left;