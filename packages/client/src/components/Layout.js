import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useRouter } from 'next/router';
import '../../styles/Common.css';

const Layout = ({ children }) => {
  const router = useRouter();

  // 現在のページに基づいてアイコンを決定
  const isMenuPage = router.pathname === '/menu';
  const isTicketPage = router.pathname === '/myTicket';
  const isNftPage = router.pathname === '/myNftPage';

  const menuIcon = isMenuPage ? '/images/coffe_on.png' : '/images/coffe_off.png';
  const ticketIcon = isTicketPage ? '/images/phon_on.png' : '/images/phon_off.png';
  const checkinIcon = '/images/checkin.png' // チェックインアイコン用の判定

  return (
    <div>
      <main>{children}</main>
      <footer className="footer-nav">
        <ul className="footer-links">
          <li><a href="/menu"><img src={menuIcon} alt="Menu" /></a></li>
          <li><a href="/myNftPage" className="check-in-icon"><img src={checkinIcon} alt="Check In" /></a></li>
          <li><a href="/myTicket"><img src={ticketIcon} alt="My Ticket" /></a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;