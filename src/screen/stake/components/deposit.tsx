'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/button/button';
import Modal from '@/components/modal';

const DepositModal = ({
  index,
  currency,
  onStake,
}: {
  index: number;
  currency: string;
  onStake: (id: number, amount: string, day: number) => void;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const handleStake = useCallback(() => {
    onStake(index, amount, 10);
  }, [amount, index, onStake]);

  return (
    <>
      <div className='h-full w-full'>
        <Button
          variant='gradient'
          className='h-10 w-full px-5 py-[11px]'
          onClick={() => setIsOpen(true)}
        >
          Stake Now
        </Button>
      </div>
      <Modal maxWidth='lg' isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <div className='flex min-h-[398px] w-full flex-col items-center rounded bg-gradient-to-r from-[#1E1E1E] to-[#1E1E1E] p-3'>
          <div className='flex w-full flex-1 flex-col gap-[25px] rounded bg-gradient-to-r from-[#3D3D3D] to-[#303030] px-[39px] py-[27px]'>
            <div className='text-[20px] font-bold'>{`Deposit Currency ${currency}`}</div>
            <div className='flex h-auto rounded border border-[#6D6D6D] px-1 py-[5px]'>
              <input
                className={cn(
                  'placeholder:text-light/50 min-w-0 flex-auto border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                )}
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className='h-[36px] min-w-[86px] rounded-[10px] bg-[#131313] px-[13px] py-[6px] text-center text-[15px] leading-[24px] text-white'>
                Max
              </div>
            </div>
            <div className='w-fit rounded border border-white/5 bg-white/10 px-[18px] py-[9px]'>
              Tenure Period
            </div>
          </div>
          <div className='flex justify-center py-[27px]'>
            <div
              className='w-fit min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
              onClick={handleStake}
            >
              Stake
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepositModal;
