
    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
    import { Star, MessageSquare, Briefcase, Tag, ArrowLeft, ShoppingCart } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';

    // Dummy data, merge with localStorage logic similar to ServicesListPage
    const findServiceById = (id) => {
      const initialServices = [
        { id: '1', name: 'Diseño de Logotipo Moderno', description: 'Creación de logotipos únicos y memorables para tu marca. Incluye 3 revisiones y entrega en múltiples formatos. Ideal para startups y empresas que buscan renovar su imagen.', price: 'Desde 150 USD', category: 'Diseño Gráfico', rating: 4.8, user: { name: 'Ana Pérez', profession: 'Diseñadora Gráfica Senior', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=Ana%20Perez' }, image: 'logo-design', details: 'Proceso colaborativo para asegurar que el diseño final cumpla tus expectativas. Entrega en 5-7 días hábiles.' },
        { id: '2', name: 'Traducción Inglés-Español', description: 'Traducciones precisas y profesionales para documentos y webs.', price: '0.10 USD/palabra', category: 'Traducción', rating: 4.9, user: { name: 'Carlos López', profession: 'Traductor Certificado', avatarUrl: 'https://api.dicebear.com/6.x/initials/svg?seed=Carlos%20Lopez' }, image: 'translation-services', details: 'Especializado en textos técnicos, legales y de marketing. Confidencialidad garantizada.' },
      ];
      let service = initialServices.find(s => s.id === id);
      if (service) return service;

      // Check localStorage
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('userServices_')) {
            const userServices = JSON.parse(localStorage.getItem(key));
            const foundService = userServices.find(s => s.id === id);
            if (foundService) {
              const userId = key.replace('userServices_', '');
              const userProfile = JSON.parse(localStorage.getItem(`userProfile_${userId}`)) || { name: 'Usuario Desconocido', profession: 'Profesional', avatarUrl: `https://api.dicebear.com/6.x/initials/svg?seed=Unknown`};
              return {
                ...foundService,
                user: userProfile,
                image: foundService.category?.toLowerCase().replace(/\s+/g, '-') || 'generic-service',
                details: foundService.description // Use full description as details if not separated
              };
            }
          }
        }
      } catch (error) {
        console.error("Error loading service from localStorage:", error);
      }
      return null;
    };


    const ServiceDetailPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const { toast } = useToast();
      const [service, setService] = useState(null);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        // Simulate API call
        setIsLoading(true);
        setTimeout(() => {
          const foundService = findServiceById(id);
          setService(foundService);
          setIsLoading(false);
        }, 500);
      }, [id]);

      const handlePurchase = () => {
        toast({
          title: "¡Servicio añadido al carrito!",
          description: `${service.name} está en camino a ser tuyo. (Funcionalidad de pago no implementada).`,
          className: "bg-green-600 text-white border-green-700"
        });
      };

      if (isLoading) {
        return <div className="text-center text-xl text-yellow-300 py-10">Cargando detalles del servicio...</div>;
      }

      if (!service) {
        return <div className="text-center text-xl text-red-400 py-10">Servicio no encontrado.</div>;
      }

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-700">
            <ArrowLeft size={18} className="mr-2" /> Volver a Servicios
          </Button>

          <Card className="overflow-hidden glassmorphism border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img  
                  className="w-full h-64 md:h-full object-cover" 
                  alt={service.name}
                 src="https://images.unsplash.com/photo-1695965225979-e0b585d302df" />
                <div className="absolute top-4 left-4 bg-purple-600/80 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Tag size={16} className="mr-1.5" /> {service.category}
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 mb-2">{service.name}</CardTitle>
                  <div className="flex items-center text-yellow-400 mb-3">
                    {[...Array(Math.floor(service.rating || 0))].map((_, i) => <Star key={`full-${i}`} size={22} className="fill-current" />)}
                    {[...Array(5 - Math.floor(service.rating || 0))].map((_, i) => <Star key={`empty-${i}`} size={22} />)}
                    <span className="ml-2 text-indigo-200 font-semibold">({service.rating || 'N/A'} estrellas)</span>
                  </div>
                  <CardDescription className="text-lg text-indigo-100">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="p-0 flex-grow space-y-4">
                  <div>
                    <h4 className="font-semibold text-yellow-200 text-lg mb-1">Detalles del Servicio:</h4>
                    <p className="text-indigo-200">{service.details || service.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 text-lg mb-1">Precio:</h4>
                    <p className="text-2xl font-bold text-green-400">{service.price}</p>
                  </div>
                </CardContent>

                <div className="mt-6 pt-6 border-t border-purple-700/50">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16 border-2 border-yellow-400 mr-4">
                      <AvatarImage src={service.user.avatarUrl} alt={service.user.name} />
                      <AvatarFallback className="bg-purple-600 text-yellow-300">{service.user.name ? service.user.name[0].toUpperCase() : 'P'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg text-yellow-300">{service.user.name}</p>
                      <p className="text-sm text-purple-300 flex items-center"><Briefcase size={14} className="mr-1.5" /> {service.user.profession}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" onClick={handlePurchase} className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold shadow-lg transform hover:scale-105">
                      <ShoppingCart size={20} className="mr-2" /> Comprar Servicio
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-700 font-bold shadow-lg transform hover:scale-105">
                      <MessageSquare size={20} className="mr-2" /> Contactar Profesional
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Placeholder for Reviews/Comments Section */}
          <Card className="glassmorphism border-purple-500/50 shadow-xl shadow-purple-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-yellow-300">Valoraciones y Comentarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-200">Esta sección mostrará las valoraciones y comentarios de otros usuarios. (Próximamente)</p>
              {/* Example Review Structure */}
              <div className="mt-4 p-4 border border-purple-700 rounded-lg bg-purple-900/30">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current mr-0.5" />)}
                  <span className="ml-2 font-semibold text-yellow-200">Excelente Calidad!</span>
                </div>
                <p className="text-sm text-indigo-200 mb-1">"Muy profesional y entregó el trabajo antes de lo esperado. Totalmente recomendado."</p>
                <p className="text-xs text-purple-400">- Usuario Satisfecho, hace 2 días</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default ServiceDetailPage;
  