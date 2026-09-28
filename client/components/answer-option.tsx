import type { AnswerOption } from "@/types/answer-option";

export default function AnswerOption({
  option,
  name,
  checked,
  onSelect,
}: {
  option: AnswerOption;
  name: string;
  checked: boolean;
  onSelect?: () => void;
}) {
  return (
    <label
      htmlFor={option.id}
      className="answer-option block bg-blue-04 has-checked:bg-blue-03 has-checked:shadow-option-active has-checked:ring has-checked:ring-blue-01 hover:bg-blue-03 rounded-xl py-2.5 px-4 md:py-3.5 md:px-6 cursor-pointer"
    >
      <input
        type="radio"
        name={name}
        id={option.id}
        value={option.weight}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="text-base leading-6 md:text-xl/7">{option.text}</span>
    </label>
  );
}
