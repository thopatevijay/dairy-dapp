import React, { useState, useEffect, useCallback } from 'react';
import { BiUserPlus } from "react-icons/bi";
import MilkCollectForm from './MilkCollectForm';
import MilkCollectTable from './MilkCollectTable';

const AddMilkCollection = ({ milkCollections, getMilkDataError, farmers }) => {
    const [formVisible, setFormVisible] = useState(false)

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
            </div>
            {
                formVisible
                    ?
                    (
                        <div className="container mx-auto py-5">
                            <MilkCollectForm farmers={farmers}/>
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