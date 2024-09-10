import React, { useState } from 'react';

import { useAllLiveProposals } from '@/hooks/contracts/governance/useAllLiveProposals';

import { Proposals } from '@/screen/governance/components/proposals';
import { VotingPower } from '@/screen/governance/components/votingPower';

import { ProposalType } from '@/types/main';

export const GovernanceScreen = (): JSX.Element => {
  const liveProposals = useAllLiveProposals();
  const [proposals] = useState<ProposalType[]>(liveProposals);
  const [selectedType, setSelectedType] = useState<number>(0);

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='container mx-auto flex flex-auto flex-col items-center gap-12 p-10 pt-12'>
        <div className='flex flex-col items-center text-[50px] font-bold leading-[50px]'>
          <div>Become a Governance Member By Holding BQ Tokens</div>
          <div className='text-[22px] font-normal'>
            Vote for Claim proposal and earn BQ Tokens.
          </div>
        </div>
        <div className='flex w-full justify-between gap-[90px]'>
          <VotingPower
            selectedType={selectedType}
            onSelectProposalType={(index) => setSelectedType(index)}
          />
        </div>
        <Proposals proposals={proposals} />
      </div>
    </section>
  );
};
