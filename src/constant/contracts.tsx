import { JsonFragment } from '@ethersproject/abi';
import Gov from './abis/Gov.json';
import ICoverABI from './abis/InsuranceCover.json';
import InsurancePool from './abis/InsurancePool.json';
import MockERC20 from './abis/MockERC20.json';

export type ContractType = {
  abi: JsonFragment[];
  address: `0x${string}`;
};

export const GovContract: ContractType = {
  abi: Gov,
  address: '0xb4E79F23069D85487F293Ec6AC36701A2695F918',

};

export const ICoverContract: ContractType = {
  abi: ICoverABI,
  address: '0x9c2a32dEc3252cEa8a9c0df19a3f5d4A4F0468d9',
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool,
  address: '0x90bADcB1e1F87088F564459Bb196a0E9af148e9B',
};

export const MockERC20Contract: ContractType = {
  abi: MockERC20,
  address: '0xb650bedaAAf173366D59d8ef74f571aCAFA0a6f1',
};
