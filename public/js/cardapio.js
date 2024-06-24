function adicionarAoCarrinho(itemName) {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl)
  })
  fetch('/adicionar-carrinho', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemName })
  }).then(response => {
    if (response.ok) {
      console.log('Item adicionado ao carrinho!');
      toastList.forEach(toast => toast.show())
    } else {
      console.log('Erro ao adicionar item ao carrinho.');
    }
  }).catch(error => {
    console.error(error);
    console.log('Erro ao adicionar item ao carrinho.');
  });
}