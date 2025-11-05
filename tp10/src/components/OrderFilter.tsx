import React from 'react'

const statusValues = ['pending', 'shipped', 'delivered'] as const
type Status = typeof statusValues[number]

type OrderFilterProps = {
	filter?: Status
	onChange: (value?: Status) => void
}

const OrderFilter: React.FC<OrderFilterProps> = ({ filter, onChange }) => {
	return (
		<div className="order-filter">
			<label>
				Estado:
				<select
					value={filter ?? ''}
					onChange={(e) =>
						onChange(
							e.target.value === '' ? undefined : (e.target.value as Status)
						)
					}
				>
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

export default OrderFilter
