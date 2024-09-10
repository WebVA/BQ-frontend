import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

import Dropdown from '@/components/dropdown';
import Input from '@/components/input';
import { Slider } from '@/components/slider';

import ArrowIcon from '~/svg/arrow.svg';
import { CoverDueTo } from '@/types/main';
import { MAX_COVER_PERIOD, MIN_COVER_PERIOD } from '@/constant/config';
import { cn } from '@/lib/utils';

type DetailProps = {
  id: number;
  coverAmount: string;
  handleCoverAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  coverPeriod: number;
  handleCoverPeriodChange: (val: number) => void;
  dueTo: CoverDueTo;
  maxCoverAmount: string;
};

export const Detail = (props: DetailProps): JSX.Element => {
  const {
    id,
    coverAmount,
    coverPeriod,
    dueTo,
    maxCoverAmount,
    handleCoverAmountChange,
    handleCoverPeriodChange,
  } = props;

  const [period, setPeriod] = useState<number>(30);
  const [selectedToken, setSelectedToken] = useState<number>(0);

  return (
    <div className='flex flex-col gap-4'>
      <div className='border-border-100 w-fit min-w-[200px] border-b-[0.5px] pb-2 text-[20px] font-bold'>
        Cover Details
      </div>
      <div className='relative flex flex-col gap-4 rounded border border-white/10 bg-[#373737] px-12 py-[34px]'>
        <div className='absolute right-0 top-0 flex h-[23px] w-[23px] items-center justify-center rounded border border-[#5B5B5B] bg-gradient-to-r from-[#3D3D3D] to-[#303030] p-3 text-[8px]'>
          i
        </div>
        <div className='flex flex-col gap-[13px] rounded-[15px]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[10px]'>
              <div>Cover amount</div>
              {/* <div className='bg-background-200 h-5 w-5 rounded-full' /> */}
            </div>
          </div>
          <div className='flex h-auto rounded border border-[#6D6D6D] px-1 py-[5px]'>
            <input
              className={cn(
                'placeholder:text-light/50 min-w-0 flex-auto border-none bg-transparent p-0 px-3 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
              )}
              placeholder='Enter Amount'
              value={coverAmount || ''}
              onChange={(e) => handleCoverAmountChange(e)}
            />
            <div className='h-[36px] min-w-[86px] rounded-[10px] bg-[#131313] px-[13px] py-[6px] text-center text-[15px] leading-[24px] text-white'>
              BTCP
            </div>
          </div>
        </div>

        <div className='flex w-full justify-end'>
          <div className='flex w-fit items-center gap-2 rounded border border-white/5 bg-white/10 px-[11px] py-[9px]'>
            <div className='text-xs font-semibold leading-[12px]'>
              Max: {parseFloat(maxCoverAmount).toFixed(2)} BTCP
            </div>
            <div className='flex h-[14px] w-[14px] items-center justify-center rounded border border-[#5B5B5B] bg-gradient-to-r from-[#3D3D3D] to-[#303030] text-[8px]'>
              i
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-[13px]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[10px]'>
              <div>Cover Duration</div>
            </div>
          </div>
          <div className='flex items-start justify-between'>
            <div className='flex h-auto w-[200px] rounded border border-[#6D6D6D] px-1 py-[5px]'>
              <input
                className={cn(
                  'placeholder:text-light/50 min-w-0 flex-auto border-none bg-transparent p-0 px-3 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                )}
                readOnly
                value={coverPeriod || ''}
                onChange={(e) =>
                  handleCoverPeriodChange(
                    Math.max(
                      MIN_COVER_PERIOD,
                      Math.min(MAX_COVER_PERIOD, Number(e.target.value))
                    )
                  )
                }
              />
              <div className='h-[36px] min-w-[86px] rounded-[10px] bg-[#131313] px-[13px] py-[6px] text-center text-[15px] leading-[24px] text-white'>
                days
              </div>
            </div>
            <div className='flex w-[200px] flex-col gap-3'>
              <Slider
                rangeClassName='bg-[#00ECBC]'
                thumbClassName='h-[14px] w-[14px]'
                defaultValue={[MIN_COVER_PERIOD]}
                value={[coverPeriod]}
                onValueChange={(val) => {
                  handleCoverPeriodChange(val[0]);
                }}
                min={MIN_COVER_PERIOD}
                max={MAX_COVER_PERIOD}
                step={1}
              />
              <div className='flex justify-between px-3'>
                <div>28 Days</div>
                <ArrowIcon className='w-6' />
                <div>365 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
