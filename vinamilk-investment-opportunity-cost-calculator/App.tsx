
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Chi Phí Cơ Hội
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Khám phá tiềm năng tài chính bạn có thể đã bỏ lỡ khi không đầu tư vào cổ phiếu Vinamilk và hưởng lợi từ cổ tức cùng lãi kép.
          </p>
        </header>
        <main>
          <Calculator />
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>*Lưu ý: Mọi tính toán chỉ mang tính chất minh họa và không phải là lời khuyên đầu tư tài chính.</p>
          <p>&copy; {new Date().getFullYear()} Opportunity Cost Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
