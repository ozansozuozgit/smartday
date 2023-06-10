'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import './SidebarNav.css';

const SidebarNav = () => {
  const [activeTab, setActiveTab] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='mobile-menu' onClick={handleToggle}>
        <FiMenu />
      </div>
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeTab === item.path ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
