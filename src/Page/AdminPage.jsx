import { useEffect, useState } from 'react';
import firebase from 'firebase';
import moment from 'moment';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('users').get();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <div>
      {users.map((user) => {
        const totalWorkTime = Object.values(user.attendance).reduce(
          (total, { start, end }) => {
            const workTime = moment(end).diff(moment(start), 'hours');
            return total + workTime;
          },
          0
        );

        const nightShifts = Object.values(user.attendance).filter(
          ({ start, end }) => {
            const startHour = moment(start).hour();
            const endHour = moment(end).hour();
            return startHour >= 22 || endHour <= 6;
          }
        ).length;

        const weekdayShifts = Object.values(user.attendance).filter(
          ({ start }) => {
            const dayOfWeek = moment(start).day();
            return dayOfWeek >= 1 && dayOfWeek <= 5;
          }
        ).length;

        const weekendShifts = Object.values(user.attendance).filter(
          ({ start }) => {
            const dayOfWeek = moment(start).day();
            return dayOfWeek === 0 || dayOfWeek === 6;
          }
        ).length;

        return (
          <div
            key={user.id}
            style={{
              margin: '20px',
              padding: '20px',
              border: '1px solid black',
            }}
          >
            <h2>{user.name}</h2>
            <p>총 근무 시간: {totalWorkTime} 시간</p>
            <p>야간 근무 횟수: {nightShifts} 회</p>
            <p>주간 근무 횟수: {weekdayShifts} 회</p>
            <p>주말 근무 횟수: {weekendShifts} 회</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPage;
