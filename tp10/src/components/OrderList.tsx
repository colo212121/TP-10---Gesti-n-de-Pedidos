import React from 'react'
import OrderItem from './OrderItem'

const statusValues = ['pending', 'shipped', 'delivered'] as const
type Status = typeof statusValues[number]

type OrderItemProduct = {
	productId: number
	name: string
	quantity: number
	price: number
}

export type Order = {
	id: number
	customer: string
	items: OrderItemProduct[]
	status?: Status
	date?: Date
}

type OrderListProps = {
	orders: Order[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
	if (!orders || orders.length === 0) {
		return <div className="empty">No hay pedidos para mostrar.</div>
	}

	return (
		<div className="order-list">
			{orders.map((order) => (
				<OrderItem key={order.id} {...order} />
			))}
		</div>
	)
}

export default OrderList
