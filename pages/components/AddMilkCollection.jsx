import React, { useState } from 'react';
import { BiUserPlus } from "react-icons/bi";
import MilkCollectForm from './MilkCollectForm';
import MilkCollectTable from './MilkCollectTable';
import { useUserContext } from '../../common/Provider';
import { useCollector } from './hooks/useCollector';

const AddMilkCollection = ({ milkCollections, getMilkDataError, farmers, milkCollectorId }) => {
    const [formVisible, setFormVisible] = useState(false)
    const { user } = useUserContext();
    const { createMilkCollectorBatch } = useCollector({ user });

    const handleToggleForm = () => {
        setFormVisible(!formVisible);
    }

    return (
        <div>
            <div className="container mx-auto flex justify-between py-5 border-b">
                <div className="left flex gap-3" onClick={handleToggleForm}>
                    <button className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
                        Collect Milk <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                    </button>
                </div>
                {milkCollections.length ?
                    <div className="left flex gap-3" onClick={(e) => createMilkCollectorBatch(e)}>
                        <button className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
                            Create Batch <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                        </button>
                    </div>
                    : null}
            </div>
            {
                formVisible
                    ?
                    (
                        <div className="container mx-auto py-5">
                            <MilkCollectForm farmers={farmers} />
                        </div>
                    )
                    : null
            }
            <div className="container mx-auto">
                <MilkCollectTable milkCollections={milkCollections} getMilkDataError={getMilkDataError} />
            </div>
        </div>
    )
}

export default AddMilkCollection