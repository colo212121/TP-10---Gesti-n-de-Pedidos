import PropTypes from 'prop-types'
import OrderItem from './OrderItem'

function OrderList({ orders }) {
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

OrderList.propTypes = {
	orders: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default OrderList


