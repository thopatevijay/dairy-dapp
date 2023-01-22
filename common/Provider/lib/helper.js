
export const getFarmers = async () => {
    const response = await fetch('http://localhost:3000/api/farmer');
    const data = await response.json();
    return data
}

export const getCollctedMilk = async () => {
    const response = await fetch('http://localhost:3000/api/milk-collector');
    const data = await response.json();
    return data
}

export const submitMilkData = async ({ milkCollectorId, farmerId, milkQuantity, milkQuality }) => {
    const response = await fetch('http://localhost:3000/api/milk-collector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milkCollectorId, farmerId, milkQuantity, milkQuality }),
    });
    return response
}