import React from 'react'
import { useRouter } from "next/router";

const ProductDetails = () => {
    const router = useRouter();
    const { productId, batchId } = router.query;
    console.log(productId)
    console.log(batchId);
  return (
    <div>[ProductDetails]</div>
  )
}

export default ProductDetails;