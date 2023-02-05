import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { contractInstance } from "../../utils/ethers";

export function useProductId() {
    const [data, setData] = useState([]);
    const [productCount, setProductCount] = useState(null);
    const [productData, setProductData] = useState([]);

    const getProductCount = useCallback(async () => {
        try {
            const productCount = await contractInstance.productCount();
            setProductCount(productCount.toNumber());
        } catch (error) {

        }
    }, [setProductCount]);

    const getProductDetails = useCallback(async () => {
        try {
            let products = [];

            for (let i = 1; i <= productCount; i++) {
                const product = await contractInstance.products(i);
                products.push(product);
            }
            const productData = products.map(product => {
                return {
                    productId: product[0].toNumber(),
                    batchId: product[1].toString()
                };
            });
            setProductData(productData);
        } catch (error) {
            console.log(error);
        }
    }, [productCount, setProductData]);


    useEffect(() => {
        getProductDetails();
        getProductCount();

        contractInstance.on("StartProductionEvent", () => {
            getProductDetails();
            getProductCount();
        });

    }, [getProductCount, getProductDetails]);

    return { data, productCount, productData }
}