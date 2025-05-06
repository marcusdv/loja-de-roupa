import { useState } from 'react';

export default function Loja() {
  const [produtos] = useState([
    { id: 1, nome: 'Camiseta', preco: 49.90 },
    { id: 2, nome: 'Calça Jeans', preco: 99.90 },
    { id: 3, nome: 'Tênis', preco: 199.90 },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Loja Simples</h1>
      
      <h2>Produtos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {produtos.map(produto => (
          <div key={produto.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <h2>Carrinho ({carrinho.length})</h2>
      <ul>
        {carrinho.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.nome} - R$ {item.preco.toFixed(2)}
            <button 
              onClick={() => removerDoCarrinho(item.id)}
              style={{ marginLeft: '10px' }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
}