import React from 'react'
import { useRouter } from "next/router";
import ConsumerTimeLine from '../components/ConsumerTimeLine';

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;
  console.log(productId);
  return (
    <div className='flex justify-center mt-10'>
      <ConsumerTimeLine />
    </div>
  )
}

export default ProductDetails;
