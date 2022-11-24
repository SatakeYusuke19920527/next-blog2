import { FC } from 'react';
import { LayoutProps } from '../types/types';
import Footer from './Footer';
import Navbar from './Navbar';

const layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='w-full pb-12 px-4'>{children}</main>
      <Footer />
    </div>
  );
};

export default layout