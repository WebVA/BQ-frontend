import React from 'react';

import Button from '@/components/button/button';

import { PropsalStatus } from '@/types/main';

type StatusType = {
  status: PropsalStatus | undefined;
};

const StatusText = ['Submitted', 'Pending', 'Withdraw'];

export const Status: React.FC<StatusType> = ({ status }): JSX.Element => {
  return (
    <div className='mt-8 flex flex-col gap-12 pb-10'>
      <div className='border-b border-[#6D6D6D] pb-[14px] pr-20 text-[35px] font-semibold'>
        Claim Status
      </div>
      <div className='relative h-[13px] w-[600px] rounded-full bg-[#D9D9D9]'>
        <div className='absolute bottom-0 left-0 top-0 h-[13px] w-1/2 rounded-full bg-[#00ECBC]'></div>
        <div className='absolute left-1/3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#00ECBC]'>
          <div className='absolute left-1/2 mt-8 -translate-x-1/2'>
            Withdraw
          </div>
        </div>
        <div className='absolute left-2/3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#D9D9D9]'>
          <div className='absolute left-1/2 mt-8 -translate-x-1/2'>Pending</div>
        </div>
        <div className='absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#D9D9D9]'>
          <div className='absolute left-1/2 mt-8 -translate-x-1/2'>
            Submitted
          </div>
        </div>
      </div>
      {/* {StatusText.map((text, index) => (
      <Button key={index} className='w-full' variant={status == index ? 'primary' : 'gradient-outline'} size='xl'>{text}</Button>  
      ))} */}
      {/* <Button className='w-full' variant='primary' size='xl'>
        Submitted
      </Button>
      <Button className='w-full' variant='gradient-outline' size='xl'>
        Pending
      </Button>
      <Button className='w-full' variant='gradient-outline' size='xl'>
        Withdraw
      </Button> */}
    </div>
  );
};
