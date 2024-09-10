import clsx from 'clsx';
import React, { Dispatch } from 'react';

type Props = {
  options: string[];
  value?: number;
  setValue?: Dispatch<number>;
};

export const Switch = ({ options, value = 0, setValue }: Props) => {
  return (
    <div className='flex w-full cursor-pointer items-center rounded-lg bg-[#1B1B1B] p-1'>
      <div className='relative flex w-full cursor-pointer flex-col items-center rounded-lg md:flex-row md:gap-0'>
        {options.map((opt, index) => (
          <div
            key={index}
            className={clsx(
              'z-10 w-full py-2 text-center text-[21px] capitalize text-[#7F7F7F] transition-all',
              value === index && 'tracking-[0.01em] text-white'
            )}
            onClick={() => setValue && setValue(index)}
          >
            {opt}
          </div>
        ))}
        <div
          className={clsx(
            'absolute inset-y-0 hidden rounded-lg bg-white text-[#1B1B1B] transition-all md:block'
          )}
          style={{
            width: `${100 / options.length}%`,
            transform: `translateX(${value * 100}%)`,
          }}
        />
        <div
          className={clsx(
            'absolute inset-x-0 rounded-lg bg-white text-[#1B1B1B] transition-all md:hidden'
          )}
          style={{
            height: `${100 / options.length}%`,
            transform: `translateY(${value * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};
