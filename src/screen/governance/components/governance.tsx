import React, { useState } from 'react';

import { useAllLiveProposals } from '@/hooks/contracts/governance/useAllLiveProposals';

import Button from '@/components/button/button';

import { Proposals } from '@/screen/governance/components/proposals';
import { SwitchProposal } from '@/screen/governance/components/SwitchProposal';

import { ProposalType } from '@/types/main';
import LightIcon from '~/svg/light.svg';

export const GovernanceScreen = (): JSX.Element => {
  const liveProposals = useAllLiveProposals();
  const [proposals] = useState<ProposalType[]>(liveProposals);
  const [selectedType, setSelectedType] = useState<number>(0);

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
          <div className='border-primary-200 relative flex h-[46px] w-[256px] items-center justify-center rounded-lg border bg-[#0C0C0C] [box-shadow:0px_4px_9px_#00ECBC]'>
            <div className='absolute inset-x-2 top-1'>
              <LightIcon />
            </div>
            <div className='text-primary-200 text-[15px] font-semibold'>
              Claim Now
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
