export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

const API = 'https://d3u4v0d8n5zca2.cloudfront.net';

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts }

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}