import { useEffect, useMemo, useState } from 'react'
import './App.css'
import OrderList, { Order } from './components/OrderList'
import OrderFilter from './components/OrderFilter'
import OrderStats from './components/OrderStats'
import NewOrderForm from './components/NewOrderForm'

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

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem('orders')
      if (!raw) return initialOrders
      const parsed = JSON.parse(raw)
      return parsed.map((o: Order) => ({ ...o, date: new Date(o.date) }))
    } catch (e) {
      return initialOrders
    }
  })

  const [filter, setFilter] = useState<Order['status'] | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)

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
      return [
        ...prev,
        {
          id: nextId,
          ...orderData,
        },
      ]
    })
  }

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    // Bloquear scroll del fondo cuando está abierto el panel
    if (isFormOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFormOpen])

  return (
    <div className="dashboard">
      <h1>Gestión de Pedidos</h1>
      <div className="top-bar">
        <OrderFilter filter={filter} onChange={setFilter} />
        <OrderStats {...stats} />
      </div>

      {/* Botón móvil */}
      <button
        className="mobile-add-button"
        onClick={() => setIsFormOpen(true)}
        disabled={isFormOpen}
      >
        Nuevo pedido
      </button>

      <div className="layout">
        <div className="column left">
          <OrderList orders={filteredOrders} />
        </div>
        <div className="column right mobile-hidden">
          {!isFormOpen && <NewOrderForm onAdd={handleAddOrder} />}
        </div>
      </div>

      {isFormOpen && (
        <div className="sheet-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <h3>Nuevo Pedido</h3>
              <button className="close" onClick={() => setIsFormOpen(false)}>
                Cerrar
              </button>
            </div>
            <div className="sheet-content">
              <NewOrderForm
                onAdd={(data) => {
                  handleAddOrder(data)
                  setIsFormOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
