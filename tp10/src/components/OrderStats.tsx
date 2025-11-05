import React from 'react'

type OrderStatsProps = {
	total: number
	pending: number
	shipped: number
	delivered: number
}

const OrderStats: React.FC<OrderStatsProps> = ({
	total,
	pending,
	shipped,
	delivered,
}) => {
	return (
		<div className="order-stats">
			<div className="stat">
				<span className="label">Total</span>
				<span className="value">{total}</span>
			</div>
			<div className="stat">
				<span className="label">Pending</span>
				<span className="value">{pending}</span>
			</div>
			<div className="stat">
				<span className="label">Shipped</span>
				<span className="value">{shipped}</span>
			</div>
			<div className="stat">
				<span className="label">Delivered</span>
				<span className="value">{delivered}</span>
			</div>
		</div>
	)
}

export default OrderStats
