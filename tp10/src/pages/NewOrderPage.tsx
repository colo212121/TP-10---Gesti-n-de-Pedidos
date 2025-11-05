import React from 'react'
import { useNavigate } from 'react-router-dom'
import NewOrderForm from '../components/NewOrderForm'
import { Order } from '../components/OrderList'

interface NewOrderPageProps {
  onAddOrder: (orderData: Omit<Order, 'id'>) => void
}

const NewOrderPage: React.FC<NewOrderPageProps> = ({ onAddOrder }) => {
  const navigate = useNavigate()

  const handleAddOrder = (orderData: Omit<Order, 'id'>) => {
    onAddOrder(orderData)
    navigate('/') // 🔹 Redirige al home después de agregar
  }

  return (
    <div className="page new-order-page">
      <h1>Nuevo Pedido</h1>
      <NewOrderForm onAdd={handleAddOrder} />
    </div>
  )
}

export default NewOrderPage
