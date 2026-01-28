'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { allProducts, getCategories, getMaterials, filterByCategory, filterByMaterial, Product } from '@/lib/products-data'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [filters, setFilters] = useState({
    category: '',
    material: '',
  })

  useEffect(() => {
    let filtered = [...allProducts]

    if (filters.category) {
      filtered = filterByCategory(filtered, filters.category)
    }

    if (filters.material) {
      filtered = filterByMaterial(filtered, filters.material)
    }

    setFilteredProducts(filtered)
  }, [filters])

  const handleFilterChange = (filterType: 'category' | 'material', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value === prev[filterType] ? '' : value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      material: '',
    })
  }

  const categories = getCategories(allProducts)
  const materials = getMaterials(allProducts)
  
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
  
  // Map materials to filter-friendly names
  const materialMap: { [key: string]: string } = {
    'Ouro': 'ouro',
    'Prata': 'prata',
    'Latão': 'latão',
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-title text-5xl md:text-6xl mb-8 text-refined-charcoal">
            jóias
          </h1>
          
          {/* Filters below title */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {/* Todos button */}
            <button
              onClick={() => clearFilters()}
              className={`px-6 py-2 font-body text-sm tracking-wider transition-all duration-300 ${
                !filters.category && !filters.material
                  ? 'bg-refined-charcoal text-white'
                  : 'border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-white'
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
                  className={`px-6 py-2 font-body text-sm tracking-wider transition-all duration-300 ${
                    filters.category === category
                      ? 'bg-refined-charcoal text-white'
                      : 'border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-white'
                  }`}
                >
                  {filterValue}
                </button>
              )
            })}
            
            {/* Material filters */}
            {materials.map((material) => {
              const filterValue = materialMap[material] || material.toLowerCase()
              return (
                <button
                  key={material}
                  onClick={() => handleFilterChange('material', material)}
                  className={`px-6 py-2 font-body text-sm tracking-wider transition-all duration-300 ${
                    filters.material === material
                      ? 'bg-refined-charcoal text-white'
                      : 'border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-white'
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
                  className="px-6 py-2 border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-refined-ivory transition-all duration-300 font-body"
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

