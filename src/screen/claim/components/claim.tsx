import { writeContract } from '@wagmi/core';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

import { config } from '@/lib/config';
import { bnToNumber, numberToBN } from '@/lib/formulat';
import { useAllUserCovers } from '@/hooks/contracts/useAllUserCovers';
import { useProposalByCoverId } from '@/hooks/contracts/useProposalByCover';

import { Switch } from '@/components/switch';

import { GovContract } from '@/constant/contracts';
import { Covers } from '@/screen/claim/components/covers';
import { Requirement } from '@/screen/claim/components/requirement';
import { Status } from '@/screen/claim/components/status';

import { IProduct, IUserCover } from '@/types/main';
import Button from '@/components/button/button';

type ClaimScreenType = {
  coverId?: string | null;
};

export const ClaimScreen: React.FC<ClaimScreenType> = (props): JSX.Element => {
  const { coverId } = props;
  const { address } = useAccount();
  const router = useRouter();
  const [currentCover, setCurrentCover] = useState<IUserCover>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const currentCoverId = useMemo(() => {
    return currentCover?.coverId ? Number(currentCover?.coverId) : 0;
  }, [currentCover?.coverId]);

  const proposal = useProposalByCoverId(currentCoverId.toString());

  const userCovers = useAllUserCovers(address as string);

  const products = useMemo<IProduct[]>(() => {
    let foundMatch = false;

    const updatedProducts = userCovers.map((cover, index) => {
      let isSelected = false;
      if (Number(cover?.coverId).toString() === coverId) {
        isSelected = true;
        setCurrentCover(cover); // Set the matching cover
        foundMatch = true;
      }
      return {
        name: cover?.coverName || '',
        coverId: cover?.coverId ? Number(cover?.coverId) : '',
        isSelected: isSelected,
      };
    });

    // If no match was found, select the first item
    if (!foundMatch && updatedProducts.length > 0) {
      setCurrentCover(userCovers[0]);
      updatedProducts[0].isSelected = true;
    }

    return updatedProducts;
  }, [userCovers, coverId]);

  const [lossEventDate, setLossEventDate] = useState<Date | null>(new Date());
  const [claimValueStr, setClaimValueStr] = useState<string>('');
  const [slashingTx, setSlashingTx] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [isSlashing, setIsSlashing] = useState<boolean>(false);
  const maxClaimableNum = useMemo(() => {
    return parseFloat(bnToNumber(currentCover?.coverValue));
  }, [currentCover?.coverValue]);

  // useAllProposals();

  const error = useMemo(() => {
    // if (lossEventDate === '') return 'Input Loss Event Date'
    if (!address) return 'Connect Wallet';
    if (claimValueStr === '') return 'Input Claim Amount';
    if (isSlashing && slashingTx === '') return 'Enter Slashing Tx';
    if (parseFloat(claimValueStr) > maxClaimableNum)
      return 'Over Claimable Amount';
    // if (description === '') return ''
    return '';
  }, [address, lossEventDate, claimValueStr, slashingTx, description]);

  const handleSubmitClaim = async () => {
    setIsLoading(true);
    setStatus(0);
    const params = {
      user: address,
      riskType: 0, // riskType
      coverId: currentCover?.coverId,
      description: description,
      poolId: 1n, // poolId
      claimAmount: numberToBN(claimValueStr), // claimAmount
      // currentCover?.
    };

    try {
      await writeContract(config, {
        abi: GovContract.abi,
        address: GovContract.address as `0x${string}`,
        functionName: 'createProposal',
        args: [params],
      });

      setStatus(1);
      toast.success('Proposal submitted!');
    } catch (err) {
      let errorMsg = '';
      if (err instanceof Error) {
        if (err.message.includes('User denied transaction signature')) {
          errorMsg = 'User denied transaction signature';
        } else {
          errorMsg = 'Failed to submit proposal';
        }
      } else {
        errorMsg = 'Unexpected error';
      }

      setStatus(2);
      toast.error(errorMsg);
    }

    setIsLoading(false);
  };

  const handleSlashingTxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSlashingTx(event.target.value);
  };

  const handleClaimValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClaimValueStr(event.target.value);
  };

  const handleLossEventDateChange = (date: Date | null) => {
    setLossEventDate(date);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSwitchTab = (index: number) => {
    // console.log('product:', products[index])
    router.push(`/claim/?coverId=${products[index].coverId}`)
    setSelectedTab(index)
  }

  const handleClaimProposalFunds = () => {

  }

  if (products.length === 0) {
    return (
      <section className='flex h-full flex-auto flex-col'>
        <div className='mx-auto w-full max-w-[1000px] py-[54px]'>
          <div className='mt-[55px] text-center text-[50px] font-bold'>
            My Covers
          </div>
          <div className='mt-[14px] text-center text-[30px]'>
            No Active Cover
          </div>
          <div className="flex items-center justify-center gap-[20px] my-[54px]">
            <Button
              variant='gradient'
              className="min-w-[180px]"
              isLoading={isLoading}
              size='lg'
              onClick={() => handleSubmitClaim()}
              disabled={!!error}
            >
              Buy Covers
            </Button>
            <Button
              variant='outline'
              className="min-w-[180px]"
              isLoading={isLoading}
              size='lg'
              onClick={() => handleSubmitClaim()}
              disabled={!!error}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='flex h-full flex-auto flex-col'>
      <div className='mx-auto w-full max-w-[1000px] py-[54px]'>
        <div className='my-[55px] text-center text-[50px] font-bold'>
          My Covers
        </div>
        <Switch
          value={selectedTab}
          handleSwitch={handleSwitchTab}
          options={products.map((product) => product.name)}
        />

        <Requirement
          isLoading={isLoading}
          lossEventDate={lossEventDate}
          claimValueStr={claimValueStr}
          slashingTx={slashingTx}
          description={description}
          maxClaimable={maxClaimableNum}
          error={error}
          isSlashing={isSlashing}
          status={proposal?.status}
          setStatus={setStatus}
          handleLossEventDateChange={handleLossEventDateChange}
          handleClaimValueChange={handleClaimValueChange}
          handleSlashingTxChange={handleSlashingTxChange}
          handleDescriptionChange={handleDescriptionChange}
          handleSubmitClaim={handleSubmitClaim}
          handleClaimProposalFunds={handleClaimProposalFunds}
        />

        <Status status={proposal?.status} />

        <div className='hidden'>
          <Covers products={products} />
        </div>
      </div>
    </section>
  );
};
