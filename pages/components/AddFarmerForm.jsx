import React, { useState, useCallback } from 'react';
import { useUserContext } from '../../common/Provider';
import { addNewFarmer } from '../../common/Provider/lib/helper';
import { useCollector } from './hooks/useCollector';

const AddFarmerForm = () => {
    const [farmerName, setFarmerName] = useState('');
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const { addFarmer } = useCollector({ user });

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={(e) => addFarmer(farmerName, e)}>
            {error && <p className="text-red-500">{error}</p>}

            <div className="input-type">
                <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} name="farmerName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Farmer Name" />
            </div>
            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add Farmer</button>

        </form>
    )
}

export default AddFarmerForm