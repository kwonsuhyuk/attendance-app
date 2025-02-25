import PropTypes from "prop-types";
import { formatMoney } from "../../util/formatMoney.util";

function SalaryInfoCard({ date, workType, amount }) {
  return (
    <div className="flex flex-col justify-between items-center space-y-4 w-full">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-baseline">최근 일한 날짜</div>
        <div className="flex items-baseline">{date}</div>
      </div>
      <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-start">최근 근무 형태</div>
        <div className="flex items-baseline">{workType}</div>
      </div>
      <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-baseline">해당 급여</div>
        <div className="flex items-baseline">{formatMoney(amount)}원</div>
      </div>
    </div>
  );
}

// PropTypes로 타입 체크 (선택사항)
SalaryInfoCard.propTypes = {
  date: PropTypes.string.isRequired,
  workType: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default SalaryInfoCard;
