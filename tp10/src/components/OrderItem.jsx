import PropTypes from 'prop-types'

function OrderItem({ id, customer, items, status = 'pending', date = new Date() }) {
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
						<span className="price">${(item.price * item.quantity).toFixed(2)}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

const statusValues = ['pending', 'shipped', 'delivered']

OrderItem.propTypes = {
	id: PropTypes.number.isRequired,
	customer: (props, propName, componentName) => {
		const value = props[propName]
		if (typeof value !== 'string') return new Error(`${componentName}: '${propName}' debe ser string`)
		if (value.trim().length < 3) return new Error(`${componentName}: '${propName}' debe tener al menos 3 caracteres`)
		return null
	},
	items: PropTypes.arrayOf(
		PropTypes.exact({
			productId: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			quantity: (props, propName, componentName) => {
				const value = props[propName]
				if (typeof value !== 'number' || Number.isNaN(value)) return new Error(`${componentName}: 'quantity' debe ser number`)
				if (value <= 0) return new Error(`${componentName}: 'quantity' debe ser > 0`)
				return null
			},
			price: PropTypes.number.isRequired,
		})
	).isRequired,
	status: PropTypes.oneOf(statusValues),
	date: PropTypes.instanceOf(Date),
}

OrderItem.defaultProps = {
	status: 'pending',
	date: new Date(),
}

export default OrderItem


