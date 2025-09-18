import PropTypes from 'prop-types'

const statusValues = ['pending', 'shipped', 'delivered']

function OrderFilter({ filter, onChange }) {
	return (
		<div className="order-filter">
			<label>
				Estado:
				<select value={filter ?? ''} onChange={(e) => onChange(e.target.value || undefined)}>
					<option value="">Todos</option>
					{statusValues.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}

OrderFilter.propTypes = {
	filter: PropTypes.oneOf([undefined, ...statusValues]),
	onChange: PropTypes.func.isRequired,
}

export default OrderFilter


