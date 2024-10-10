function transformarData(dataString) {
  const data = new Date(dataString)
  const dia = data.getDate().toString().padStart(2,
    '0')
  const mes = (data.getMonth() +
    1).toString().padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}


function logout() {
  sessionStorage.clear()
}

function randomColor() {
  const colors = [
    '#FF6F61',
    '#FFB74D',
    '#FFD54F',
    '#81C784',
    '#64B5F6',
    '#9575CD',
    '#F06292',
    '#FF8A65',
    '#BA68C8',
    '#64B5F6',
    '#FFAB40',
    '#90CAF9',
    '#F48FB1',
    '#C5E1A5',
    '#FFCCBC',
    '#FFCC80'
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

function getTextColor(backgroundColor) {
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)

  const brightness = (r * 0.299 + g * 0.587 + b * 0.114)

  return brightness < 128 ? '#FFFFFF' : '#082031'
}

export default { transformarData, logout, randomColor, getTextColor }
