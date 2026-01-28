// Product data - parsed from products-database.txt
import { Product, parseProductsDatabase } from './products'

// Raw database content
const databaseContent = `anel bruto latão
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00205.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00206.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00209.jpg

anel caminhos
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00289.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00293.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00302.jpg

anel céu estrelado
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00506.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00507.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00516.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00521.jpg

anel domo do céu II
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00481.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00489.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00491.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00493.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00500.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00502.jpg

anel domo fechado
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00099.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00103.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00107.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00111.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00114.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00117.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00552.jpg

anel ofurô
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ofur%C3%B4/DSC00283.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ofur%C3%B4/DSC00285.jpg

anel ondas prata
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00306.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00193.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00195.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00198.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00199.jpg

anel ondas ouro
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00280.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00284.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00304.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00305.jpg

anel onsen prata
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00215.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00214.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00210.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00220.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00223.jpg

anel onsen ouro
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00277.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00268.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00266.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00271.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00275.jpg

bracelete oco
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00170.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00173.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00176.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00177.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00179.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20oco/DSC00184.jpg

bracelete organico
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00086.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00091.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00093.jpg

brinco andorinhas
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20andorinhas/DSC00054.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20andorinhas/DSC00058.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20andorinhas/DSC00060.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20andorinhas/DSC00545.jpg

brinco estrelas
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20estrelas/DSC00021%20-%20Copy.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20estrelas/DSC00025%20-%20Copy.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20estrelas/DSC00051.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20estrelas/DSC00536.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20estrelas/DSC00542.jpg

brinco mãe
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20m%C3%A3e/DSC00359.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20m%C3%A3e/DSC00362.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20m%C3%A3e/DSC00364.jpg

brinco sobreposição II
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20sobreposi%C3%A7%C3%A3o%20II/DSC00163.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20sobreposi%C3%A7%C3%A3o%20II/DSC00169.jpg

colar concha
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00389.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00394.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00395.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00400.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00402.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00403.jpg

colar mãe prata
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00357.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00356.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00358.jpg

colar mãe ouro
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00381.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00378.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00373.jpg

conjunto martelado estrela
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00139.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00147.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00148.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00149.jpg

marca páginas
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/marca%20p%C3%A1ginas/DSC00462.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/marca%20p%C3%A1ginas/DSC00455.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/marca%20p%C3%A1ginas/DSC00438.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/marca%20p%C3%A1ginas/DSC00439.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/marca%20p%C3%A1ginas/DSC00441.jpg

pingente estrela
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00525.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00550.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00551.jpg`

// Parse and export products
export const allProducts: Product[] = parseProductsDatabase(databaseContent)

// Export helper functions
export { getProductBySlug, filterByCategory, filterByMaterial, getCategories, getMaterials } from './products'

