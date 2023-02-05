import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ProductCodes = () => {
    const router = useRouter();
    const { batchId } = router.query;
    console.log(batchId)
  return (
    <div>ProductCodes</div>
  )
}

export default ProductCodes