import { useEffect } from 'react';
import { useBlockNumber, useReadContract } from 'wagmi';
import { InsurancePoolContract } from '@/constant/contracts';
import { InsurancePoolType } from '@/types/main';

export const useGetUserDeposit = (poolId: number, address: string) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: insurancePools, refetch } = useReadContract({
    abi: InsurancePoolContract.abi,
    address: InsurancePoolContract.address as `0x${string}`,
    functionName: 'getUserDeposit',
    args: [poolId, address],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  //   console.log("insurancePools", insurancePools);
  if (!insurancePools) return [];

  try {
    const result = insurancePools as InsurancePoolType[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
