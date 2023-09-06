import './App.css';
import Root from './Components/RootComponent/RootComponent';
import PageContextProvider from './Contexts/PageContext';

function App() {
  return (
    <PageContextProvider>
      <Root/>
    </PageContextProvider>
  )
}

export default App
