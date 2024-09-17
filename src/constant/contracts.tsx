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
  address: '0x5177d1B36e50FE447dD3Ff31f19F8658d97FfE36',
};

export const ICoverContract: ContractType = {
  abi: ICoverABI,
  address: '0x54FAE39a2d001e0D3937140Aec9126DEF05c3dc4',
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool,
  address: '0x218da747d607E2aca261CC2BeBEEb8FBfb32F3D9',
};

export const MockERC20Contract: ContractType = {
  abi: MockERC20,
  address: '0xb650bedaAAf173366D59d8ef74f571aCAFA0a6f1',
};
