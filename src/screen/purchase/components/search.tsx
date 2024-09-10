import React, { useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input';

import { filters } from '@/screen/purchase/constants';

import FilterIcon from '~/svg/filter.svg';
import SearchIcon from '~/svg/search.svg';
import { RiskType } from '@/types/main';

type SearchType = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  filterCategory: RiskType | undefined;
  setFilterCategory: (value: RiskType | undefined) => void;
};

export const Search: React.FC<SearchType> = ({
  filterCategory,
  setFilterCategory,
  searchKeyword,
  setSearchKeyword,
}): JSX.Element => {
  return (
    <div className='flex w-full flex-col gap-6'>
      <Input
        className='rounded-sm bg-black pl-6'
        leftIcon={<SearchIcon className='h-5 w-5' />}
        // rightIcon={
        //   <Button className='w-full ' size='xs'>
        //     <FilterIcon className='h-7 w-6' />
        //   </Button>
        // }
        placeholder='Search Covers'
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
      <div className='grid w-full grid-cols-5 gap-x-5 bg-[#1E1E1E] p-1 text-center'>
        {filters.map((filter, index) => (
          <Button
            key={index}
            variant={filterCategory === filter.index ? 'default' : 'outline'}
            size='lg'
            className='w-full rounded-sm border-none p-4 capitalize'
            onClick={() => setFilterCategory(filter.index)}
          >
            {filter.riskType}
          </Button>
        ))}
      </div>
    </div>
  );
};
