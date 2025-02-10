import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { TPositionSelectorProps } from "@/model";

export const PositionSelector = ({ position, onPositionChange }: TPositionSelectorProps) => {
  return (
    <div className="p-3 rounded border-solid border-2 border-blue-400">
      <FormLabel id="demo-controlled-radio-buttons-group">가입 포지션</FormLabel>
      <RadioGroup value={position} onChange={onPositionChange}>
        <FormControlLabel value="manager" control={<Radio />} label="관리자" />
        <FormControlLabel value="employee" control={<Radio />} label="직원" />
      </RadioGroup>
    </div>
  );
};
