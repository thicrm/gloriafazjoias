'use client'

interface ProductFiltersProps {
  categories: string[]
  materials: string[]
  filters: {
    category: string
    material: string
    priceRange: string
  }
  onFilterChange: (filterType: string, value: string) => void
  onClearFilters: () => void
}

export default function ProductFilters({
  categories,
  materials,
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const priceRanges = [
    { label: 'Até R$ 1.000', value: '0-1000' },
    { label: 'R$ 1.000 - R$ 2.500', value: '1000-2500' },
    { label: 'R$ 2.500 - R$ 5.000', value: '2500-5000' },
    { label: 'Acima de R$ 5.000', value: '5000-999999' },
  ]

  const hasActiveFilters =
    filters.category || filters.material || filters.priceRange

  return (
    <div className="bg-refined-cream/30 p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-title text-2xl text-refined-charcoal">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="font-body text-sm text-refined-charcoal/70 hover:text-refined-charcoal underline"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-title text-lg mb-4 text-refined-charcoal">Categoria</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="mr-3 w-4 h-4 text-refined-charcoal focus:ring-refined-charcoal"
              />
              <span className="font-body text-refined-charcoal/80 group-hover:text-refined-charcoal">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-8">
        <h3 className="font-title text-lg mb-4 text-refined-charcoal">Material</h3>
        <div className="space-y-2">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="material"
                value={material}
                checked={filters.material === material}
                onChange={(e) => onFilterChange('material', e.target.value)}
                className="mr-3 w-4 h-4 text-refined-charcoal focus:ring-refined-charcoal"
              />
              <span className="font-body text-refined-charcoal/80 group-hover:text-refined-charcoal">
                {material}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-title text-lg mb-4 text-refined-charcoal">Faixa de Preço</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
                className="mr-3 w-4 h-4 text-refined-charcoal focus:ring-refined-charcoal"
              />
              <span className="font-body text-refined-charcoal/80 group-hover:text-refined-charcoal">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

