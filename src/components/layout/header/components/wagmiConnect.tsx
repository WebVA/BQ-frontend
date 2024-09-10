import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import Button from '@/components/button/button';
import PlusIcon from '~/svg/plus.svg';

export const ConnectButton = (): JSX.Element => {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
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
          variant='primary'
          size='lg'
          className='rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
          // onClick={close}
          onClick={async () => handleDisconnect()}
        >
          {truncateAddress(address)}
        </Button>
      ) : (
        <Button
          variant='primary'
          className='rounded-sm bg-gradient-to-r from-[#00ECBC] to-[#005746]'
          size='lg'
          onClick={() => open()}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
