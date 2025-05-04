export type NotificationType =
  | "vacation_registered" // 관리자가 직원 휴가 등록
  | "vacation_approved" // 관리자가 요청 승인
  | "vacation_rejected" // 관리자가 요청 거절
  | "notice_posted" // 공지사항 등록
  | "manual_commute_update" // 출퇴근 수동 수정
  | "vacation_requested" // 직원이 휴가 요청
  | "new_employee_registered"; // 새로운 직원 가입

export type NotificationPayload = {
  receiverId: string; // 수신자 (필수)
  type: NotificationType; // 알림 종류
  message: string; // 표시할 메시지
  createdAt: number; // 생성 시각 (timestamp)
  read: boolean; // 읽음 여부
  senderId?: string; // 발신자 (선택)
  relatedId?: string; // 관련된 id (휴가 id, 직원 id 등, 선택)
  requestDate?: string; // 휴가 일자
};
