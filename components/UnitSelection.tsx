import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pill, ClipboardList, ArrowRight } from 'lucide-react';
import { MOCK_UNITS } from '../constants';
import { Layout } from './Layout';

export const UnitSelection: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const unit = MOCK_UNITS.find(u => u.id === unitId);

  if (!unit) return <div>找不到該單位</div>;

  return (
    <Layout breadcrumbs={[{ label: unit.name }]}>
      <div className="text-center mb-10 mt-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{unit.name}</h1>
        <p className="text-slate-500">請選擇欲執行的作業項目。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Card A: Drug Inventory */}
        <div 
          onClick={() => navigate(`/unit/${unitId}/inventory`)}
          className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-transform">
            <Pill size={120} className="text-blue-600" />
          </div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Pill size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">A. 藥品查核表</h3>
            <p className="text-slate-500 mb-6">
              核對庫存數量、輸入實際盤點量，並標記即期或過期藥品。
            </p>
            
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
              開始盤點 <ArrowRight size={18} className="ml-2" />
            </div>
          </div>
        </div>

        {/* Card B: Audit */}
        <div 
          onClick={() => navigate(`/unit/${unitId}/audit`)}
          className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-transform">
            <ClipboardList size={120} className="text-emerald-600" />
          </div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ClipboardList size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">B. 藥品管理稽核表</h3>
            <p className="text-slate-500 mb-6">
              填寫單位合規檢查清單，包含護理行動車、冰箱與環境安全規範。
            </p>
            
            <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
              開始稽核 <ArrowRight size={18} className="ml-2" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};