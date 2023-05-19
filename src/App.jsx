import Crypto from './components/Crypto.jsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="https://static.coingecko.com/s/coingecko-branding-guide-8447de673439420efa0ab1e0e03a1f8b0137270fbc9c0b7c086ee284bd417fa1.png" alt="logo" width="200" height="55" />
      </div>
      <Crypto />
    </div>
  )
}

export default App
