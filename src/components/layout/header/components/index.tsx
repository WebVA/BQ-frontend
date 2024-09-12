'use client';

import Link from 'next/link';
import React from 'react';

import { Menu } from '@/components/layout/header/components/menu';
import { ConnectButton } from '@/components/layout/header/components/wagmiConnect';
import NextImage from '@/components/NextImage';

const Header = (): JSX.Element => {
  return (
    <nav className='sticky top-0 z-[999999999999999]'>
      <div className='border-border-100 from-background-100 flex h-[100px] w-full items-center justify-between gap-0 border-b bg-gradient-to-br to-[#0C0C0C] px-[100px]'>
        <Link href='/'>
          <NextImage
            useSkeleton
            src='/images/logo.png'
            width={231}
            height={51}
            alt='logo'
          />
        </Link>
        <div className='flex h-full items-center justify-end gap-12'>
          <div className='flex h-full flex-auto'>
            <Menu />
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
