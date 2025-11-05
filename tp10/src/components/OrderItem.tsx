import React from 'react'

const statusValues = ['pending', 'shipped', 'delivered'] as const
type Status = typeof statusValues[number]

type OrderItemProduct = {
	productId: number
	name: string
	quantity: number
	price: number
}

type OrderItemProps = {
	id: number
	customer: string
	items: OrderItemProduct[]
	status?: Status
	date?: Date
}

const OrderItem: React.FC<OrderItemProps> = ({
	id,
	customer,
	items,
	status = 'pending',
	date = new Date(),
}) => {
	const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

	return (
		<div className="order-item">
			<div className="order-header">
				<div>
					<strong>Pedido #{id}</strong>
					<div>Cliente: {customer}</div>
				</div>
				<div className={`status ${status}`}>{status}</div>
			</div>

			<div className="order-meta">
				<div>Fecha: {date.toLocaleDateString()}</div>
				<div>Total: ${total.toFixed(2)}</div>
			</div>

			<ul className="order-items">
				{items.map((item) => (
					<li key={item.productId} className="order-product">
						<span className="name">{item.name}</span>
						<span className="qty">x{item.quantity}</span>
						<span className="price">
							${(item.price * item.quantity).toFixed(2)}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default OrderItem
