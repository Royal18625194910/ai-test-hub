import { motion } from 'motion/react';
import { MBTIDimensionScores, getMBTIDimensionBreakdown } from '@/data/quizzes';

interface MBTIDimensionChartProps {
  scores: MBTIDimensionScores;
}

const DimensionBar = ({ 
  leftLabel, 
  rightLabel, 
  leftPercentage, 
  rightPercentage,
  leftScore,
  rightScore
}: { 
  leftLabel: string; 
  rightLabel: string; 
  leftPercentage: number;
  rightPercentage: number;
  leftScore: number;
  rightScore: number;
}) => {
  const isLeftDominant = leftPercentage >= rightPercentage;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${isLeftDominant ? 'text-orange-600 dark:text-orange-400' : 'text-stone-500 dark:text-stone-400'}`}>
            {leftLabel.split(' ')[0]}
          </span>
          {isLeftDominant && (
            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full font-bold">
              主导
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isLeftDominant && (
            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full font-bold">
              主导
            </span>
          )}
          <span className={`text-sm font-bold ${!isLeftDominant ? 'text-orange-600 dark:text-orange-400' : 'text-stone-500 dark:text-stone-400'}`}>
            {rightLabel.split(' ')[0]}
          </span>
        </div>
      </div>
      
      <div className="relative h-6 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <motion.div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${leftPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <div className="absolute left-1/2 top-0 h-full w-1 bg-white dark:bg-stone-900 transform -translate-x-1/2 shadow-sm" />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {leftScore}分 ({leftPercentage}%)
        </span>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {rightScore}分 ({rightPercentage}%)
        </span>
      </div>
    </div>
  );
};

export function MBTIDimensionChart({ scores }: MBTIDimensionChartProps) {
  const breakdown = getMBTIDimensionBreakdown(scores);
  
  const getMBTIType = () => {
    const EorI = scores.E >= scores.I ? 'E' : 'I';
    const SorN = scores.S >= scores.N ? 'S' : 'N';
    const TorF = scores.T >= scores.F ? 'T' : 'F';
    const JorP = scores.J >= scores.P ? 'J' : 'P';
    return `${EorI}${SorN}${TorF}${JorP}`;
  };
  
  const mbtiType = getMBTIType();
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-4">
          <span className="text-2xl font-black">{mbtiType}</span>
        </div>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          你的四维性格维度分析
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-amber-50/50 dark:bg-stone-800/50 rounded-xl p-4">
          <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-4 flex items-center gap-2">
            <span className="text-lg">⚡</span>
            能量来源 (EI 维度)
          </h4>
          <DimensionBar
            leftLabel={breakdown.E.label}
            rightLabel={breakdown.I.label}
            leftPercentage={breakdown.E.percentage}
            rightPercentage={breakdown.I.percentage}
            leftScore={breakdown.E.score}
            rightScore={breakdown.I.score}
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {scores.E >= scores.I 
              ? '你从外部世界获取能量，喜欢社交活动和与人互动。' 
              : '你从内心世界获取能量，喜欢独处和深度思考。'}
          </p>
        </div>
        
        <div className="bg-amber-50/50 dark:bg-stone-800/50 rounded-xl p-4">
          <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-4 flex items-center gap-2">
            <span className="text-lg">👁️</span>
            信息获取 (SN 维度)
          </h4>
          <DimensionBar
            leftLabel={breakdown.S.label}
            rightLabel={breakdown.N.label}
            leftPercentage={breakdown.S.percentage}
            rightPercentage={breakdown.N.percentage}
            leftScore={breakdown.S.score}
            rightScore={breakdown.N.score}
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {scores.S >= scores.N 
              ? '你关注具体的事实和细节，信赖实际经验。' 
              : '你关注整体模式和可能性，信赖直觉和灵感。'}
          </p>
        </div>
        
        <div className="bg-amber-50/50 dark:bg-stone-800/50 rounded-xl p-4">
          <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-4 flex items-center gap-2">
            <span className="text-lg">⚖️</span>
            决策方式 (TF 维度)
          </h4>
          <DimensionBar
            leftLabel={breakdown.T.label}
            rightLabel={breakdown.F.label}
            leftPercentage={breakdown.T.percentage}
            rightPercentage={breakdown.F.percentage}
            leftScore={breakdown.T.score}
            rightScore={breakdown.F.score}
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {scores.T >= scores.F 
              ? '你基于逻辑分析做决定，重视客观公平。' 
              : '你基于价值观做决定，重视和谐与他人感受。'}
          </p>
        </div>
        
        <div className="bg-amber-50/50 dark:bg-stone-800/50 rounded-xl p-4">
          <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-4 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            生活态度 (JP 维度)
          </h4>
          <DimensionBar
            leftLabel={breakdown.J.label}
            rightLabel={breakdown.P.label}
            leftPercentage={breakdown.J.percentage}
            rightPercentage={breakdown.P.percentage}
            leftScore={breakdown.J.score}
            rightScore={breakdown.P.score}
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {scores.J >= scores.P 
              ? '你喜欢计划和组织，追求确定性和完成感。' 
              : '你喜欢灵活和开放，追求适应性和可能性。'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MBTIDimensionChart;
