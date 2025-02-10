import { FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { TManagerConfirmationProps } from "@/model";

interface IManagerConfirmationProps {
  isManagerCheck: boolean;
  setManagerCheck: (checked: boolean) => void;
}

export const ManagerConfirmation = ({
  isManagerCheck,
  setManagerCheck,
}: IManagerConfirmationProps) => {
  return (
    <FormControl error={!isManagerCheck}>
      <FormControlLabel
        className="text-red-500"
        label="관리자로 가입하는 것이 맞습니까?"
        control={
          <Checkbox checked={isManagerCheck} onChange={e => setManagerCheck(e.target.checked)} />
        }
      />
      {!isManagerCheck && <FormHelperText>체크 항목을 체크해주세요</FormHelperText>}
    </FormControl>
  );
};
