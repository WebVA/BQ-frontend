import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  cn,
  convertAmount,
  convertStakeTypeData,
  convertTvl,
} from '@/lib/utils';
import Button from '@/components/button/button';
import LeftArrowIcon from '~/svg/left-arrow.svg';

import {
  useReadContracts,
  useChainId,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
} from 'wagmi';
import {
  MyStackDetail,
  tempMyStacks,
  StakeType,
} from '@/screen/stake/constants';
import { InsurancePoolContract, MockERC20Contract } from '@/constant/contracts';
import { useAllInsurancePools } from '@/hooks/contracts/pool/useAllInsurancePools';
import DepositModal from './deposit';
import { parseUnits } from 'viem';
import { toast } from 'react-toastify';

export type InsurancePoolType = {
  poolName: string;
  apy: number;
  minPeriod: number;
  acceptedToken: string;
  tvl: number;
  tcp: number;
  isActive: boolean;
};

export const StakeScreen = (): JSX.Element => {
  const chainId = useChainId();

  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('1');

  const { data: balance } = useBalance({ address });

  const [myStacks, setMyStacks] = useState<StakeType[]>([]);

  const insurancePools = useAllInsurancePools();

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

  const handleDepositContract = async (poolId: Number, day: String) => {
    console.log('Deposit is ', InsurancePoolContract, poolId, day);
    const realAmount = convertAmount(amount);
    const params = [Number(poolId), Number(day)];

    console.log('params ', params);
    console.log('Balance: ', balance, 'AMOUNT: ', realAmount);

    try {
      const tx = await writeContractAsync({
        abi: InsurancePoolContract.abi,
        address: InsurancePoolContract.address as `0x${string}`,
        functionName: 'deposit',
        args: params,
        value: parseUnits(amount.toString(), 18),
      });
      toast.success('Deposit Success!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        }
      }
      toast.error(errorMsg);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (insurancePools) {
      setMyStacks(convertStakeTypeData(insurancePools as InsurancePoolType[]));
    }
  }, [insurancePools]);

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='layout flex flex-auto flex-col items-center gap-10 p-10 pt-12'>
        <div className='text-[40px] font-bold leading-[50px]'>
          Stake Idle Assets To Secure And Earn
        </div>
        <div className='flex w-full flex-col gap-5'>
          {myStacks.map((stack, index) => (
            <div
              key={index}
              className='flex w-full gap-[30px] rounded bg-[#1E1E1E] px-[60px] py-[25px]'
            >
              {Object.keys(stack).map((key, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex w-full flex-col items-center gap-6',
                    (key === 'poolId' || key === 'tvl') && 'hidden'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-full items-center justify-center rounded border border-white/10 bg-white/5 px-5 text-sm'
                    )}
                  >
                    {MyStackDetail[key as keyof typeof MyStackDetail]}
                  </div>
                  <div className='font-semibold'>
                    {stack[key as keyof typeof stack]}
                  </div>
                </div>
              ))}
              <div className='flex w-full flex-col items-center gap-[15px]'>
                <DepositModal
                  index={index + 1}
                  currency={stack.currency}
                  onStake={() => handleDepositContract(index + 1, stack.tenure)}
                />
                {stack.tenure}
                <div className='flex h-10 w-full items-center justify-center rounded bg-white px-5 py-[11px]'>
                  <Link
                    href={`/pool/${stack.currency}/${index + 1}`}
                    className='font-semibold text-[black]'
                  >
                    Details
                  </Link>
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
            <div className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px]' />
            </div>
            <div className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/30 active:scale-95'>
              <LeftArrowIcon className='h-[13px] w-[23px] rotate-180' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
