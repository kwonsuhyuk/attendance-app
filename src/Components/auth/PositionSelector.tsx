import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export interface IPositionSelectorProps {
  position: "manager" | "employee" | "";
  onPositionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PositionSelector = ({ position, onPositionChange }: IPositionSelectorProps) => {
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
