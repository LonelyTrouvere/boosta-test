import Drawer from "./drawer";

export default function Faq({questions}: { questions: { question: string; answer: string }[] }) {
    return (
      <div className="flex flex-col gap-12">
        <h3 className="text-h3 text-dark-blue-01 text-center">Frequently Asked Questions</h3>
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <Drawer key={i} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    );
}