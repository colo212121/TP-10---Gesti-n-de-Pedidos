import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NewOrderPage from './pages/NewOrderPage'
import StatsPage from './pages/StatsPage'
import { Order } from './components/OrderList'

// Si tu app se sirve desde una subcarpeta (como en tu caso),
// Vite expone import.meta.env.BASE_URL automáticamente.
const basename = import.meta.env.BASE_URL || '/'

const initialOrders: Order[] = [
  {
    id: 1,
    customer: 'Ana López',
    items: [
      { productId: 101, name: 'Mouse', quantity: 2, price: 15.5 },
      { productId: 102, name: 'Teclado', quantity: 1, price: 30 },
    ],
    status: 'pending',
    date: new Date('2025-09-10'),
  },
  {
    id: 2,
    customer: 'Bruno Díaz',
    items: [{ productId: 103, name: 'Monitor', quantity: 1, price: 199.99 }],
    status: 'shipped',
    date: new Date('2025-09-11'),
  },
  {
    id: 3,
    customer: 'Carla Gómez',
    items: [
      { productId: 104, name: 'Webcam', quantity: 1, price: 45 },
      { productId: 105, name: 'Auriculares', quantity: 1, price: 25 },
    ],
    status: 'delivered',
    date: new Date('2025-09-12'),
  },
]

const AppContent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem('orders')
      if (!raw) return initialOrders
      const parsed = JSON.parse(raw)
      return parsed.map((o: Order) => ({ ...o, date: new Date(o.date) }))
    } catch {
      return initialOrders
    }
  })

  const [filter, setFilter] = useState<Order['status'] | undefined>()
  const location = useLocation()

  const filteredOrders = useMemo(() => {
    if (!filter) return orders
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter((o) => o.status === 'pending').length
    const shipped = orders.filter((o) => o.status === 'shipped').length
    const delivered = orders.filter((o) => o.status === 'delivered').length
    return { total, pending, shipped, delivered }
  }, [orders])

  function handleAddOrder(orderData: Omit<Order, 'id'>) {
    setOrders((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((o) => o.id)) + 1 : 1
      return [...prev, { id: nextId, ...orderData }]
    })
  }

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  return (
    <>
      <nav className="navbar">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/nuevo" className={location.pathname === '/nuevo' ? 'active' : ''}>Nuevo Pedido</Link>
        <Link to="/estadisticas" className={location.pathname === '/estadisticas' ? 'active' : ''}>Estadísticas</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<HomePage orders={filteredOrders} filter={filter} setFilter={setFilter} stats={stats} />}
        />
        <Route path="/nuevo" element={<NewOrderPage onAddOrder={handleAddOrder} />} />
        <Route path="/estadisticas" element={<StatsPage stats={stats} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

const App: React.FC = () => {
  return (
    <Router basename={basename}>
      <AppContent />
    </Router>
  )
}

export default App
