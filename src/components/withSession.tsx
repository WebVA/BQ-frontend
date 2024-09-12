'use client';

import React, { useEffect, useState } from 'react';

import { Code } from './code';

const WithSession = (Component: any) => {
  return function WithSessionComponent({ ...props }) {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    useEffect(() => {
      const code = localStorage.getItem('bq-code');
      setIsConfirmed(code === 'true');
    }, []);

    if (!isConfirmed) return <Code />;
    return <Component {...props} />;
  };
};

export default WithSession;
