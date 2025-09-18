import PropTypes from 'prop-types'

function OrderStats({ total, pending, shipped, delivered }) {
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

OrderStats.propTypes = {
	total: PropTypes.number.isRequired,
	pending: PropTypes.number.isRequired,
	shipped: PropTypes.number.isRequired,
	delivered: PropTypes.number.isRequired,
}

export default OrderStats


