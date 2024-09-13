import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { cn, convertMyStakeTypeData } from '@/lib/utils';
import { useAllInsurancePoolsByAddress } from '@/hooks/contracts/pool/useAllInsurancePoolsByAddress';
import { useGetUserDeposit } from '@/hooks/contracts/pool/useGetUserDeposit';

import Button from '@/components/button/button';

import { ICoverContract, InsurancePoolContract } from '@/constant/contracts';
import { MyStackDetail, MyStakeType } from '@/screen/stake/constants';

import { InsurancePoolType } from '@/types/main';

import LeftArrowIcon from '~/svg/left-arrow.svg';

export const MyStakeScreen = (): JSX.Element => {
  const chainId = useChainId();
  const { address, isConnected } = useAccount();
  const [myStacks, setMyStacks] = useState<MyStakeType[]>([]);
  const pools = useAllInsurancePoolsByAddress(`${address}`);

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

  const handleWriteContract = async (poolId: number): Promise<void> => {
    console.log('wallet address is: ', `${address}`);

    try {
      await writeContractAsync({
        ...InsurancePoolContract,
        functionName: 'withdraw',
        args: [BigInt(poolId.toString())],
      });
      // console.log("poolId is ", poolId);
      toast.success('Withdraw Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = "Can't withdraw before tenure passed!";
        }
      } else {
        errorMsg = 'Unexpected error';
      }

      toast.error(errorMsg);
    }
  };

  const handleClaimWriteContract = async (poolId: number): Promise<void> => {
    console.log('wallet address is: ', `${address}`);

    try {
      await writeContractAsync({
        ...ICoverContract,
        functionName: 'claimPayoutForLP',
        args: [BigInt(poolId.toString())],
      });
      toast.success('Claim Sucess!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = 'InsufficientPoolBalance!';
        }
      } else {
        errorMsg = 'Unexpected error';
      }

      toast.error(errorMsg);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (pools.length > 0) {
      setMyStacks(convertMyStakeTypeData(pools as InsurancePoolType[]));
    }
  }, [pools]);

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='container mx-auto flex flex-auto flex-col items-center gap-10 pt-12'>
        <div className='text-[40px] font-bold leading-[50px]'>
          Active Stake Positions
        </div>
        <div className='flex min-h-[400px] w-full flex-col gap-6'>
          {myStacks?.map((stack, index) => (
            <div
              key={index}
              className='flex min-w-[630px] flex-1 flex-col gap-20 rounded-sm bg-[#1E1E1E] p-[15px]'
            >
              <div className='relative flex flex-col gap-[46px] rounded border border-white/10 bg-[#373737] px-24 py-11'>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-5'>
                    {Object.keys(stack).map((key, i) => (
                      <div
                        key={i}
                        className={cn(
                          `flex flex-col items-center gap-[17px]`,
                          (key === 'poolId' ||
                            key === 'tvl' ||
                            key === 'claim' ||
                            key === 'apy' ||
                            key === 'depositAmount' ||
                            key === 'tenure' ||
                            key === 'currency') &&
                            'hidden'
                        )}
                      >
                        <div className='w-[200px] gap-x-1'>
                          <div
                            className={cn(
                              'w-[200px] rounded border border-white/5 bg-white/10 px-[18px] py-[9px] text-center'
                            )}
                          >
                            {MyStackDetail[key as keyof typeof MyStackDetail]}
                          </div>
                          <div className='text-center text-[22px] font-bold'>
                            {stack[key as keyof typeof stack]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant='primary'
                    size='lg'
                    className='min-w-[230px] rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
                    onClick={() => handleClaimWriteContract(index + 1)}
                  >
                    Claim Yield
                  </Button>
                </div>
                <div className='h-[1px] w-full bg-white/30'></div>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-5'>
                    {Object.keys(stack).map((key, i) => (
                      <div
                        key={i}
                        className={cn(
                          `flex flex-col items-center gap-[17px]`,
                          (key === 'poolId' ||
                            key === 'tvl' ||
                            key === 'claim' ||
                            key === 'apy' ||
                            key === 'rating' ||
                            key === 'dailyPayout' ||
                            key === 'currency') &&
                            'hidden'
                        )}
                      >
                        <div className='w-[200px] gap-x-1'>
                          <div
                            className={cn(
                              'w-[200px] rounded border border-white/5 bg-white/10 px-[18px] py-[9px] text-center'
                            )}
                          >
                            {MyStackDetail[key as keyof typeof MyStackDetail]}
                          </div>
                          <div className='text-center text-[22px] font-bold'>
                            {stack[key as keyof typeof stack]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant='primary'
                    size='lg'
                    className='min-w-[230px] rounded-sm bg-gradient-to-r from-[#007ADF] to-[#003F74]'
                    onClick={() => handleWriteContract(index + 1)}
                  >
                    Withdraw Stake
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-6'>
            <div className='text-2xl font-semibold'>
              Looking for custom solutions for your business
            </div>
            <Button
              variant='primary'
              size='lg'
              className='rounded-[10px] bg-none text-[#00ECBC] outline outline-[#00ECBC]'
            >
              Reach out to us
            </Button>
          </div>
          <div className='flex items-center gap-8'>
            <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px]' />
            </div>
            <div className='bg-background-100 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px] rotate-180' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
