export const lightTheme = {
  borderColor: 'rgba(0,0,0,0.16)',
  bgColor: 'rgba(0,0,0,0.05)',
  bgColorActive: 'rgba(0,0,0,0.11)',
  textOpacity: 0.74,
  progressBg: 'rgba(0,0,0,0.12)'
}

export const darkTheme = {
  borderColor: 'rgba(255,255,255,0.12)',
  bgColor: 'rgba(255,255,255,0.06)',
  bgColorActive: 'rgba(255,255,255,0.18)',
  textOpacity: 0.80,
  progressBg: 'rgba(255,255,255,0.12)'
}

export function getTheme(isDark) {
  return isDark ? darkTheme : lightTheme
}
