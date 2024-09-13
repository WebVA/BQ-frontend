import { useWeb3Modal } from '@web3modal/wagmi/react';
import { parseUnits } from 'ethers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { cn, convertAmount } from '@/lib/utils';

import { InsurancePoolContract } from '@/constant/contracts';
import { StakeType } from '@/screen/stake/constants';
import Button from '@/components/button/button';

type CurrencyProps = {
  pool: StakeType | undefined;
};

export const Currency = ({ pool }: CurrencyProps): JSX.Element => {
  const [amount, setAmount] = useState<string>('');
  const [period, setPeriod] = useState<number>(30);
  const { open, close } = useWeb3Modal();

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

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

  const handleDepositContract = async (poolId: string) => {
    console.log('Deposit is ', InsurancePoolContract, BigInt(poolId));
    const realAmount = convertAmount(amount);
    const params = [Number(poolId)];

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

  return (
    <div className='flex flex-1 flex-col gap-4 rounded-sm bg-[#1E1E1E] p-[15px]'>
      <div className='flex items-center gap-[22px]'>
        <div className='w-fit min-w-[200px] text-[30px] font-bold'>
          Deposit Currency - BTCP
        </div>
        <div className='h-[1px] flex-1 bg-white/50'></div>
      </div>
      <div className='relative flex flex-col gap-4 rounded border border-white/10 bg-[#373737] px-12 py-[34px]'>
        <div className='text-[20px] font-bold'>Pool Details:</div>
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
        <Button
          variant='gradient'
          className='w-fit min-w-[183px] rounded bg-gradient-to-r from-[#00ECBC] to-[#005746] px-5 py-3 text-center'
          onClick={async () =>
            isConnected
              ? await handleDepositContract(pool?.poolId ? pool?.poolId : '1')
              : open()
          }
        >
          {isConnected ? 'Deposit BTCP' : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  );
};
