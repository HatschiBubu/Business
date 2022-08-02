export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

const API = 'http://ec2-3-73-74-49.eu-central-1.compute.amazonaws.com:8080';

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