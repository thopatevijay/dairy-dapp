import React from 'react'
import { useRouter } from "next/router";

const ProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;
    console.log(productId);
  return (
    <div>[ProductDetails]</div>
  )
}

export default ProductDetails;