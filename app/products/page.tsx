'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { storeProducts, getStoreCategories, filterStoreByCategory, Product } from '@/lib/products-data'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProducts)
  const [filters, setFilters] = useState({
    category: initialCategory,
  })

  useEffect(() => {
    let filtered = [...storeProducts]

    if (filters.category) {
      filtered = filterStoreByCategory(filtered, filters.category)
    }

    setFilteredProducts(filtered)
  }, [filters])

  const handleFilterChange = (filterType: 'category', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value === prev[filterType] ? '' : value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
    })
  }

  const categories = getStoreCategories()
  
  // Map categories to filter-friendly display names (lowercase)
  const categoryMap: { [key: string]: string } = {
    'Anéis': 'anéis',
    'Braceletes e Pulseiras': 'braceletes e pulseiras',
    'Brincos': 'brincos',
    'Broches': 'broches',
    'Colares': 'colares',
    'Conjuntos': 'conjuntos',
    'Objetos': 'objetos',
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-title text-5xl md:text-6xl mb-8 text-refined-charcoal font-bold">
            jóias
          </h1>
          
          {/* Filters below title */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {/* Todos button */}
            <button
              onClick={() => clearFilters()}
              className={`font-body text-xl tracking-wider transition-all duration-500 ease-in-out ${
                !filters.category
                  ? 'text-refined-gold font-bold drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] hover:text-refined-gold'
                  : 'text-refined-charcoal font-normal hover:text-refined-charcoal/70'
              }`}
            >
              todos
            </button>
            
            {/* Category filters */}
            {categories.map((category) => {
              const filterValue = categoryMap[category] || category.toLowerCase()
              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category)}
                  className={`font-body text-xl tracking-wider transition-all duration-500 ease-in-out ${
                    filters.category === category
                      ? 'text-refined-gold font-bold drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] hover:text-refined-gold'
                      : 'text-refined-charcoal font-normal hover:text-refined-charcoal/70'
                  }`}
                >
                  {filterValue}
                </button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-body text-lg text-refined-charcoal/70 mb-4">
                  Nenhuma peça encontrada com os filtros selecionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-refined-ivory transition-all duration-500 ease-in-out font-body"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <p className="font-body text-lg text-refined-charcoal/70">Carregando...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}

