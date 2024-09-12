import clsx from 'clsx';
import React, { Dispatch } from 'react';

type Props = {
  options: string[];
  value?: number;
  setValue?: Dispatch<number>;
};

export const Switch = ({ options, value = 0, setValue }: Props) => {
  return (
    <div className='bg-background-300 flex w-full cursor-pointer items-center rounded-[10px] p-1'>
      <div className='relative flex w-full cursor-pointer flex-col items-center rounded-lg md:flex-row md:gap-0'>
        {options.map((opt, index) => (
          <div
            key={index}
            className={clsx(
              'z-10 w-full py-3 text-center text-base capitalize transition-all',
              value === index ? 'text-background-400' : 'text-background-500 '
            )}
            onClick={() => setValue && setValue(index)}
          >
            {opt}
          </div>
        ))}
        <div
          className={clsx(
            'absolute inset-y-0 hidden rounded-lg bg-white transition-all md:block'
          )}
          style={{
            width: `${100 / options.length}%`,
            transform: `translateX(${value * 100}%)`,
          }}
        />
        <div
          className={clsx(
            'absolute inset-x-0 rounded-lg bg-white transition-all md:hidden'
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
