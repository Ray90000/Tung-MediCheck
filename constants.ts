
import { AuditItem, DrugItem, Unit } from './types';

export const MOCK_UNITS: Unit[] = [
  { id: 'u1', name: 'ICU (加護病房)', inventoryProgress: 85, inventoryStatus: 'pending', auditStatus: 'completed' },
  { id: 'u2', name: 'ER (急診室)', inventoryProgress: 100, inventoryStatus: 'completed', auditStatus: 'completed' },
  { id: 'u3', name: '護理站 A (外科)', inventoryProgress: 0, inventoryStatus: 'not-started', auditStatus: 'not-started' },
  { id: 'u4', name: '護理站 B (內科)', inventoryProgress: 45, inventoryStatus: 'pending', auditStatus: 'not-started' },
  { id: 'u5', name: '兒科病房', inventoryProgress: 10, inventoryStatus: 'pending', auditStatus: 'not-started' },
];

export const MOCK_DRUGS: DrugItem[] = [
  { id: 'd1', category: '高警訊藥品', code: 'HA-001', name: 'Adrenaline Inj (腎上腺素)', systemStock: 10, actualStock: 10, expiryWarning: 'none', checkStatus: 'ok', conditionFlags: ['correct_qty'], notes: '' },
  { id: 'd2', category: '高警訊藥品', code: 'HA-005', name: 'Heparin Sodium (肝素)', systemStock: 5, actualStock: '', expiryWarning: 'none', checkStatus: 'pending', conditionFlags: [], notes: '' },
  { id: 'd3', category: '一般用藥', code: 'GEN-102', name: 'Acetaminophen Tab (乙醯胺酚)', systemStock: 100, actualStock: 98, expiryWarning: '6-12m', checkStatus: 'issue', conditionFlags: ['less'], notes: '發現 2 顆破損' },
  { id: 'd4', category: '一般用藥', code: 'GEN-204', name: 'Metoclopramide (美多普胺)', systemStock: 30, actualStock: '', expiryWarning: 'none', checkStatus: 'pending', conditionFlags: [], notes: '' },
  { id: 'd5', category: '管制藥品', code: 'NAR-001', name: 'Morphine Sulfate (嗎啡)', systemStock: 8, actualStock: '', expiryWarning: 'none', checkStatus: 'pending', conditionFlags: [], notes: '' },
  { id: 'd6', category: '點滴/輸液', code: 'IV-500', name: 'Normal Saline 500ml (生理食鹽水)', systemStock: 20, actualStock: 20, expiryWarning: '<6m', checkStatus: 'ok', conditionFlags: ['correct_qty'], notes: '近期過期' },
];

export const MOCK_AUDIT_ITEMS: AuditItem[] = [
  { id: 'a1', category: '一、護理行動車', text: '藥盒內是否發現沒有貼上標籤的藥品？(若有就不合格)', result: null, failReason: '' },
  { id: 'a2', category: '一、護理行動車', text: '藥盒內是否有標籤被撕毀的現象？(若有就不合格)', result: null, failReason: '' },
  { id: 'a3', category: '一、護理行動車', text: '高警訊藥品是否與一般藥品分開存放？', result: 'pass', failReason: '' },
  { id: 'a4', category: '二、常備藥庫存', text: '儲存溫度是否符合藥品要求？', result: null, failReason: '' },
  { id: 'a5', category: '二、常備藥庫存', text: '是否遵循先進先出 (FIFO) 原則？', result: null, failReason: '' },
];
