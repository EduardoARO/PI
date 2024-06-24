document.addEventListener('DOMContentLoaded', (event) => {
    fetchUserInfo();
    fetchUserOrders();
});

async function fetchUserInfo() {
    try {
        const response = await fetch('/perfil/user-info');
        const data = await response.json();
        if (data.success) {
            document.getElementById('name').value = data.user.name;
            document.getElementById('email').value = data.user.email;
        } else {
            alert('Erro ao buscar informações do usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function fetchUserOrders() {
    try {
        const response = await fetch('/perfil/orders');
        const data = await response.json();
        if (data.success) {
            const ordersList = document.getElementById('orders-list');
            ordersList.innerHTML = '';

            data.orders.forEach(order => {
                const orderItem = document.createElement('li');
                orderItem.className = 'list-group-item';
                orderItem.textContent = `Pedido #${order._id} - ${order.createdAt} - Itens: ${order.itensDoCarrinho.map(item => `${item.name} (x${item.quantity})`).join(', ')}`;
                ordersList.appendChild(orderItem);
            });
        } else {
            alert('Erro ao buscar pedidos do usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function updateUserName(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    try {
        const response = await fetch('/perfil/update-user/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (data.success) {
            alert('Nome atualizado com sucesso.');
        } else {
            alert('Erro ao atualizar nome.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function updateUserEmail(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/perfil/update-user/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.success) {
            alert('Email atualizado com sucesso.');
        } else {
            alert('Erro ao atualizar email.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function updateUserPassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    try {
        const response = await fetch('/perfil/update-user/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });
        const data = await response.json();
        if (data.success) {
            alert('Senha atualizada com sucesso.');
        } else {
            alert('Erro ao atualizar senha.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}
