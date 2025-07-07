// Define a estrutura de um item individual no carrinho
export interface CartItem {
    id: string;        // Identificador único do produto
    name: string;      // Nome do produto
    price: number;     // Preço unitário
    quantity: number;  // Quantidade no carrinho
    image?: string;    // URL da imagem (opcional)
  }
  
  // Define a estrutura completa do carrinho
  export interface Cart {
    items: CartItem[]; // Lista de itens no carrinho
    total: number;     // Valor total da compra
  }
  
  // Define as funções e estado disponíveis no contexto do carrinho
  export interface CartContextType {
    cart: Cart;                                    // Estado atual do carrinho
    addItem: (item: CartItem) => void;            // Função para adicionar item
    removeItem: (itemId: string) => void;         // Função para remover item
    updateQuantity: (itemId: string, quantity: number) => void;  // Função para atualizar quantidade
    clearCart: () => void;                        // Função para limpar carrinho
  }