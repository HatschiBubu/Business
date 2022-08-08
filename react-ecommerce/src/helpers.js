export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

const API = 'https://ghostnft.tech';

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts }

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : 'https://ddrtestswiss.tech',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
        },
    });

    return res.json();
}