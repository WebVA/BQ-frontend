import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import Button from '@/components/button/button';

import PlusIcon from '~/svg/plus.svg';

export const ConnectButton = (): JSX.Element => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error disconnecting:', error);
    }
  };

  // Function to truncate Ethereum address
  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <div>
      {isConnected && address ? (
        <Button
          variant='gradient'
          size='lg'
          onClick={async () => handleDisconnect()}
        >
          {truncateAddress(address)}
        </Button>
      ) : (
        <Button
          variant='gradient'
          leftIcon={<PlusIcon />}
          classNames={{
            leftIcon:
              'w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center',
          }}
          size='lg'
          onClick={() => open()}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
