import ImageWithLoading from '@/components/ImageWithLoading'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Picture Grid Section */}
      <section className="w-full -mt-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-2 w-full">
          <div className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-83.JPEG"
              alt="Brutalita Autoral 83"
              fill
              aspectRatio="1/0.8"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
          <div className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-39.JPEG"
              alt="Brutalita Autoral 39"
              fill
              aspectRatio="1/0.8"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

    </div>
  )
}

