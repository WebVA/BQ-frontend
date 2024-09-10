import React from 'react';

export const Explore = (): JSX.Element => {
  return (
    <div className='flex min-w-[210px] flex-col gap-4 rounded-sm border border-white/10 bg-[#1E1E1E] px-8 py-[23px]'>
      <div className='border-border-100 w-fit min-w-[200px] border-b-[0.5px] pb-2 text-[20px] font-bold'>
        Explore More Covers
      </div>

      <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col gap-[33px] rounded bg-[#373737] px-12 py-[34px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='h-[47px] w-[47px] rounded-full bg-white'></div>
          <div className='flex flex-col gap-[5px]'>
            <div className='text-[18px] font-bold text-white'>Aave V2</div>
            <div className='text-[#AFAFAF]'>Smart Contract Vulnerability</div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>Cover Value</div>
            <div className='font-bold'>2WBTC</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Cover Expiry</div>
            <div className='font-bold'>12.12.2024</div>
          </div>
        </div>
      </div>

      <div className='mt-5 flex w-full justify-center'>
        <div className='flex w-[180px] justify-center rounded border border-white py-[10px] text-center'>
          View More
        </div>
      </div>
    </div>
  );
};
