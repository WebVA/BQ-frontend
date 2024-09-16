import { useEffect, useState } from 'react';
import { GovContract } from "@/constant/contracts";
import { useBlockNumber, useReadContract } from 'wagmi';
import { ICover, ProposalType } from "@/types/main";

export const useProposalByCoverId = (address: string, coverId?: string) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: proposals, refetch } = useReadContract({
    abi: GovContract.abi,
    address: GovContract.address as `0x${string}`,
    functionName: 'getAllProposals',
    args: [], // Modify this if your contract function requires arguments
  });

  const [filteredProposals, setFilteredProposals] = useState<ProposalType | undefined>(undefined);

  useEffect(() => {
    if (proposals) {
      const result = proposals as ProposalType[];
      if (coverId) {
        const filtered = result.find(proposal => {
          return (Number(proposal.proposalParam.coverId).toString() === coverId) && (proposal.proposalParam.user === address);
        });
        setFilteredProposals(filtered);
      } else {
        // If coverId is undefined, return all proposals
        setFilteredProposals(undefined);
      }
    }
  }, [proposals, coverId]);

  useEffect(() => {
    if (blockNumber) {
      refetch();
    }
  }, [blockNumber]); // Only refetch when blockNumber changes

  return filteredProposals;
};