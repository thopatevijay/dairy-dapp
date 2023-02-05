import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useProductId } from './components/hooks/useProductId';

const ProductIdQR = () => {
  const { data } = useProductId();
  console.log(data)
  const qrCodes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex flex-wrap">
      {/* {qrCodes.map(code => (
        <div key={code} className="w-1/8 text-center m-6">
          <p className="text-xs font-bold m-2">Product ID: {code}</p>
          <QRCode value={`http://localhost:3000/product/${code}`} />
        </div>
      ))} */}
    </div>
  );
};

export default ProductIdQR;
