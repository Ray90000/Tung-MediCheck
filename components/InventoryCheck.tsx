
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import { MOCK_UNITS, MOCK_DRUGS } from '../constants';
import { Layout } from './Layout';
import { DrugItem, SignatureData } from '../types';

export const InventoryCheck: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = MOCK_UNITS.find(u => u.id === unitId);
  
  // Local state for the form
  const [items, setItems] = useState<DrugItem[]>(MOCK_DRUGS);
  const [signatures, setSignatures] = useState<SignatureData>({
    pharmacistName: 't00000', // Auto-fill with current user ID
    headNurseName: '',
    date: new Date().toISOString().split('T')[0],
    pharmacistComments: '',
    unitComments: ''
  });

  const handleStockChange = (id: string, val: string) => {
    const numVal = val === '' ? '' : parseInt(val, 10);
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        let status: DrugItem['checkStatus'] = 'ok';
        if (numVal === '') status = 'pending';
        else if (numVal !== item.systemStock) status = 'issue';
        
        return { ...item, actualStock: numVal as number, checkStatus: status };
      }
      return item;
    }));
  };

  const handleExpiryChange = (id: string, warning: DrugItem['expiryWarning']) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, expiryWarning: warning === item.expiryWarning ? 'none' : warning } : item
    ));
  };

  const handleConditionChange = (id: string, flag: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentFlags = item.conditionFlags || [];
        const newFlags = currentFlags.includes(flag)
          ? currentFlags.filter(f => f !== flag)
          : [...currentFlags, flag];
        return { ...item, conditionFlags: newFlags };
      }
      return item;
    }));
  };

  const handleNoteChange = (id: string, note: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, notes: note } : item));
  };

  const handleSignatureChange = (field: keyof SignatureData, value: string) => {
    setSignatures(prev => ({ ...prev, [field]: value }));
  };

  if (!unit) return <div>找不到該單位</div>;

  return (
    <Layout 
      breadcrumbs={[
        { label: unit.name, to: `/unit/${unitId}` },
        { label: '藥品查核表' }
      ]}
    >
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky left-0 right-0">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">REV. 2024</span>
                查核藥品清單
            </h2>
            <div className="text-sm text-slate-500">
                總品項: <span className="font-mono font-bold text-slate-900">{items.length}</span>
            </div>
        </div>

        {/* Table Container - overflow for responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 w-[120px]">類別 / 藥品碼</th>
                <th className="p-4 min-w-[200px]">藥品名稱 (常用名)</th>
                <th className="p-4 w-[80px] text-center">系統<br/>庫存</th>
                <th className="p-4 w-[100px]">盤點<br/>數量</th>
                <th className="p-4 w-[160px]">效期檢查</th>
                {/* 狀態欄位已移除 */}
                <th className="p-4 min-w-[320px]">查核狀況</th>
                <th className="p-4 min-w-[150px]">備註</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  {/* 類別/藥品碼 */}
                  <td className="p-4 align-top">
                    <div className="text-slate-900 font-medium truncate max-w-[120px]">{item.category}</div>
                    <div className="text-slate-400 text-xs font-mono">{item.code}</div>
                  </td>
                  
                  {/* 藥品名稱 */}
                  <td className="p-4 align-top font-medium text-slate-800 whitespace-normal">
                    {item.name}
                  </td>
                  
                  {/* 系統庫存 */}
                  <td className="p-4 align-top text-center">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-mono font-bold">
                        {item.systemStock}
                    </span>
                  </td>
                  
                  {/* 盤點數量 */}
                  <td className="p-4 align-top">
                    <input 
                      type="number" 
                      value={item.actualStock}
                      onChange={(e) => handleStockChange(item.id, e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-mono text-lg transition-all ${
                         item.checkStatus === 'issue' ? 'border-red-300 bg-red-50 text-red-700' : 'border-slate-300'
                      }`}
                      placeholder="0"
                    />
                  </td>
                  
                  {/* 效期檢查 */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={item.expiryWarning === '6-12m'}
                          onChange={() => handleExpiryChange(item.id, '6-12m')}
                          className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500" 
                        />
                        <span className={`text-sm ${item.expiryWarning === '6-12m' ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                            6-12 個月
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={item.expiryWarning === '<6m'}
                          onChange={() => handleExpiryChange(item.id, '<6m')}
                          className="w-4 h-4 text-red-500 rounded border-slate-300 focus:ring-red-500" 
                        />
                         <span className={`text-sm ${item.expiryWarning === '<6m' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                            &lt; 6 個月
                        </span>
                      </label>
                    </div>
                  </td>
                  
                  {/* 查核狀況 (New) */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-3">
                      {/* Group 1 */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {[
                          { id: 'zero_qty', label: '數量為零' },
                          { id: 'not_required', label: '不需常備' },
                          { id: 'item_correct', label: '品項正確' },
                        ].map(opt => (
                          <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={(item.conditionFlags || []).includes(opt.id)}
                              onChange={() => handleConditionChange(item.id, opt.id)}
                              className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500" 
                            />
                            <span className="text-slate-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="h-px bg-slate-100 w-full"></div>

                      {/* Group 2 */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {[
                          { id: 'less', label: '少' },
                          { id: 'more', label: '多' },
                          { id: 'expired', label: '過期' },
                          { id: 'changed', label: '換廠、換包裝' },
                          { id: 'correct_qty', label: '正確' },
                        ].map(opt => (
                          <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={(item.conditionFlags || []).includes(opt.id)}
                              onChange={() => handleConditionChange(item.id, opt.id)}
                              className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500" 
                            />
                            <span className="text-slate-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* 備註 */}
                  <td className="p-4 align-top">
                    <input 
                      type="text"
                      value={item.notes}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      placeholder="輸入備註..."
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-400 outline-none focus:bg-white bg-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section: Signatures */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2">藥師建議事項</h3>
                <textarea 
                    value={signatures.pharmacistComments}
                    onChange={(e) => handleSignatureChange('pharmacistComments', e.target.value)}
                    className="w-full h-24 p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    placeholder="請輸入建議或觀察..."
                ></textarea>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">藥師員工代號</label>
                        <input 
                            type="text" 
                            value={signatures.pharmacistName}
                            onChange={(e) => handleSignatureChange('pharmacistName', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded bg-white text-sm" 
                            placeholder="請簽名"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">日期</label>
                        <input 
                            type="date" 
                            value={signatures.date}
                            onChange={(e) => handleSignatureChange('date', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded bg-white text-sm" 
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2">相關單位意見</h3>
                <textarea 
                     value={signatures.unitComments}
                     onChange={(e) => handleSignatureChange('unitComments', e.target.value)}
                    className="w-full h-24 p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    placeholder="單位回饋意見..."
                ></textarea>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">護理長簽名</label>
                        <input 
                            type="text" 
                            value={signatures.headNurseName}
                            onChange={(e) => handleSignatureChange('headNurseName', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded bg-white text-sm" 
                            placeholder="請簽名"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex justify-end gap-3 shadow-lg z-10">
            <button className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                儲存草稿
            </button>
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-200">
                <Save size={18} />
                送出查核表
            </button>
        </div>

      </div>
    </Layout>
  );
};
