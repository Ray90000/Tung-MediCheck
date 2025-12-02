import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, FileDown, CheckCircle2, Search, Filter } from 'lucide-react';
import { MOCK_UNITS } from '../constants';
import { Layout } from './Layout';
import { Unit } from '../types';

const StatusBadge: React.FC<{ status: Unit['inventoryStatus'] }> = ({ status }) => {
  const styles = {
    'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'not-started': 'bg-slate-100 text-slate-600 border-slate-200'
  };

  const labels = {
    'completed': '已完成',
    'pending': '進行中',
    'not-started': '未開始'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // Changed from selectedUnitId to searchQuery for text input
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter Logic
  const filteredUnits = useMemo(() => {
    return MOCK_UNITS.filter(unit => {
      // 1. Filter by Unit Name (Search Text)
      const matchUnit = searchQuery === '' || unit.name.includes(searchQuery);

      // 2. Filter by Status (Check if either Inventory OR Audit matches, or show all)
      const matchStatus = selectedStatus === 'all' || 
                          unit.inventoryStatus === selectedStatus || 
                          unit.auditStatus === selectedStatus;

      return matchUnit && matchStatus;
    });
  }, [searchQuery, selectedStatus]);

  return (
    <Layout>
      {/* Top Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">系統操作</h2>
          <p className="text-slate-500 text-sm">管理所有單位的資料同步作業。</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors shadow-sm">
            <FileDown size={18} />
            匯出報表
          </button>
          <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">
            <FileUp size={18} />
            匯入總量報表
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
            <Search size={12} /> 搜尋單位 (Search Unit)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="輸入單位名稱搜尋..."
              className="w-full p-2.5 pl-10 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
             <Filter size={12} /> 狀態篩選 (Status Filter)
          </label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">顯示所有狀態</option>
            <option value="not-started">未開始 (Not Started)</option>
            <option value="pending">進行中 (In Progress)</option>
            <option value="completed">已完成 (Completed)</option>
          </select>
        </div>
      </div>

      {/* Unit List */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-bold text-slate-900">單位列表</h2>
        <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          共 {filteredUnits.length} 個單位
        </span>
      </div>

      {filteredUnits.length === 0 ? (
         <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
            <p>沒有符合篩選條件的單位</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredUnits.map((unit) => (
            <div 
              key={unit.id}
              onClick={() => navigate(`/unit/${unit.id}`)}
              className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:ring-2 hover:ring-blue-100 shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {unit.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col md:flex-row gap-3 sm:items-end md:items-center">
                <div className="flex flex-col items-start sm:items-end md:items-center">
                  <span className="text-xs text-slate-400 uppercase font-semibold mb-1">盤點表 (Inventory)</span>
                  <StatusBadge status={unit.inventoryStatus} />
                </div>
                <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
                <div className="flex flex-col items-start sm:items-end md:items-center">
                  <span className="text-xs text-slate-400 uppercase font-semibold mb-1">稽核表 (Audit)</span>
                  <StatusBadge status={unit.auditStatus} />
                </div>
                <div className="ml-2 text-slate-300 group-hover:text-blue-400">
                  <CheckCircle2 size={24} className="hidden sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};