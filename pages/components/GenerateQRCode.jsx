import React from 'react';
import QRCode from 'qrcode.react';

const GenerateQRCode = ({ productCodeList }) => {

  return (
    <div className="flex flex-wrap">
      {productCodeList && productCodeList.map(productId => (
        <div key={productId} className="w-1/8 text-center m-6">
          <p className="text-xs font-bold m-2">Product ID: {productId}</p>
          <QRCode value={`http://localhost:3000/ProductId/${productId}`} />
        </div>
      ))}
    </div>
  );
};

export default GenerateQRCode;
