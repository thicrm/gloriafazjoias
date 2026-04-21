'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CART_CHANGE_EVENT,
  CART_STORAGE_KEY,
  type CartLine,
  cartLineKey,
} from '@/lib/cart-types'

type CartContextValue = {
  items: CartLine[]
  hydrated: boolean
  itemCount: number
  addItem: (line: Omit<CartLine, 'id'>) => void
  removeLine: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is CartLine =>
        x &&
        typeof x === 'object' &&
        typeof (x as CartLine).id === 'string' &&
        typeof (x as CartLine).sku === 'string' &&
        typeof (x as CartLine).productName === 'string' &&
        typeof (x as CartLine).quantity === 'number'
    )
  } catch {
    return []
  }
}

function saveCart(items: CartLine[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_CHANGE_EVENT))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveCart(items)
  }, [items, hydrated])

  const addItem = useCallback((line: Omit<CartLine, 'id'>) => {
    const key = cartLineKey(line.sku, line.ringSizeBr, line.acabamento, line.formato)
    setItems((prev) => {
      const idx = prev.findIndex((p) => cartLineKey(p.sku, p.ringSizeBr, p.acabamento, p.formato) === key)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + line.quantity }
        return next
      }
      return [...prev, { ...line, id: `${key}-${Date.now()}` }]
    })
  }, [])

  const removeLine = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((p) => p.id !== id))
      return
    }
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(() => items.reduce((n, l) => n + l.quantity, 0), [items])

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount,
      addItem,
      removeLine,
      setQuantity,
      clearCart,
    }),
    [items, hydrated, itemCount, addItem, removeLine, setQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}
