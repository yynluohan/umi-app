import React from 'react';

export default function () {

  const arr = [1,2,5,1,2,4,5,2,3];
  console.log('111',[...new Set(arr)],Array.isArray([...new Set(arr)]))

  return (
    <div>
      <span>index1</span>
    </div>
  );
}
