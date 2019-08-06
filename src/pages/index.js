import React from 'react';

export default function () {

  const list = [
    {
      allow_coupon: 0,
    },
    {
      allow_coupon: 0,
    }
  ]

  function getCoupon(data) {
    let isAllow = false;
    isAllow = data.length > 0 && data.some(x => x.allow_coupon == 1);
    return isAllow
  }

  console.log('7777',getCoupon(list))

  return (
    <div>
      首页
    </div>
  );
}
