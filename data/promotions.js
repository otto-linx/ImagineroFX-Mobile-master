// data/promotions.js
export default [
  {
    id: 1,
    title: 'Escenas Cinematográficas',
    subtitle: 'Descuento especial para productos usados en producciones audiovisuales',
    image: require('../assets/images/cabeza_michael.jpg'),
    category: 'Cine/TV',
    discount: 30,
    highlight: true,
    link: '/cine'
  },
  {
    id: 2,
    title: 'Colección Steampunk',
    subtitle: 'Nuevos accesorios inspirados en el estilo industrial-victoriano',
    image: require('../assets/images/sombrero_steampunk.jpg'),
    category: 'Estilos',
    isNew: true,
    link: '/steampunk'
  },
  {
    id: 3,
    title: 'Escenarios Personalizados',
    subtitle: '¡Crea tu propio ambiente con nuestros paquetes de decoración!',
    image: require('../assets/images/kitchen.jpg'),
    category: 'Paquetes',
    isFeatured: true,
    cta: 'Ver opciones'
  },
  {
    id: 4,
    title: 'Oferta Temporal',
    subtitle: 'Lámparas quirúrgicas al 40% de descuento (mientras duren existencias)',
    image: require('../assets/images/lampara_quirófano.jpg'),
    category: 'Iluminación',
    discount: 40,
    countdown: '03d 05h',
    stock: 50
  }
];