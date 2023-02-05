import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { contractInstance } from "../../utils/ethers";

export function useProductId() {
    const [data, setData] = useState([]);
    const [productCount, setProductCount] = useState(null);

    const getProductCount = useCallback(async() => {
        const productCount = await contractInstance.productCount();
        setProductCount(productCount.toNumber());
    },[setProductCount]);

    const getProductDetails = useCallback(async () => {
        try {
            const productCount = await contractInstance.productCount();

            let products = [];

            for (let i = 1; i < productCount; i++) {
                const product = await contractInstance.products(i);
                products.push(product);
            }
            const productData = products.map(product => {
                return {
                    productId: product[0].toString(),
                    batchId: product[1].toString()
                };
            });
            console.log(productData);
        } catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getProductDetails();
        getProductCount();

        contractInstance.on("StartProductionEvent", () => getProductDetails());

    }, [getProductCount, getProductDetails]);

    return {
        data,
        productCount
    }
}