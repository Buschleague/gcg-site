export function mountainLayers(layers: number, from: string, to: string) {
  const arr: string[] = []
  for (let i = 0; i < layers; i++) {
    const opacity = 0.05 + i * 0.06
    const y = 50 + i * 60
    arr.push(`linear-gradient(to top, ${from}${hexOpacity(opacity)} ${y}px, ${to}00 ${y}px)`)
  }
  return arr.join(',\n')
}

export function hexOpacity(opacity: number) {
  const o = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
  return (o | (1 << 8)).toString(16).slice(1)
}