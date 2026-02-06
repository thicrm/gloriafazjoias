import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      className="text-refined-charcoal mt-24 border-t border-refined-gold relative z-10" 
      style={{ 
        backgroundImage: "url('/images/ azul.jpg')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-start">
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src="/images/vertical-garramondtype.png"
              alt="Gloria Faz Joias Logo"
              width={225}
              height={300}
              className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

