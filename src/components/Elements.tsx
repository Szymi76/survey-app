import { CheckIcon } from "@heroicons/react/24/solid";

//////// Checkbox //////////
interface CheckboxProps {
  checked: boolean;
  className?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const Checkbox = ({ checked, label, className = "", onClick }: CheckboxProps) => {
  return (
    <div className="checkbox">
      <span className={checked ? "checked" : ""} onClick={onClick}>
        <CheckIcon className={`h-5 ${checked ? "visible" : "invisible"}`} />
      </span>

      <p>{label}</p>
    </div>
  );
};

/////////// Input with label ///////////
interface InputWithLabelProps {
  label: string;
  type: "text" | "number";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const InputWithLabel = ({ label, type, onChange }: InputWithLabelProps) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} onChange={onChange} />
    </div>
  );
};

export { Checkbox, InputWithLabel };
