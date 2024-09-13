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
  address: '0x4441C07784141F1819D3c8EFB0a85864df18f2F0',
};

export const ICoverContract: ContractType = {
  abi: ICoverABI,
  address: '0x7c1E14A8Ac8Cb9F78c124d5bdD0553491513478E',
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool,
  address: '0xE8eC558C224f0d4956C6614692eC2E65Db31319A',
};

export const MockERC20Contract: ContractType = {
  abi: MockERC20,
  address: '0xb650bedaAAf173366D59d8ef74f571aCAFA0a6f1',
};
