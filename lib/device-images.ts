// Device image mapping utility
export const deviceImageMap: Record<string, string> = {
  // iPhones
  "iPhone 15 Pro Max": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 15 Pro": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 15": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 14 Pro Max": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 14 Pro": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 14": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 13 Pro Max": "/images/devices/iphone-15-pro-max.jpg",
  "iPhone 13": "/images/devices/iphone-15-pro-max.jpg",
  
  // MacBooks
  "MacBook Pro 14\"": "/images/devices/macbook-pro.jpg",
  "MacBook Pro 16\"": "/images/devices/macbook-pro.jpg",
  "MacBook Air M3": "/images/devices/macbook-pro.jpg",
  
  // Samsung
  "Galaxy S24 Ultra": "/images/devices/galaxy-s24-ultra.jpg",
  "Galaxy S24+": "/images/devices/galaxy-s24-ultra.jpg",
  "Galaxy S24": "/images/devices/galaxy-s24-ultra.jpg",
  "Galaxy S23 Ultra": "/images/devices/galaxy-s24-ultra.jpg",
  "Galaxy Z Fold 5": "/images/devices/galaxy-s24-ultra.jpg",
  "Galaxy Z Flip 5": "/images/devices/galaxy-s24-ultra.jpg",
  
  // Google Pixel
  "Pixel 8 Pro": "/images/devices/pixel-8-pro.jpg",
  "Pixel 8": "/images/devices/pixel-8-pro.jpg",
  
  // Consoles
  "PlayStation 5": "/images/devices/playstation-5.jpg",
  "PlayStation 5 Digital": "/images/devices/playstation-5.jpg",
  "Xbox Series X": "/images/devices/xbox-series-x.jpg",
  "Xbox Series S": "/images/devices/xbox-series-x.jpg",
  "Nintendo Switch OLED": "/images/devices/playstation-5.jpg",
  "Nintendo Switch": "/images/devices/playstation-5.jpg",
}

export function getDeviceImage(deviceModel: string): string {
  return deviceImageMap[deviceModel] || "/images/devices/iphone-15-pro-max.jpg"
}

export function getRepairCategoryImage(category: string): string {
  const categoryImages: Record<string, string> = {
    phone: "/images/categories/phone-repair.jpg",
    laptop: "/images/categories/laptop-repair.jpg",
    console: "/images/categories/console-repair.jpg",
    general: "/images/categories/phone-repair.jpg",
  }
  return categoryImages[category] || "/images/categories/phone-repair.jpg"
}
