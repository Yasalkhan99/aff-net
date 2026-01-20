export function calculateProfileCompleteness(profile: {
  logoSubmitted: boolean
  profilePictureSubmitted: boolean
  basicDetailsCompleted: boolean
  companyDetailsCompleted: boolean
  billingDetailsCompleted: boolean
  paymentDetailsCompleted: boolean
}): number {
  const totalFields = 5
  let completedFields = 0

  if (profile.logoSubmitted) completedFields++
  if (profile.profilePictureSubmitted) completedFields++
  if (profile.basicDetailsCompleted) completedFields++
  if (profile.companyDetailsCompleted) completedFields++
  if (profile.billingDetailsCompleted) completedFields++
  if (profile.paymentDetailsCompleted) completedFields++

  return Math.round((completedFields / totalFields) * 100)
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function convertToCSV(data: any[], headers: string[]): string {
  const rows = data.map(item => 
    headers.map(header => {
      const value = item[header] || ''
      return `"${String(value).replace(/"/g, '""')}"`
    }).join(',')
  )
  
  return [headers.map(h => `"${h}"`).join(','), ...rows].join('\n')
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}




