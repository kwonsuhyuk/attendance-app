import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormInputWithButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  placeholder: string;
  buttonText: string;
}

const FormInputWithButton = ({
  value,
  onChange,
  onSubmit,
  onKeyUp,
  placeholder,
  buttonText,
}: FormInputWithButtonProps) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        value={value}
        onKeyUp={onKeyUp}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 py-2"
      />
      <Button type="button" className="h-10 px-4" variant="focusMenu" onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  );
};

export default FormInputWithButton;
