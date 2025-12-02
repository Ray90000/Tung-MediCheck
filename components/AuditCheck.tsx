import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save, AlertOctagon } from 'lucide-react';
import { MOCK_UNITS, MOCK_AUDIT_ITEMS } from '../constants';
import { Layout } from './Layout';
import { AuditItem } from '../types';

export const AuditCheck: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = MOCK_UNITS.find(u => u.id === unitId);

  const [auditItems, setAuditItems] = useState<AuditItem[]>(MOCK_AUDIT_ITEMS);

  // Group items by category
  const groupedItems = auditItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, AuditItem[]>);

  const handleResultChange = (id: string, result: AuditItem['result']) => {
    setAuditItems(prev => prev.map(item => {
      if (item.id === id) {
        // Clear fail reason if switching away from fail
        const failReason = result !== 'fail' ? '' : item.failReason;
        return { ...item, result, failReason };
      }
      return item;
    }));
  };

  const handleFailReasonChange = (id: string, text: string) => {
    setAuditItems(prev => prev.map(item => item.id === id ? { ...item, failReason: text } : item));
  };

  if (!unit) return <div>找不到該單位</div>;

  return (
    <Layout 
      breadcrumbs={[
        { label: unit.name, to: `/unit/${unitId}` },
        { label: '藥品管理稽核表' }
      ]}
    >
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col max-w-5xl mx-auto">
        <div className="p-6 border-b border-slate-200">
             <h2 className="text-xl font-bold text-slate-800">藥品管理稽核</h2>
             <p className="text-slate-500 mt-1">請依照項目進行合規檢查，若不合格請務必填寫原因。</p>
        </div>
        
        <div className="p-6 space-y-8">
            {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
                        {category}
                    </h3>
                    <div className="space-y-1">
                        {/* Header Row for large screens */}
                        <div className="hidden md:flex text-xs font-bold text-slate-400 uppercase tracking-wide px-4 pb-2">
                            <div className="flex-1">內容 (準則)</div>
                            <div className="w-[300px] text-center">結果</div>
                        </div>

                        {(items as AuditItem[]).map(item => (
                            <div key={item.id} className="bg-white rounded-lg border border-slate-200 p-4 md:flex md:items-start md:gap-4 shadow-sm mb-3 md:mb-1">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <p className="font-medium text-slate-800">{item.text}</p>
                                    {item.result === 'fail' && (
                                        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="block text-xs font-bold text-red-600 mb-1 flex items-center gap-1">
                                                <AlertOctagon size={12}/> 不合格原因 (必填)
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    maxLength={40}
                                                    value={item.failReason}
                                                    onChange={(e) => handleFailReasonChange(item.id, e.target.value)}
                                                    className="w-full px-3 py-2 border border-red-300 bg-red-50 rounded text-sm text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    placeholder="請描述問題點..."
                                                    autoFocus
                                                />
                                                <span className="absolute right-2 top-2 text-xs text-red-400">
                                                    {item.failReason.length}/40
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="w-full md:w-[300px] flex justify-between md:justify-end gap-2 shrink-0">
                                    {/* Radio Group */}
                                    {(['pass', 'fail', 'na'] as const).map((option) => (
                                        <label 
                                            key={option}
                                            className={`
                                                flex-1 md:flex-none flex items-center justify-center cursor-pointer select-none rounded-lg px-3 py-2 border text-sm font-semibold transition-all
                                                ${item.result === option 
                                                    ? option === 'pass' ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-100'
                                                    : option === 'fail' ? 'bg-red-600 text-white border-red-600 ring-2 ring-red-100'
                                                    : 'bg-slate-600 text-white border-slate-600'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            <input 
                                                type="radio" 
                                                name={`audit-${item.id}`} 
                                                value={option}
                                                checked={item.result === option}
                                                onChange={() => handleResultChange(item.id, option)}
                                                className="hidden" 
                                            />
                                            {option === 'pass' && '合格'}
                                            {option === 'fail' && '不合格'}
                                            {option === 'na' && '不適用'}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end gap-3 sticky bottom-0 z-10">
             <button className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                取消
            </button>
            <button className="px-8 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-200">
                <Save size={18} />
                完成稽核
            </button>
        </div>
      </div>
    </Layout>
  );
};