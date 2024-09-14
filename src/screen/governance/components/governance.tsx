import React, { useState } from 'react';

import { useAllLiveProposals } from '@/hooks/contracts/governance/useAllLiveProposals';

import Button from '@/components/button/button';

import { Proposals } from '@/screen/governance/components/proposals';
import { SwitchProposal } from '@/screen/governance/components/SwitchProposal';

import { ProposalType } from '@/types/main';
import LightIcon from '~/svg/light.svg';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { parseUnits } from 'viem';
import { MockERC20Contract } from '@/constant/contracts';
import { toast } from 'react-toastify';
import { addTokenToMetaMask } from '@/hooks/global';

export const GovernanceScreen = (): JSX.Element => {
  const liveProposals = useAllLiveProposals();
  const [proposals] = useState<ProposalType[]>(liveProposals);
  const [selectedType, setSelectedType] = useState<number>(0);

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

  const handleWriteContract = async (amount: number) => {
    const params = [`${address}`, parseUnits(amount.toString(), 18)];

    console.log('wallet address is: ', `${address}`);
    try {
      const tx = await writeContractAsync({
        ...MockERC20Contract,
        functionName: 'mint',
        args: params,
      });
      toast.success('Faucet Sent!');
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

  const handleAddNetworkAndToken = async () => {
    try {
      await addTokenToMetaMask(); // Then add the token
      handleWriteContract(10);
      toast.success('BQ Token Added on Metamask!');
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
    <section className='flex h-full flex-auto flex-col'>
      <div className='container mx-auto flex flex-auto flex-col items-center gap-12 p-10 pt-12'>
        <div className='flex max-w-[755px] flex-col items-center justify-center gap-9 text-[50px] font-bold leading-[50px]'>
          <div className='text-center'>
            Become a Governance Member By Holding BQ Tokens
          </div>
          <div className='text-[22px] font-normal'>
            Vote for Claim proposal and earn BQ Tokens.
          </div>
          <div
            className='border-primary-200 relative flex h-[46px] w-[256px] cursor-pointer items-center justify-center rounded-lg border bg-[#0C0C0C] [box-shadow:0px_4px_9px_#00ECBC]'
            onClick={handleAddNetworkAndToken}
          >
            <div className='absolute inset-x-2 top-1'>
              <LightIcon />
            </div>
            <div className='text-primary-200 text-[15px] font-semibold'>
              {isConnected ? 'Claim Now' : 'Connect Wallet'}
            </div>
          </div>
          <div className='mt-10 h-[1px] w-[200px] bg-white/50'></div>
          <div className='flex w-full justify-between gap-[90px]'>
            <SwitchProposal
              selectedType={selectedType}
              onSelectProposalType={(index) => setSelectedType(index)}
            />
          </div>
        </div>
        <Proposals proposals={proposals} />
      </div>
    </section>
  );
};
