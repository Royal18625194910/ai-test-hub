export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  score: Record<string, number>;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  results: Result[];
  icon: string;
  color: string;
}

export interface Result {
  id: string;
  title: string;
  description: string;
  minScore: number;
  maxScore: number;
  type: string;
}

export const quizzes: Quiz[] = [
  {
    id: 'personality-type',
    title: '你的性格类型测试',
    description: '通过10个有趣的问题，发现你独特的性格特质和行为模式。',
    category: '性格测试',
    difficulty: 'easy',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        text: '在社交聚会中，你通常会：',
        options: [
          { id: 'a', text: '主动与陌生人交谈，成为焦点', score: { E: 3, I: 0 } },
          { id: 'b', text: '与几个熟悉的朋友聊天', score: { E: 1, I: 1 } },
          { id: 'c', text: '找一个安静的角落，观察周围', score: { E: 0, I: 3 } }
        ]
      },
      {
        id: 2,
        text: '你更关注：',
        options: [
          { id: 'a', text: '具体的事实和细节', score: { S: 3, N: 0 } },
          { id: 'b', text: '整体的模式和可能性', score: { S: 0, N: 3 } },
          { id: 'c', text: '两者都关注', score: { S: 1, N: 1 } }
        ]
      },
      {
        id: 3,
        text: '做决定时，你更依赖：',
        options: [
          { id: 'a', text: '逻辑分析和客观标准', score: { T: 3, F: 0 } },
          { id: 'b', text: '个人价值观和他人感受', score: { T: 0, F: 3 } },
          { id: 'c', text: '两者结合', score: { T: 1, F: 1 } }
        ]
      },
      {
        id: 4,
        text: '面对计划和安排，你倾向于：',
        options: [
          { id: 'a', text: '提前规划，按计划执行', score: { J: 3, P: 0 } },
          { id: 'b', text: '保持灵活，随机应变', score: { J: 0, P: 3 } },
          { id: 'c', text: '有大致计划，但允许调整', score: { J: 1, P: 1 } }
        ]
      },
      {
        id: 5,
        text: '你更喜欢的工作环境是：',
        options: [
          { id: 'a', text: '快节奏、充满变化的环境', score: { E: 2, P: 2 } },
          { id: 'b', text: '稳定、有明确规则的环境', score: { I: 1, J: 2 } },
          { id: 'c', text: '有创造力和自主性的环境', score: { N: 2, F: 1 } }
        ]
      },
      {
        id: 6,
        text: '当别人向你倾诉烦恼时，你通常：',
        options: [
          { id: 'a', text: '提供实际的解决方案', score: { T: 2, S: 1 } },
          { id: 'b', text: '先共情，理解他们的感受', score: { F: 2, N: 1 } },
          { id: 'c', text: '分享自己类似的经历', score: { F: 1, E: 1 } }
        ]
      },
      {
        id: 7,
        text: '你更相信：',
        options: [
          { id: 'a', text: '经验和已被验证的方法', score: { S: 2, J: 1 } },
          { id: 'b', text: '直觉和未来的可能性', score: { N: 2, P: 1 } },
          { id: 'c', text: '数据和客观分析', score: { T: 2, S: 1 } }
        ]
      },
      {
        id: 8,
        text: '在团队项目中，你通常扮演：',
        options: [
          { id: 'a', text: '组织者，分配任务确保进度', score: { J: 2, E: 1 } },
          { id: 'b', text: '创意者，提供新想法和方向', score: { N: 2, P: 1 } },
          { id: 'c', text: '协调者，确保团队和谐', score: { F: 2, I: 1 } }
        ]
      },
      {
        id: 9,
        text: '你如何处理压力？',
        options: [
          { id: 'a', text: '与朋友或家人交流', score: { E: 2, F: 1 } },
          { id: 'b', text: '独处思考，整理思绪', score: { I: 2, T: 1 } },
          { id: 'c', text: '通过活动或运动释放', score: { E: 1, S: 2 } }
        ]
      },
      {
        id: 10,
        text: '你更看重：',
        options: [
          { id: 'a', text: '成就和目标达成', score: { J: 2, T: 1 } },
          { id: 'b', text: '和谐和人际关系', score: { F: 2, P: 1 } },
          { id: 'c', text: '自由和探索新事物', score: { P: 2, N: 1 } }
        ]
      }
    ],
    results: [
      {
        id: 'analyst',
        title: '分析型思想家 (INTJ/INTP)',
        description: '你是一个独立、理性且富有洞察力的思考者。你擅长战略规划和系统分析，喜欢深入理解复杂的概念。在工作中，你追求效率和创新，能够看到别人看不到的模式和可能性。你的优势在于逻辑思维和长远眼光，但有时可能显得过于理性或不够关注他人感受。',
        minScore: 0,
        maxScore: 15,
        type: 'analyst'
      },
      {
        id: 'diplomat',
        title: '理想主义者 (INFJ/INFP)',
        description: '你是一个富有同理心、创造力和理想主义的人。你深刻理解他人的情感和需求，善于建立深层次的人际关系。你追求意义和目的，喜欢帮助他人成长和发展。你的优势在于直觉和共情能力，但有时可能过于理想化或容易受伤。',
        minScore: 16,
        maxScore: 30,
        type: 'diplomat'
      },
      {
        id: 'sentinel',
        title: '守护者 (ISTJ/ISFJ)',
        description: '你是一个可靠、务实且有责任感的人。你重视传统和秩序，善于建立稳定的系统和流程。你是团队中的中坚力量，总是能够按时完成任务并确保质量。你的优势在于可靠性和专注力，但有时可能过于保守或抗拒改变。',
        minScore: 31,
        maxScore: 45,
        type: 'sentinel'
      },
      {
        id: 'explorer',
        title: '探险家 (ISTP/ISFP)',
        description: '你是一个灵活、适应性强且喜欢体验的人。你活在当下，善于应对突发情况和实际问题。你喜欢动手实践，对周围的环境有敏锐的观察力。你的优势在于灵活性和实用主义，但有时可能过于冲动或缺乏长远规划。',
        minScore: 46,
        maxScore: 60,
        type: 'explorer'
      },
      {
        id: 'executive',
        title: '执行者 (ESTJ/ENTJ)',
        description: '你是一个果断、自信且善于组织的领导者。你擅长制定计划、分配任务并确保目标达成。你喜欢挑战和竞争，能够在压力下保持冷静。你的优势在于决策能力和执行力，但有时可能过于强势或不够考虑他人感受。',
        minScore: 61,
        maxScore: 75,
        type: 'executive'
      },
      {
        id: 'campaigner',
        title: '社交达人 (ENFJ/ENFP)',
        description: '你是一个热情、有魅力且善于激励他人的人。你喜欢社交活动，能够轻松地与各种人建立联系。你充满活力和创意，总是能够看到事情的积极面。你的优势在于社交能力和感染力，但有时可能过于分散精力或难以专注。',
        minScore: 76,
        maxScore: 100,
        type: 'campaigner'
      }
    ]
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}

export function calculateResult(
  answers: Record<number, string>,
  quiz: Quiz
): Result {
  const scores: Record<string, number> = {};
  
  quiz.questions.forEach(question => {
    const selectedOptionId = answers[question.id];
    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
    
    if (selectedOption) {
      Object.entries(selectedOption.score).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + value;
      });
    }
  });
  
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  const result = quiz.results.find(
    r => totalScore >= r.minScore && totalScore <= r.maxScore
  );
  
  return result || quiz.results[0];
}
