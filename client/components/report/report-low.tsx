import Report from "./report";
import CognitiveStrengthLow from "./sections/cognitive-strength/cognitive-strength-low";
import EmotionalRegulationLow from "./sections/emotional-regulation/emotional-regulation-low";
import Faq from "./sections/faq/faq";
import UnderstandingScore from "./sections/understending-score";

const FAQ_LIST = [
  {
    question: "Does a low ADHD score mean I definitely don't have ADHD?",
    answer:
      "A low score suggests minimal ADHD traits, but if you have concerns, a professional evaluation can provide a definitive answer.",
  },
  {
    question: "Can I still benefit from brain training with low ADHD traits?",
    answer:
      "Yes. Cognitive exercises can help anyone sharpen focus, improve working memory, and boost mental processing speed, regardless of their baseline score.",
  },
  {
    question: "What can I do to maintain my strong cognitive performance?",
    answer:
      "Prioritize consistent sleep, stay physically active, maintain a balanced diet, and engage in regular mental challenges like learning new skills or practicing mindfulness.",
  },
  {
    question: "Can my ADHD trait levels change over time?",
    answer:
      "Yes. Factors such as chronic stress, major lifestyle changes, sleep quality, and hormonal shifts can temporarily amplify or diminish traits associated with attention and executive function.",
  },
  {
    question: "Is a low score something to be proud of?",
    answer:
      "A low score simply indicates fewer reported traits, not personal achievement or superiority. Brain profiles are diverse, and every cognitive style comes with distinct strengths and challenges.",
  },
];

export default class ReportLow extends Report {
  getFaq(): React.ReactNode {
    return <Faq questions={FAQ_LIST} />;
  }

  getRegulation(): React.ReactNode {
    return <EmotionalRegulationLow />;
  }

  getStrenghts(): React.ReactNode {
    return <CognitiveStrengthLow />;
  }

  getUnderstanding(): React.ReactNode {
    return (
      <UnderstandingScore>
        Your score suggests minimal ADHD traits. You show a strong ability to
        focus, self-regulate, and manage daily responsibilities. While
        occasional challenges may arise, they are unlikely to significantly
        impact your daily functioning.
      </UnderstandingScore>
    );
  }
}
