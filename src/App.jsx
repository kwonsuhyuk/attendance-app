import MyCalendar from './Components/Calendar/MyCalendar';
import QrGenerator from './Components/QR/QrGenerator';
import QrScan from './Components/QR/QrScan';
import './index.css';

function App() {
  return (
    <div>
      <MyCalendar />
      <QrGenerator />
      <QrScan />
    </div>
  );
}

export default App;
