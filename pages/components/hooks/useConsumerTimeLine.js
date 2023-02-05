import { useState, useCallback, useEffect } from 'react';
import { useProcessor } from './useProcessor';

export function useConsumerTimeLine({ productId }) {
    const [searchResults, setSearchResults] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const { batchesByProcessor } = useProcessor();

    const getDataByProductId = useCallback(async () => {
        setShowSpinner(true);
        if (batchesByProcessor.length) {
            try {
                const productData = batchesByProcessor.filter((batch) => {
                    return batch.productIdList.includes(Number(productId));
                });
                setSearchResults(...productData);
                setShowSpinner(false);
            } catch (error) {
                setShowSpinner(false);
                console.log(error);
            }
        }
    }, [batchesByProcessor, productId, setShowSpinner]);



    useEffect(() => {
        getDataByProductId();

    }, [getDataByProductId]);

    return { searchResults, showSpinner }
}