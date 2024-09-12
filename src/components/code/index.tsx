'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import CodeGridcon from '~/svg/code-grid.svg';
import DiscordIcon from '~/svg/discord.svg';
import LayersIcon from '~/svg/layers.svg';
import RightArrowIcon from '~/svg/right-arrow.svg';

export const Code = (): JSX.Element => {
  const router = useRouter();
  const [code, setCode] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    if (code === process.env.NEXT_PUBLIC_PASS_CODE) {
      localStorage.setItem('bq-code', 'true');
      router.replace('/');
    } else {
      setIsError(true);
    }
  }, [code, router]);

  useEffect(() => {
    if (!code) setIsError(false);
  }, [code]);

  return (
    <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-black'>
      <div className='absolute bottom-0 right-0'>
        <LayersIcon className='h-[648px] w-[648px]' />
      </div>
      <div className='flex w-[350px] flex-col items-center gap-5'>
        <div>
          <CodeGridcon className='h-[73px] w-[73px]' />
        </div>
        <div className='relative w-full rounded border border-[#6D6D6D] px-5 py-[14px]'>
          <input
            type='password'
            className='border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
            placeholder='Password'
            value={code || ''}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer disabled:cursor-not-allowed'
            disabled={!code}
            onClick={handleConfirm}
          >
            <RightArrowIcon className='h-[18px] w-[28px]' />
          </button>
        </div>
        {isError && (
          <div className='text-xs text-red-600'>Incorrect passcode</div>
        )}
        <Link
          className='flex w-full items-center justify-between rounded bg-gradient-to-r from-[#2A2F6B] to-[#5866FF] px-5 py-[14px]'
          href='https://discord.org'
        >
          <div>Get access throguht Discord</div>
          <DiscordIcon className='h-[24px] w-[32px]' />
        </Link>
      </div>
    </div>
  );
};
