import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { UnitSelection } from './components/UnitSelection';
import { InventoryCheck } from './components/InventoryCheck';
import { AuditCheck } from './components/AuditCheck';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/unit/:unitId" element={<UnitSelection />} />
        <Route path="/unit/:unitId/inventory" element={<InventoryCheck />} />
        <Route path="/unit/:unitId/audit" element={<AuditCheck />} />
      </Routes>
    </HashRouter>
  );
};

export default App;