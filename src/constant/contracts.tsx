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
  address: '0xD81b8c78a1AEA062FE34D62Bf41e256e8F2AaF53',
};

export const ICoverContract: ContractType = {
  abi: ICoverABI,
  address: '0x1591470D84D74553383Fdc70aBF2D168724E9976',
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool,
  address: '0xf3e93e7d3f0E6494563B1533C5f668A461a7457a',
};

export const MockERC20Contract: ContractType = {
  abi: MockERC20,
  address: '0xb650bedaAAf173366D59d8ef74f571aCAFA0a6f1',
};
