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
  address: '0x41d4E0605002D4dbe450A42f8e89ae5Ed5f9bE7a',
};

export const ICoverContract: ContractType = {
  abi: ICoverABI,
  address: '0xd80f79bC4cf0AC7094b22aB1a3E4010cFeB78669',
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool,
  address: '0xC05F41e638A82c6eB6854624957227aAB992892C',
};

export const MockERC20Contract: ContractType = {
  abi: MockERC20,
  address: '0xb650bedaAAf173366D59d8ef74f571aCAFA0a6f1',
};
