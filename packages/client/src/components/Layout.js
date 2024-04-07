import React from 'react';
import { usePathname } from "next/navigation";
import '../../styles/Common.css';

const Layout = ({ children }) => {
  const pathname = usePathname();
  // 現在のページに基づいてアイコンを決定
  const isMenuPage = pathname === '/menu';
  const isTicketPage = pathname === '/myTicket';
  const isNftPage = pathname === '/myNftPage';

  const menuIcon = isMenuPage ? '/images/coffe_on.png' : '/images/coffe_off.png';
  const ticketIcon = isTicketPage ? '/images/phon_on.png' : '/images/phon_off.png';
  const checkinIcon = '/images/checkin.png' // チェックインアイコン用の判定

  return (
    <div>
      <main>{children}</main>
      <footer className="footer-nav">
        <ul className="footer-links">
          <li><a href="/menu"><img src={menuIcon} alt="Menu" /></a></li>
          <li><a href="/" className="check-in-icon"><img src={checkinIcon} alt="Check In" /></a></li>
          <li><a href="/myTicket"><img src={ticketIcon} alt="My Ticket" /></a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;