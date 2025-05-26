import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { UserIcon, MailIcon, BriefcaseIcon, XIcon } from "lucide-react";
import { EmployeeInfo } from "@/model/types/user.type";

interface IAutoCompleteUserInputProps {
  users: EmployeeInfo[];
  onSelect: (user: EmployeeInfo | null) => void;
  value?: string;
  onClear?: () => void;
}

const AutoCompleteUserInput = ({
  users,
  onSelect,
  value,
  onClear,
}: IAutoCompleteUserInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<EmployeeInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 0) {
      setShowSuggestions(false);
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(filtered);
    setShowSuggestions(true);
  };

  const handleSelect = (user: EmployeeInfo) => {
    setInputValue(user.name);
    setShowSuggestions(false);
    onSelect(user);
  };

  const handleClearClick = () => {
    setInputValue("");
    setFilteredUsers([]);
    setShowSuggestions(false);
    onSelect(null);
    onClear?.();
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md">
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder="이름 검색"
        className="h-10 w-full min-w-0 rounded-sm pr-10 placeholder:text-sm dark:text-white"
      />
      {inputValue && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={handleClearClick}
            className="pointer-events-auto border-none bg-transparent text-gray-400 hover:text-gray-600"
          >
            <XIcon size={16} />
          </button>
        </div>
      )}
      {showSuggestions && filteredUsers.length > 0 && (
        <ul
          className={`absolute left-0 z-10 mt-2 max-h-72 w-full max-w-xs overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg sm:max-w-md`}
        >
          {filteredUsers.map((user, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(user)}
              className="cursor-pointer rounded-md px-3 py-3 transition-colors duration-150 hover:bg-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <UserIcon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <MailIcon size={13} className="mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <BriefcaseIcon size={13} className="mr-1" />
                    {user.jobName} · {user.employmentType}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteUserInput;
