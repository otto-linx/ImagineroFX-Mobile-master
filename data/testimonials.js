// data/testimonials.js
export default [
  {
    id: 1,
    name: 'Equipo de Producción',
    role: 'Productor de cine - Película "Sombras del Pasado"',
    comment: 'Los elementos escenográficos superaron nuestras expectativas. La atención personalizada y la precisión en los detalles hicieron que la ambientación histórica fuera perfecta.',
    rating: 5,
    avatar: require('../assets/avatars/team_cine.jpg'),
    projectImage: require('../assets/testimonials/peli_sombras.jpg'),
    mediaType: 'image',
    category: 'Cine',
    featured: true,
    date: '03/24'
  },
  {
    id: 2,
    name: 'Centro Comercial',
    role: 'Gerente de Marketing - Plaza Mayor',
    comment: 'Implementamos sus escenarios temáticos para nuestra campaña navideña. La durabilidad de los materiales y la originalidad del diseño generaron un 40% más de tráfico este año.',
    rating: 5,
    avatar: require('../assets/avatars/plaza_mayor.jpg'),
    mediaType: 'video',
    videoUrl: 'https://example.com/testimonial_plaza.mp4', 
    category: 'Espacios Comerciales',
    featured: true,
    tags: ['Navidad', 'Comercial']
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Directora de Arte - Serie "Mundo Steampunk"',
    comment: 'La colección steampunk fue crucial para mantener la coherencia visual de la serie. El soporte técnico durante la producción fue invaluable.',
    rating: 4,
    avatar: require('../assets/avatars/avatar_ana.jpg'),
    category: 'TV',
    projectReference: 'Episodios 3-5 Temporada 2',
    date: '02/24'
  },
  {
    id: 4,
    name: 'Museo Histórico',
    role: 'Curador de Exposiciones',
    comment: 'Para nuestra exposición "Época Victoriana" utilizamos sus réplicas. Los visitantes quedaron fascinados con la autenticidad de los detalles.',
    rating: 5,
    avatar: require('../assets/avatars/museo.jpg'),
    projectImage: require('../assets/testimonials/exposicion_victoriana.jpg'),
    category: 'Institucional',
    featured: true,
    tags: ['Museo', 'Historia']
  }
];