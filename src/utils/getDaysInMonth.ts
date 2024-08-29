function getDaysInMonth(month: string, year: string): number {
  // Convertimos el nombre del mes al formato requerido por Date
  const date = new Date(`${month} 1, ${year}`);
  // Obtenemos el siguiente mes
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  // Calculamos la diferencia en milisegundos y la convertimos a días
  const daysInMonth = (nextMonth.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return daysInMonth;
}

export default getDaysInMonth;