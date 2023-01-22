import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../common/Provider';

const MilkCollectForm = () => {
    const [farmerId, setFarmerId] = useState('');
    const [milkQuantity, setMilkQuantity] = useState('');
    const [milkQuality, setMilkQuality] = useState('');
    const [error, setError] = useState('');
    const { user } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/milk-collector', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ milkCollectorId: user.id, farmerId, milkQuantity, milkQuality }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
        }
    };

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