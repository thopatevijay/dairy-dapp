import React, { useState, useCallback } from 'react';
import { useUserContext } from '../../common/Provider';
import { submitMilkData } from '../../common/Provider/lib/helper';

const MilkCollectForm = () => {
    const [farmerId, setFarmerId] = useState('');
    const [milkQuantity, setMilkQuantity] = useState('');
    const [milkQuality, setMilkQuality] = useState('');
    const [error, setError] = useState('');
    const { user } = useUserContext();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await submitMilkData({ milkCollectorId: user.id, farmerId, milkQuantity, milkQuality });
            if (response.ok) {
                console.log('milk data submittted');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
        }
    },[farmerId, milkQuality, milkQuantity, user.id]);

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}

            <div className="input-type">
                <input type="text" value={farmerId} onChange={(e) => setFarmerId(e.target.value)} name="farmerID" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Farmer ID" />
            </div>
            <div className="input-type">
                <input type="text" value={milkQuantity} onChange={(e) => setMilkQuantity(e.target.value)} name="milkQuantity" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Milk Quantity" />
            </div>
            <div className="input-type">
                <input type="text" value={milkQuality} onChange={(e) => setMilkQuality(e.target.value)} name="milkQuality" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Milk Quality" />
            </div>
            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Collect Milk</button>

        </form>
    )
}

export default MilkCollectForm