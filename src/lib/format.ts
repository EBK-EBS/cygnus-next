/** Formatea un número como moneda colombiana (es-CO), fiel al fmt() original. */
export function fmt(n: number): string {
  return Number(n).toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Convierte un nombre de campo camelCase a un encabezado legible ("totalDeuda" -> "Total Deuda"). */
export function beautifyHeader(field: string): string {
  const spaced = field.replace(/([A-Z])/g, ' $1')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

/** Simula la cuota mensual de un crédito (fórmula francesa), fiel al original. */
export function calcularCuota(monto: number, plazo: number, tasa: number): number {
  if (monto <= 0 || plazo <= 0 || tasa <= 0) return 0
  return (monto * (tasa * Math.pow(1 + tasa, plazo))) / (Math.pow(1 + tasa, plazo) - 1)
}

/** Nombre corto para gráficos: primer nombre + apellido. */
export function nombreCorto(nombre: string): string {
  const parts = nombre.split(' ')
  return parts[0] + ' ' + (parts[1] || '')
}