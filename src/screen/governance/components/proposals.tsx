import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useBalance, useWriteContract } from 'wagmi';

import { cn, convertTempProposalTypeData } from '@/lib/utils';

import Button from '@/components/button/button';
import CustomDatePicker from '@/components/DatePicker';

import { GovContract } from '@/constant/contracts';
import { ProposalDetail } from '@/screen/governance/constants';

import { ProposalType } from '@/types/main';
import DownIcon from '~/svg/chav-down.svg';

type CurrencyProps = {
  proposals: ProposalType[] | undefined;
};

export const Proposals = ({ proposals }: CurrencyProps): JSX.Element => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lossEventDate, setLossEventDate] = useState<Date>(new Date());

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      async onSuccess(data) {
        console.log(1);
      },
      onError(error) {
        console.log(1, error);
      },
    },
  });

  const handleAcceptWriteContract = async (proposalId: number) => {
    const params = [proposalId, true];

    console.log('ProposalId: ', proposalId);
    try {
      const tx = await writeContractAsync({
        ...GovContract,
        functionName: 'vote',
        args: params,
      });
      toast.success('Accept Vote Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = 'Already voted';
        }
      } else {
        errorMsg = 'Unexpected error';
      }

      toast.error(errorMsg);
    }
  };

  const handleDeclineWriteContract = async (proposalId: number) => {
    const params = [proposalId, false];

    console.log('ProposalId: ', proposalId);
    try {
      const tx = await writeContractAsync({
        ...GovContract,
        functionName: 'vote',
        args: params,
      });
      toast.success('Decline Vote Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = 'Already voted';
        }
      } else {
        errorMsg = 'Unexpected error';
      }
      toast.error(errorMsg);
    }
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      {convertTempProposalTypeData(proposals ? proposals : []).map(
        (proposal, index) => (
          <div className='flex flex-col'>
            <div
              key={index}
              className='flex w-full gap-5 rounded bg-[#1E1E1E] px-11 py-[26px]'
            >
              {Object.keys(proposal).map((key, i) => (
                <div
                  key={i}
                  className='flex w-full flex-col items-center gap-6'
                >
                  <div className='w-full justify-center rounded border border-white/5 bg-white/10 px-[18px] py-[9px] text-center'>
                    {ProposalDetail[key as keyof typeof ProposalDetail]}
                  </div>
                  <div className='font-semibold'>
                    {key === 'incentive' && <div>100 BQ</div>}
                    {key !== 'incentive' &&
                      proposal[key as keyof typeof proposal]}
                  </div>
                </div>
              ))}
              <div className='flex w-full flex-col gap-[13px]'>
                <Button
                  variant='primary'
                  size='lg'
                  className='w-full min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
                  onClick={() => handleAcceptWriteContract(index + 1)}
                >
                  Accept
                </Button>
                <Button
                  size='lg'
                  className='w-full rounded border border-white bg-transparent'
                  onClick={() => handleDeclineWriteContract(index + 1)}
                >
                  Decline
                </Button>
              </div>
              {/* <div className='flex w-full items-end justify-center gap-6'>
            <Link
              href='/'
              className='font-semibold underline underline-offset-4'
            >
              Details
            </Link>
          </div> */}
            </div>
            <div className='px-[15px]'>
              <div className='flex flex-col items-center justify-center gap-5 rounded-b bg-gradient-to-r from-[#3D3D3D] to-[#303030] p-2'>
                {isOpen && (
                  <div className='flex flex-col gap-5 pt-[30px]'>
                    <div className='flex gap-10'>
                      <div className='flex w-full flex-col gap-1'>
                        <div>Loss Event Date</div>
                        <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                          <CustomDatePicker
                            selectedDate={lossEventDate}
                            handleDateChange={(e) => e && setLossEventDate(e)}
                          />
                        </div>
                      </div>
                      <div className='relative flex w-full flex-col gap-1'>
                        <div>Claim Value</div>
                        <div className='relative flex w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                          <input
                            className='flex-1 border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                            placeholder='Type here...'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full gap-10'>
                      <div className='relative flex w-full flex-col gap-1'>
                        <div>Slashing Tnx Hash</div>
                        <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                          <input
                            className='border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                            placeholder='Type here...'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='relative flex w-full flex-col gap-1'>
                      <div>Description</div>
                      <div className='relative w-full rounded border border-white/5 bg-white/10 px-5 py-2'>
                        <input
                          className='border-none bg-transparent p-0 focus:border-none focus:outline-none focus:outline-offset-0 focus:ring-0'
                          placeholder='Type here...'
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className='flex w-full items-center justify-center gap-2'>
                  <div
                    className='cursor-pointer'
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    More Details
                  </div>
                  <DownIcon
                    className={cn('h-[5px] w-[10px]', isOpen && 'rotate-180')}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
