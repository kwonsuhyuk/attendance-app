import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormInputWithButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  buttonText: string;
}

const FormInputWithButton = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonText,
}: FormInputWithButtonProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center space-x-2">
        <Input value={value} onChange={onChange} placeholder={placeholder} className="h-10 py-2" />
        <Button type="submit" className="h-10 px-4">
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default FormInputWithButton;
