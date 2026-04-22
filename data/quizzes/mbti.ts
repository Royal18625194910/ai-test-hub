import { Quiz } from './types';

export const mbtiQuiz: Quiz = {
  id: 'mbti-personality',
  title: 'MBTI 性格类型测试',
  description: '通过20道经典问题，探索你的16种人格类型，了解你的性格特质、优势和适合的发展方向。',
  category: '性格测试',
  difficulty: 'medium',
  icon: '🔮',
  color: 'from-purple-500 to-pink-500',
  resultCalculator: 'mbti',
  questions: [
    {
      id: 1,
      text: '在社交聚会中，你通常：',
      options: [
        { id: 'a', text: '积极与各种人交谈，感到精力充沛', score: { E: 1 } },
        { id: 'b', text: '只与几个熟悉的人深入交流，之后需要独处恢复', score: { I: 1 } }
      ]
    },
    {
      id: 2,
      text: '你更倾向于：',
      options: [
        { id: 'a', text: '关注具体的事实和细节', score: { S: 1 } },
        { id: 'b', text: '想象整体的可能性和模式', score: { N: 1 } }
      ]
    },
    {
      id: 3,
      text: '做决策时，你更看重：',
      options: [
        { id: 'a', text: '逻辑分析和客观标准', score: { T: 1 } },
        { id: 'b', text: '他人感受和价值观', score: { F: 1 } }
      ]
    },
    {
      id: 4,
      text: '面对计划，你倾向于：',
      options: [
        { id: 'a', text: '提前规划，按计划执行', score: { J: 1 } },
        { id: 'b', text: '保持灵活，随机应变', score: { P: 1 } }
      ]
    },
    {
      id: 5,
      text: '周末休息时，你更想：',
      options: [
        { id: 'a', text: '和朋友聚会或参加社交活动', score: { E: 1 } },
        { id: 'b', text: '宅在家里享受独处时光', score: { I: 1 } }
      ]
    },
    {
      id: 6,
      text: '处理新信息时，你：',
      options: [
        { id: 'a', text: '先关注已知的具体事实', score: { S: 1 } },
        { id: 'b', text: '先寻找模式和潜在含义', score: { N: 1 } }
      ]
    },
    {
      id: 7,
      text: '在团队中，你更可能：',
      options: [
        { id: 'a', text: '指出错误以确保质量', score: { T: 1 } },
        { id: 'b', text: '强调和谐以保持士气', score: { F: 1 } }
      ]
    },
    {
      id: 8,
      text: '对于最后期限，你：',
      options: [
        { id: 'a', text: '提前完成，不喜欢拖延', score: { J: 1 } },
        { id: 'b', text: '在压力下效率更高，常常赶在最后', score: { P: 1 } }
      ]
    },
    {
      id: 9,
      text: '你觉得自己：',
      options: [
        { id: 'a', text: '容易被他人了解', score: { E: 1 } },
        { id: 'b', text: '不容易被他人了解', score: { I: 1 } }
      ]
    },
    {
      id: 10,
      text: '你更欣赏：',
      options: [
        { id: 'a', text: '务实和常识', score: { S: 1 } },
        { id: 'b', text: '想象力和创新', score: { N: 1 } }
      ]
    },
    {
      id: 11,
      text: '批评他人时，你：',
      options: [
        { id: 'a', text: '直接表达，不太在意对方感受', score: { T: 1 } },
        { id: 'b', text: '会考虑对方感受，委婉表达', score: { F: 1 } }
      ]
    },
    {
      id: 12,
      text: '你的工作/学习风格是：',
      options: [
        { id: 'a', text: '集中精力一次性完成', score: { J: 1 } },
        { id: 'b', text: '分阶段进行，中间穿插其他事情', score: { P: 1 } }
      ]
    },
    {
      id: 13,
      text: '在人群中，你：',
      options: [
        { id: 'a', text: '感到兴奋和充满活力', score: { E: 1 } },
        { id: 'b', text: '感到疲惫，想要离开', score: { I: 1 } }
      ]
    },
    {
      id: 14,
      text: '你更倾向于：',
      options: [
        { id: 'a', text: '谈论实际发生的事情', score: { S: 1 } },
        { id: 'b', text: '谈论想法和可能性', score: { N: 1 } }
      ]
    },
    {
      id: 15,
      text: '面对冲突，你：',
      options: [
        { id: 'a', text: '直面问题，寻求真理', score: { T: 1 } },
        { id: 'b', text: '避免冲突，寻求和谐', score: { F: 1 } }
      ]
    },
    {
      id: 16,
      text: '你更看重：',
      options: [
        { id: 'a', text: '确定性和可预测性', score: { J: 1 } },
        { id: 'b', text: '灵活性和开放性', score: { P: 1 } }
      ]
    },
    {
      id: 17,
      text: '打电话给别人时，你：',
      options: [
        { id: 'a', text: '毫不犹豫，直接拨打', score: { E: 1 } },
        { id: 'b', text: '需要先准备一下，甚至有点犹豫', score: { I: 1 } }
      ]
    },
    {
      id: 18,
      text: '你处理问题的方式是：',
      options: [
        { id: 'a', text: '依靠过去的经验', score: { S: 1 } },
        { id: 'b', text: '尝试新的方法', score: { N: 1 } }
      ]
    },
    {
      id: 19,
      text: '在争论中，你更可能：',
      options: [
        { id: 'a', text: '坚持正确的立场', score: { T: 1 } },
        { id: 'b', text: '寻求共识和理解', score: { F: 1 } }
      ]
    },
    {
      id: 20,
      text: '对于假期计划，你：',
      options: [
        { id: 'a', text: '提前详细规划每一天', score: { J: 1 } },
        { id: 'b', text: '走一步看一步，随性而为', score: { P: 1 } }
      ]
    }
  ],
  results: [
    {
      id: 'INTJ',
      title: '建筑师 (INTJ) - 独立战略家',
      description: '你是富有想象力和战略性的思想家，对一切都有计划。你拥有独特的视角和强大的分析能力，善于看到大局并制定长远计划。你追求知识和自我提升，是天生的领导者和创新者。',
      type: 'analyst',
      mbtiType: 'INTJ'
    },
    {
      id: 'INTP',
      title: '逻辑学家 (INTP) - 创新思考者',
      description: '你是具有创新精神的发明家，对知识有着永不满足的渴望。你喜欢分析问题、探索新概念，追求逻辑上的完美。你的思维灵活，能够从多个角度看待问题，但有时可能过于沉浸在自己的思想世界中。',
      type: 'analyst',
      mbtiType: 'INTP'
    },
    {
      id: 'ENTJ',
      title: '指挥官 (ENTJ) - 果断领导者',
      description: '你是大胆、富有想象力且意志强大的领导者，总能找到或创造解决办法。你天生具有组织能力和决策力，善于激励他人共同追求目标。你追求效率和成就，是天生的战略家。',
      type: 'analyst',
      mbtiType: 'ENTJ'
    },
    {
      id: 'ENTP',
      title: '辩论家 (ENTP) - 聪明好奇者',
      description: '你是聪明好奇的思想家，无法抗拒智力挑战。你喜欢辩论和探讨新想法，思维敏捷且富有创造力。你善于发现可能性，但可能对日常细节缺乏耐心。你的活力和机智使你成为出色的问题解决者。',
      type: 'analyst',
      mbtiType: 'ENTP'
    },
    {
      id: 'INFJ',
      title: '提倡者 (INFJ) - 安静神秘者',
      description: '你是安静而神秘的人，但非常鼓舞人心，且不知疲倦的理想主义者。你深刻理解他人，具有强大的直觉和洞察力。你追求意义和目的，善于帮助他人实现潜能，但有时可能过于理想化。',
      type: 'diplomat',
      mbtiType: 'INFJ'
    },
    {
      id: 'INFP',
      title: '调停者 (INFP) - 诗意善良者',
      description: '你是诗意、善良的利他主义者，总是热情地为正当理由提供帮助。你拥有丰富的内心世界和深刻的价值观，追求真实和自我表达。你富有创造力和同理心，但有时可能过于敏感或逃避冲突。',
      type: 'diplomat',
      mbtiType: 'INFP'
    },
    {
      id: 'ENFJ',
      title: '主人公 (ENFJ) - 魅力型领导者',
      description: '你是富有魅力和鼓舞人心的领导者，能够迷住听众。你天生善于理解他人并激励他们成长，是出色的导师和团队建设者。你追求和谐和帮助他人，但有时可能过于照顾他人而忽略自己。',
      type: 'diplomat',
      mbtiType: 'ENFJ'
    },
    {
      id: 'ENFP',
      title: '竞选者 (ENFP) - 热情创意者',
      description: '你是热情、有创造力和社交能力的自由精神者，总能找到微笑的理由。你充满活力和想象力，善于发现可能性并激励他人。你追求多样性和新体验，但有时可能难以专注或坚持到底。',
      type: 'diplomat',
      mbtiType: 'ENFP'
    },
    {
      id: 'ISTJ',
      title: '物流师 (ISTJ) - 务实主义者',
      description: '你是非常务实和注重事实的人，其可靠性无可置疑。你重视传统和秩序，善于建立稳定的系统和流程。你是团队中的中坚力量，总是能够按时完成任务并确保质量，但有时可能过于保守或抗拒改变。',
      type: 'sentinel',
      mbtiType: 'ISTJ'
    },
    {
      id: 'ISFJ',
      title: '守卫者 (ISFJ) - 专注保护者',
      description: '你是非常专注和温暖的保护者，时刻准备着保护所爱之人。你是可靠和体贴的，善于注意到他人的需求并提供支持。你重视和谐和责任，但有时可能过于照顾他人而忽略自己。',
      type: 'sentinel',
      mbtiType: 'ISFJ'
    },
    {
      id: 'ESTJ',
      title: '总经理 (ESTJ) - 出色管理者',
      description: '你是出色的管理者，在管理事务或人方面无与伦比。你天生具有组织能力和决策力，善于建立结构和确保效率。你追求秩序和传统，但有时可能过于强势或不够灵活。',
      type: 'sentinel',
      mbtiType: 'ESTJ'
    },
    {
      id: 'ESFJ',
      title: '执政官 (ESFJ) - 体贴关怀者',
      description: '你是极体贴、爱社交、受欢迎的人，总是热心地帮助他人。你善于建立和谐的人际关系，重视传统和社区。你天生善于照顾他人，但有时可能过于依赖他人的认可。',
      type: 'sentinel',
      mbtiType: 'ESFJ'
    },
    {
      id: 'ISTP',
      title: '鉴赏家 (ISTP) - 大胆实践者',
      description: '你是大胆而实际的实验者，精通使用各种工具。你活在当下，善于解决实际问题和应对突发情况。你喜欢动手实践，对周围环境有敏锐的观察力，但有时可能过于冲动或缺乏长远规划。',
      type: 'explorer',
      mbtiType: 'ISTP'
    },
    {
      id: 'ISFP',
      title: '探险家 (ISFP) - 灵活艺术家',
      description: '你是灵活而有魅力的艺术家，时刻准备探索和体验新事物。你敏感而富有创造力，追求真实和自我表达。你善于适应环境，但有时可能过于被动或难以做决定。',
      type: 'explorer',
      mbtiType: 'ISFP'
    },
    {
      id: 'ESTP',
      title: '企业家 (ESTP) - 精明冒险者',
      description: '你是聪明、精力充沛、善于感知的人，真正享受生活在边缘。你善于把握机会和应对挑战，思维敏捷且适应能力强。你追求刺激和多样性，但有时可能过于冲动或忽视后果。',
      type: 'explorer',
      mbtiType: 'ESTP'
    },
    {
      id: 'ESFP',
      title: '表演者 (ESFP) - 自发娱乐者',
      description: '你是自发、精力充沛的娱乐者，生活在你周围永不乏味。你充满活力和魅力，善于活跃气氛并让他人感到快乐。你活在当下，追求快乐和新体验，但有时可能过于追求刺激而缺乏长远考虑。',
      type: 'explorer',
      mbtiType: 'ESFP'
    }
  ]
};
