import React from 'react'
import OrderStats from '../components/OrderStats'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface StatsPageProps {
  stats: { total: number; pending: number; shipped: number; delivered: number }
}

const COLORS = ['#FFD700', '#1f6feb', '#28a745'] // amarillo, azul, verde

const StatsPage: React.FC<StatsPageProps> = ({ stats }) => {
  const data = [
    { name: 'Pendientes', value: stats.pending },
    { name: 'Enviados', value: stats.shipped },
    { name: 'Entregados', value: stats.delivered }
  ]

  return (
    <div className="page stats-page">
      <h1>Estadísticas</h1>
      <OrderStats {...stats} />

      <div
        className="chart-container"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          padding: '20px',
          marginTop: '20px',
          height: '350px'
        }}
      >
        <h2 style={{ marginBottom: '16px' }}>Distribución de Pedidos</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatsPage
