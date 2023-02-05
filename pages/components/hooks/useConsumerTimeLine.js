import { useState, useCallback, useEffect } from 'react';
import { useProcessor } from './useProcessor';

export function useConsumerTimeLine({ productId }) {
    const [searchResults, setSearchResults] = useState([]);
    const { batchesByProcessor } = useProcessor();

    const getDataByProductId = useCallback(async () => {
        if (batchesByProcessor.length) {
            try {
                const productData = batchesByProcessor.filter((batch) => {
                    return batch.productIdList.includes(Number(productId));
                });
                setSearchResults(...productData);
            } catch (error) {

            }
        }
    }, [batchesByProcessor, productId]);



    useEffect(() => {
        getDataByProductId();

    }, [getDataByProductId]);

    return { searchResults }
}