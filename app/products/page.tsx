'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { allProducts, getCategories, filterByCategory, Product } from '@/lib/products-data'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [filters, setFilters] = useState({
    category: '',
  })

  useEffect(() => {
    let filtered = [...allProducts]

    if (filters.category) {
      filtered = filterByCategory(filtered, filters.category)
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

  const categories = getCategories(allProducts)
  
  // Map categories to filter-friendly names
  const categoryMap: { [key: string]: string } = {
    'Anéis': 'anéis',
    'Colares': 'colares',
    'Brincos': 'brincos',
    'Braceletes': 'braceletes',
    'Pingentes': 'pingentes',
    'Acessórios': 'acessórios',
    'Conjuntos': 'conjuntos',
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-title text-5xl md:text-6xl mb-8 text-refined-charcoal">
            jóias
          </h1>
          
          {/* Filters below title */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {/* Todos button */}
            <button
              onClick={() => clearFilters()}
              className={`font-body text-xl tracking-wider transition-all duration-500 ease-in-out text-refined-charcoal hover:text-refined-charcoal/70 ${
                !filters.category
                  ? 'font-bold'
                  : 'font-normal'
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
                  className={`font-body text-xl tracking-wider transition-all duration-500 ease-in-out text-refined-charcoal hover:text-refined-charcoal/70 ${
                    filters.category === category
                      ? 'font-bold'
                      : 'font-normal'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

