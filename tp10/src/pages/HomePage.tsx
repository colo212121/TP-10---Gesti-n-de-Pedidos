import React from 'react'
import OrderList, { Order } from '../components/OrderList'
import OrderFilter from '../components/OrderFilter'
import OrderStats from '../components/OrderStats'

interface HomePageProps {
  orders: Order[]
  filter: Order['status'] | undefined
  setFilter: (status: Order['status'] | undefined) => void
  stats: { total: number; pending: number; shipped: number; delivered: number }
}

const HomePage: React.FC<HomePageProps> = ({ orders, filter, setFilter, stats }) => {
  return (
    <div className="page home-page">
      <h1>Gestión de Pedidos</h1>
      <div className="top-bar">
        <OrderFilter filter={filter} onChange={setFilter} />
        <OrderStats {...stats} />
      </div>
      <OrderList orders={orders} />
    </div>
  )
}

export default HomePage
