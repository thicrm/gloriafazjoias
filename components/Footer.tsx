import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      className="text-refined-charcoal mt-12 border-t border-refined-gold relative z-20" 
      style={{ 
        backgroundImage: "url('/images/ azul.jpg')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        boxShadow: '0 -1px 10px rgba(212, 175, 55, 0.5), 0 -1px 20px rgba(212, 175, 55, 0.3)'
      }}
    >
      {/* Stars overlay - above texture, below content */}
      <div 
        className="absolute inset-0 z-[5] transition-all duration-700 ease-in-out hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]"
        style={{
          backgroundImage: "url('/images/footer01-estrelas.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'auto'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex items-start justify-between">
          {/* Right side - Text blocks */}
          <div className="flex gap-16 ml-[150px]">
            {/* Descubra block */}
            <div className="text-white">
              <h3 className="font-title font-bold text-lg mb-3 transition-transform duration-700 ease-in-out hover:scale-110">Descubra</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    jóias
                  </Link>
                </li>
                <li>
                  <Link href="/colecoes" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    coleções
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    categorias
                  </Link>
                </li>
              </ul>
            </div>

            {/* Informações block */}
            <div className="text-white mt-[70px]">
              <h3 className="font-title font-bold text-lg mb-3 transition-transform duration-700 ease-in-out hover:scale-110">Informações</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/encomendas" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    encomendas
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    sobre
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="font-body italic text-base hover:text-refined-gold transition-colors duration-300">
                    contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex flex-col items-center">
              <Image
                src="/images/vertical-garramondtype.png"
                alt="Gloria Faz Joias Logo"
                width={225}
                height={300}
                className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <p className="text-white font-body italic text-sm mt-4 mr-[20px]">© Glória Faz Jóias 2026</p>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}

