// Imporação da biblioteca react
import React from 'react';
// Importação do componente OrderList do arquivo './components/OrderList'
import OrderList from './components/OrderList';

// Define o componente funcional App
function App() {
  // JSX para renderizar o componente
  return (
    <div className="App">
      {/* Cabeçalho da aplicação */}
      <header className="App-header">
        {/* OrderList dentro do abeçalho */}
        <OrderList />
      </header>
    </div>
  );
}

// Exporta o componente App como padrão
export default App;