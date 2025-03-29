// components/chart/Tooltip/VacationTooltip.tsx
interface VacationTooltipProps {
  active?: boolean;
  payload?: any[];
}

const VacationTooltip = ({ active, payload }: VacationTooltipProps) => {
  if (active && payload && payload.length) {
    const { name, value, payload: fullData } = payload[0];
    return (
      <div className="rounded-md bg-white p-2 text-xs text-black shadow-md">
        <p className="font-semibold">{name}</p>
        <p>{`${value.toFixed(1)}% (${fullData.days}일)`}</p>
      </div>
    );
  }
  return null;
};

export default VacationTooltip;
