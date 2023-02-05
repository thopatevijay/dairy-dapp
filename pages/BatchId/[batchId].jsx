import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProcessor } from '../components/hooks/useProcessor';
import GenerateQRCode from '../components/GenerateQRCode';
import Spinner from '../components/Spinner';

const ProductCodes = () => {
  const [productCodeList, setProductCodeList] = useState([]);
  const router = useRouter();
  const { batchId } = router.query;
  const { batchesByProcessor } = useProcessor();

  const getProductIdByBatch = useCallback(
    async () => {
      if (batchesByProcessor.length) {
        const productIds = batchesByProcessor.find((e) =>
          e.batchId === batchId)?.productIdList;
        setProductCodeList(productIds)
      }
    },
    [batchId, batchesByProcessor, setProductCodeList],
  )

  useEffect(() => {
    getProductIdByBatch();

  }, [getProductIdByBatch])


  return (
    <div>
      {batchesByProcessor.length ?
        <GenerateQRCode productCodeList={productCodeList} />
        : <Spinner />
      }
    </div>
  )
}

export default ProductCodes