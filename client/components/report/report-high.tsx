import Report from "./report";
import CognitiveStrengthHigh from "./sections/cognitive-strength/cognitive-strength-high";
import EmotionalRegulationHigh from "./sections/emotional-regulation/emotional-regulation-high";
import Faq from "./sections/faq/faq";
import UnderstandingScore from "./sections/understending-score";

const FAQ_LIST = [
  {
    question: "Does a high ADHD score mean I have ADHD?",
    answer:
      "This score suggests significant ADHD traits, but an official diagnosis requires professional evaluation.",
  },
  {
    question: "Can ADHD traits be strengths?",
    answer:
      "Yes. Many individuals with high ADHD traits excel in creative problem-solving, hyperfocus on topics of deep interest, adaptability, and high-energy multitasking.",
  },
  {
    question: "What strategies can help manage high ADHD traits?",
    answer:
      "Effective approaches include time-blocking, external reminders, breaking large tasks into tiny steps, optimizing your work environment to reduce distractions, and regular physical activity.",
  },
  {
    question: "Does this score mean I struggle with emotional regulation?",
    answer:
      "Not necessarily, though emotional intensity and rejection sensitivity are frequently associated with ADHD traits due to differences in executive functioning.",
  },
  {
    question: "How can I stay organized with high ADHD traits?",
    answer:
      "Use visual organizational tools like Kanban boards, keep essentials visible rather than tucked away in drawers, and establish consistent, low-friction daily routines.",
  },
  {
    question: "Can my ADHD trait levels change over time?",
    answer:
      "While underlying neurodivergence remains relatively stable, how traits manifest can shift significantly based on stress levels, coping tools, lifestyle habits, and your environment.",
  },
];

export default class ReportHigh extends Report {
  getFaq(): React.ReactNode {
    return <Faq questions={FAQ_LIST} />;
  }

  getRegulation(): React.ReactNode {
    return <EmotionalRegulationHigh />;
  }

  getStrenghts(): React.ReactNode {
    return <CognitiveStrengthHigh />;
  }

  getUnderstanding(): React.ReactNode {
    return (
      <UnderstandingScore>
        Your score suggests that you exhibit high ADHD traits, meaning that
        attention difficulties, impulsivity, hyperactivity, and executive
        dysfunction significantly impact daily life. While these challenges can
        be frustrating, they are not insurmountable. Many individuals with high
        ADHD traits develop effective coping mechanisms that allow them to
        manage difficulties while harnessing their unique strengths.
      </UnderstandingScore>
    );
  }
}
