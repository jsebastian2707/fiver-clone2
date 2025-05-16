
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { useNavigate } from 'react-router-dom';
    import { Search, Filter, Star, Briefcase } from 'lucide-react';

    // Dummy data for services - replace with API call / localStorage
    const initialServices = [
      { id: '1', name: 'Diseño de Logotipo Moderno', description: 'Creación de logotipos únicos y memorables para tu marca.', price: 'Desde 150 USD', category: 'Diseño Gráfico', rating: 4.8, user: { name: 'Ana Pérez', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=Ana%20Perez' }, image: 'logo-design' },
      { id: '2', name: 'Traducción Inglés-Español', description: 'Traducciones precisas y profesionales para documentos y webs.', price: '0.10 USD/palabra', category: 'Traducción', rating: 4.9, user: { name: 'Carlos López', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=Carlos%20Lopez' }, image: 'translation-services' },
      { id: '3', name: 'Sesión de Fotografía de Producto', description: 'Fotografías de alta calidad para destacar tus productos.', price: '250 USD/sesión', category: 'Fotografía', rating: 4.7, user: { name: 'Laura Gómez', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=Laura%20Gomez' }, image: 'product-photography' },
      { id: '4', name: 'Desarrollo Web Frontend', description: 'Construcción de interfaces web interactivas y responsivas.', price: '50 USD/hora', category: 'Programación', rating: 5.0, user: { name: 'David Fernández', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=David%20Fernandez' }, image: 'web-development' },
    ];
    
    const ServicesListPage = () => {
      const [services, setServices] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filters, setFilters] = useState({ category: '', priceRange: '', rating: 0 });
      const navigate = useNavigate();

      useEffect(() => {
        // Simulate fetching services. In a real app, this would be an API call.
        // For now, we'll also check localStorage for services created by users.
        const allServices = [...initialServices];
        
        // This part is a simplified way to get all services from all users.
        // In a real app with a backend, you'd query the database.
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('userServices_')) {
              const userServices = JSON.parse(localStorage.getItem(key));
              const userId = key.replace('userServices_', '');
              const userProfile = JSON.parse(localStorage.getItem(`userProfile_${userId}`)) || { name: 'Usuario Desconocido', avatarUrl: `https://api.dicebear.com/6.x/initials/svg?seed=Unknown`};
              
              userServices.forEach(service => {
                // Avoid duplicates if initialServices already contains it (not likely with this setup)
                if (!allServices.find(s => s.id === service.id && s.user?.name === userProfile.name)) {
                  allServices.push({
                    ...service,
                    user: userProfile,
                    // Add a placeholder image based on category or a generic one
                    image: service.category?.toLowerCase().replace(/\s+/g, '-') || 'generic-service'
                  });
                }
              });
            }
          }
        } catch (error) {
          console.error("Error loading services from localStorage:", error);
        }
        
        setServices(allServices);
      }, []);

      const filteredServices = services.filter(service => {
        const nameMatch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = filters.category ? service.category === filters.category : true;
        // Add more sophisticated price and rating filters later
        return nameMatch && categoryMatch;
      });

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      };

      return (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 mb-8">
              Explora Servicios Profesionales
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 rounded-lg glassmorphism border-purple-500/30">
              <div className="relative flex-grow">
                <Input 
                  type="text"
                  placeholder="Buscar servicios (ej: diseño web, traducción...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400 h-12 text-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              </div>
              <Button variant="outline" className="h-12 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-700 text-lg">
                <Filter className="mr-2 h-5 w-5" /> Filtros
              </Button>
            </div>
          </motion.div>

          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.custom
                  key={service.id + (service.user?.name || index)}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full"
                  elementType={Card} // Use elementType for Framer Motion with custom components
                  onClick={() => navigate(`/services/${service.id}`)} // Assuming ServiceDetailPage exists
                >
                  <Card className="h-full flex flex-col overflow-hidden glassmorphism border-purple-500/50 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <div className="relative h-56 w-full">
                      <img  
                        className="absolute inset-0 w-full h-full object-cover" 
                        alt={service.name}
                       src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-2 bg-purple-600/80 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">{service.category}</div>
                    </div>
                    <CardHeader className="pt-4">
                      <CardTitle className="text-xl font-semibold text-yellow-300 hover:text-yellow-200 transition-colors">{service.name}</CardTitle>
                      <CardDescription className="text-indigo-200 h-12 overflow-hidden text-ellipsis">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       <div className="flex items-center text-sm text-purple-300 mb-2">
                        <Briefcase size={16} className="mr-2 text-yellow-400" />
                        Ofrecido por: <span className="font-semibold ml-1">{service.user?.name || 'Profesional'}</span>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star size={18} className="mr-1 fill-current" /> 
                        <span className="font-bold">{service.rating || 'N/A'}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-purple-700/50 pt-4">
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-bold text-green-400">{service.price}</p>
                        <Button variant="ghost" className="text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-200">
                          Ver Detalles
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.custom>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Search size={64} className="mx-auto text-purple-400 mb-4" />
              <p className="text-xl text-indigo-200">No se encontraron servicios que coincidan con tu búsqueda.</p>
              <p className="text-indigo-300">Intenta ajustar los filtros o términos de búsqueda.</p>
            </motion.div>
          )}
        </div>
      );
    };

    export default ServicesListPage;
  