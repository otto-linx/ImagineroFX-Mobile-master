const products = [
    {
        id: 1,
        name: 'Cabeza Escultórica Michael Jackson',
        category: 'Escenografía Profesional',
        price: 450,
        image: require('../assets/images/redbag.jpg'), // Usando redbag.jpg como cabeza escultórica
        description: 'Réplica hiperrealista para escenas biográficas o musicales',
        material: 'Latex de alta densidad',
        dimensions: '35x25x40 cm',
        era: '1980s'
    },
    {
        id: 2,
        name: 'Sombrero Steampunk Articulado',
        category: 'Vestuario de Personaje',
        price: 320,
        image: require('../assets/images/iphone.jpg'), // Usando iphone.jpg como sombrero
        description: 'Sombrero mecánico con engranajes móviles y lentes intercambiables',
        tags: ['ciencia ficción', 'fantasía victoriana'],
        customizable: true
    },
    {
        id: 3,
        name: 'Loro Mecánico para Escena',
        category: 'Atrezzo Creativo',
        price: 680,
        image: require('../assets/images/redshirt.jpg'), // Usando redshirt.jpg como loro mecánico
        description: 'Autómata parlante con movimiento realista y control remoto',
        features: ['15 frases preprogramadas', 'alas móviles', 'sensor de proximidad']
    },
    {
        id: 4,
        name: "Máscara de Médico de la Peste",
        category: "Vestuario de Personaje",
        price: 290,
        image: require('../assets/images/perfume.jpg'), // Usando perfume.jpg como máscara
        description: "Réplica histórica para producciones de época o distopías",
        historicalAccuracy: "Siglo XVII",
        materials: ["Cuero envejecido", "Lentes de cristal tallado"]
    },
    {
        id: 5,
        name: "Altavoces Vintage de Escenario",
        category: "Escenografía Profesional",
        price: 820,
        image: require('../assets/images/shoes.jpg'), // Usando shoes.jpg como altavoces
        description: "Prop funcional con sonido real para recreaciones musicales",
        specs: ["Potencia: 120W", "Conectividad Bluetooth", "Aspecto años 50"]
    },
    {
        id: 6,
        name: "Telón de Terciopelo Rojo",
        category: "Escenografía Profesional",
        price: 1250,
        image: require('../assets/images/watch.jpg'), // Usando watch.jpg como telón
        description: "8 metros de telón teatral con sistema de despliegue manual",
        material: "Terciopelo de algodón",
        weight: "42 kg"
    },
    {
        id: 7,
        name: "Kit de Herramientas de Escenógrafo",
        category: "Ambientación Total",
        price: 380,
        image: require('../assets/images/mastercard.png'), // Usando mastercard.png como kit
        description: "Set profesional para montaje rápido de decorados",
        includes: ["Martillo escénico", "Alicates multiusos", "Cinta métrica láser"]
    },
    {
        id: 8,
        name: "Lámpara de Quirófano Vintage",
        category: "Iluminación Escénica",
        price: 760,
        image: require('../assets/images/kitchen.jpg'), // Usando kitchen.jpg como lámpara
        description: "Iluminación ajustable para escenas médicas o de laboratorio",
        lightingType: "LED regulable (3000K-6500K)",
        powerSource: "Batería recargable"
    }
];

export default products;