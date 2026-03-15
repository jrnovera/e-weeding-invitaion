import { Routes, Route } from 'react-router-dom'
import EnvelopePage from './pages/EnvelopePage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnvelopePage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
