import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, ChevronRight, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, title, breadcrumbs }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <Activity size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-green-700">MediCheck 藥品盤點</span>
            </Link>
            
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <div className="hidden md:flex items-center ml-6 text-sm text-slate-500">
                <Link to="/" className="hover:text-green-600 flex items-center">
                  <Home size={14} className="mr-1"/> 首頁
                </Link>
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight size={14} className="mx-2 text-slate-300" />
                    {crumb.to ? (
                      <Link to={crumb.to} className="hover:text-green-600 font-medium">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-900 font-semibold">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">王小美 (藥師)</p>
                <p className="text-xs text-slate-500 font-mono">ID: t00000</p>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && <h1 className="text-2xl font-bold text-slate-900 mb-6">{title}</h1>}
        {children}
      </main>
    </div>
  );
};