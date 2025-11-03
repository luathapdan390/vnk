
import React, { useState, useCallback, useEffect } from 'react';
import { CalculationInput, CalculationResult } from '../types';
import InputGroup from './InputGroup';
import ResultDisplay from './ResultDisplay';
import { SharesIcon, DividendIcon, BankIcon, GrowthIcon, TotalIcon } from './icons';

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInput>({
    monthlyInvestment: 1000000,
    stockPrice: 68000,
    dividendRate: 8,
    dividendFrequency: 2,
    years: 30,
    interestRate: 7,
  });

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof CalculationInput, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = useCallback(() => {
    const { monthlyInvestment, stockPrice, dividendRate, dividendFrequency, years, interestRate } = inputs;

    if (stockPrice <= 0 || dividendFrequency <= 0) return;

    let currentShares = 0;
    let totalDividendsReceived = 0;
    let futureValueOfInvestedCapital = 0;
    let futureValueOfReinvestedDividends = 0;

    const totalMonths = years * 12;
    const monthlyInterestRate = interestRate / 100 / 12;
    const dividendPerSharePerPayment = (stockPrice * (dividendRate / 100)) / dividendFrequency;
    const monthsPerDividend = 12 / dividendFrequency;

    for (let month = 1; month <= totalMonths; month++) {
      const sharesThisMonth = monthlyInvestment / stockPrice;
      currentShares += sharesThisMonth;

      const monthsRemaining = totalMonths - month;
      futureValueOfInvestedCapital += monthlyInvestment * Math.pow(1 + monthlyInterestRate, monthsRemaining);

      if (month > 0 && monthsPerDividend > 0 && month % monthsPerDividend === 0) {
        const dividendThisPeriod = currentShares * dividendPerSharePerPayment;
        totalDividendsReceived += dividendThisPeriod;
        futureValueOfReinvestedDividends += dividendThisPeriod * Math.pow(1 + monthlyInterestRate, monthsRemaining);
      }
    }

    const totalOpportunityCost = futureValueOfInvestedCapital + futureValueOfReinvestedDividends;

    setResults({
      totalShares: currentShares,
      totalDividends: totalDividendsReceived,
      futureValueOfCapital: futureValueOfInvestedCapital,
      // FIX: The variable is named `futureValueOfReinvestedDividends`, not `futureValueOfDividends`.
      futureValueOfDividends: futureValueOfReinvestedDividends,
      totalOpportunityCost,
    });
    setShowResults(true);
  }, [inputs]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleCalculate(); }, []);

  return (
    <div className="bg-slate-800/30 rounded-2xl shadow-2xl p-6 md:p-10 border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <InputGroup
          label="Đầu tư hàng tháng"
          id="monthlyInvestment"
          value={inputs.monthlyInvestment}
          onChange={(v) => handleInputChange('monthlyInvestment', v)}
          unit="VND"
          min={100000}
          max={10000000}
          step={100000}
          isCurrency
        />
        <InputGroup
          label="Giá cổ phiếu (VNM)"
          id="stockPrice"
          value={inputs.stockPrice}
          onChange={(v) => handleInputChange('stockPrice', v)}
          unit="VND"
          min={10000}
          max={200000}
          step={1000}
          isCurrency
        />
        <InputGroup
          label="Tỷ lệ cổ tức/năm"
          id="dividendRate"
          value={inputs.dividendRate}
          onChange={(v) => handleInputChange('dividendRate', v)}
          unit="%"
          min={0}
          max={50}
          step={0.5}
        />
        <InputGroup
          label="Số lần trả cổ tức/năm"
          id="dividendFrequency"
          value={inputs.dividendFrequency}
          onChange={(v) => handleInputChange('dividendFrequency', v)}
          unit="lần"
          min={1}
          max={12}
          step={1}
        />
        <InputGroup
          label="Số năm đầu tư"
          id="years"
          value={inputs.years}
          onChange={(v) => handleInputChange('years', v)}
          unit="năm"
          min={1}
          max={50}
          step={1}
        />
        <InputGroup
          label="Lãi suất kép/năm"
          id="interestRate"
          value={inputs.interestRate}
          onChange={(v) => handleInputChange('interestRate', v)}
          unit="%"
          min={0}
          max={20}
          step={0.1}
        />
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleCalculate}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-emerald-500/20"
        >
          Tính toán Chi phí Cơ hội
        </button>
      </div>

      {results && (
        <div className={`mt-12 transition-opacity duration-700 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-200">Kết Quả Ước Tính</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ResultDisplay
              icon={<SharesIcon />}
              label="Tổng số cổ phiếu tích lũy"
              value={results.totalShares}
              isCurrency={false}
              isShares={true}
              description={`Số lượng cổ phiếu bạn sẽ sở hữu sau ${inputs.years} năm.`}
            />
            <ResultDisplay
              icon={<DividendIcon />}
              label="Tổng cổ tức nhận được"
              value={results.totalDividends}
              description="Tổng số tiền cổ tức (chưa tính lãi kép) bạn có thể nhận được."
            />
            <ResultDisplay
              icon={<BankIcon />}
              label="Giá trị vốn gốc nếu gửi tiết kiệm"
              value={results.futureValueOfCapital}
              description={`Số tiền đầu tư hàng tháng của bạn sẽ tăng trưởng thành con số này với lãi suất ${inputs.interestRate}%/năm.`}
            />
            <ResultDisplay
              icon={<GrowthIcon />}
              label="Giá trị cổ tức nếu tái đầu tư"
              value={results.futureValueOfDividends}
              description={`Số tiền cổ tức nhận được sẽ tăng trưởng thành con số này nếu được gửi tiết kiệm.`}
            />
            <ResultDisplay
              icon={<TotalIcon />}
              label="TỔNG CHI PHÍ CƠ HỘI"
              value={results.totalOpportunityCost}
              className="sm:col-span-2 bg-gradient-to-br from-emerald-600/30 to-cyan-600/30 border-emerald-500"
              description={`Đây là tổng giá trị tài sản bạn có thể đã bỏ lỡ. Con số này là tổng của vốn gốc và cổ tức sau khi được hưởng lãi kép trong ${inputs.years} năm.`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
