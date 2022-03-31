import React from 'react';

import { Log } from '../types';

export default function LogItem({ title, description, price, timestamp }: Log) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="w-full rounded-lg border border-white">
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-white">{title}</h2>
          <div className="text-white">{timestamp}</div>
        </div>
        <p className="text-3xl font-bold text-white">{formatter.format(price)}</p>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
}
