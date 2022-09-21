import ApiContextProvider from 'context/ApiContext';
import BasketContextProvider from 'context/BasketContext';
import Routers from 'routes/Routers';

const App = () => {
  return (
    <ApiContextProvider>
      <BasketContextProvider>
        <Routers />
      </BasketContextProvider>
    </ApiContextProvider>
  );
};

export default App;
