import PropTypes from 'prop-types'
import { useState } from 'react'

const statusValues = ['pending', 'shipped', 'delivered']

function NewOrderForm({ onAdd }) {
	const [customer, setCustomer] = useState('')
	const [status, setStatus] = useState('pending')
	const [items, setItems] = useState([{ productId: 1, name: '', quantity: 1, price: 0 }])

	const orderTotal = items.reduce((sum, it) => sum + Number(it.quantity || 0) * Number(it.price || 0), 0)

	function updateItem(index, field, value) {
		setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
	}

	function addItemRow() {
		setItems((prev) => [
			...prev,
			{ productId: prev.length + 1, name: '', quantity: 1, price: 0 },
		])
	}

	function removeItemRow(index) {
		setItems((prev) => prev.filter((_, i) => i !== index))
	}

	function handleSubmit(e) {
		e.preventDefault()
		// Validaciones de negocio mínimas
		if (customer.trim().length < 3) {
			alert('El nombre del cliente debe tener al menos 3 caracteres')
			return
		}
		if (items.length === 0) {
			alert('Debe agregar al menos un producto')
			return
		}
		for (const item of items) {
			if (!item.name.trim()) {
				alert('Cada producto debe tener nombre')
				return
			}
			if (item.quantity <= 0) {
				alert('La cantidad debe ser mayor a 0')
				return
			}
			if (item.price < 0) {
				alert('El precio no puede ser negativo')
				return
			}
		}
		onAdd({ customer, status, items, date: new Date() })
		setCustomer('')
		setStatus('pending')
		setItems([{ productId: 1, name: '', quantity: 1, price: 0 }])
	}

	return (
		<form className="new-order-form" onSubmit={handleSubmit}>
			<h3>Nuevo Pedido</h3>
			<div className="row">
				<label>
					Cliente
					<input
						value={customer}
						onChange={(e) => setCustomer(e.target.value)}
						placeholder="Nombre y apellido del cliente"
						aria-label="Nombre del cliente"
					/>
				</label>
				<label>
					Estado
					<select value={status} onChange={(e) => setStatus(e.target.value)}>
						{statusValues.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
			</div>

			<div className="items">
				<h4>Productos</h4>
				{items.map((item, index) => (
					<div className="item-row" key={index}>
						<div className="field">
							<span className="field-label">Producto</span>
							<input
								placeholder="Nombre del producto"
								value={item.name}
								onChange={(e) => updateItem(index, 'name', e.target.value)}
								aria-label={`Nombre del producto ${index + 1}`}
							/>
						</div>
						<div className="field">
							<span className="field-label">Cantidad</span>
							<input
								type="number"
								min={1}
								placeholder="Unidades"
								value={item.quantity}
								onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
								aria-label={`Cantidad del producto ${index + 1}`}
							/>
						</div>
						<div className="field">
							<span className="field-label">Precio</span>
							<input
								type="number"
								min={0}
								step="0.01"
								placeholder="$ por unidad"
								value={item.price}
								onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
								aria-label={`Precio del producto ${index + 1}`}
							/>
						</div>
                        <div className="field row-button">
						<button type="button" onClick={() => removeItemRow(index)}>
							Eliminar
						</button>
                        </div>
					</div>
				))}
				<button type="button" onClick={addItemRow}>
					Agregar producto
				</button>

				<div className="order-total">
					<span>Total del pedido</span>
					<strong>${orderTotal.toFixed(2)}</strong>
				</div>
			</div>

			<div className="actions">
				<button type="submit">Agregar Pedido</button>
			</div>
		</form>
	)
}

NewOrderForm.propTypes = {
	onAdd: PropTypes.func.isRequired,
}

export default NewOrderForm


