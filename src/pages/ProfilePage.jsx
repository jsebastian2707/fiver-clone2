
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { useAuth } from '@/hooks/useAuth.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
    import { Edit3, Save, PlusCircle, Trash2, Briefcase, Mail } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';

    const ProfilePage = () => {
      const { user, login: updateAuthUser } = useAuth(); // Renamed login to updateAuthUser for clarity, assuming it updates user in context
      const { toast } = useToast();
      const [isEditingProfile, setIsEditingProfile] = useState(false);
      
      const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        profession: '',
        description: '',
        avatarUrl: '',
      });

      const [services, setServices] = useState([]);
      const [isAddingService, setIsAddingService] = useState(false);
      const [currentService, setCurrentService] = useState({ id: null, name: '', description: '', price: '', category: '', images: [] });

      useEffect(() => {
        if (user) {
          const storedProfile = JSON.parse(localStorage.getItem(`userProfile_${user.id}`)) || {
            name: user.name || user.email?.split('@')[0] || 'Usuario',
            email: user.email || '',
            profession: 'Profesional Independiente',
            description: 'Breve descripción de tus servicios y experiencia.',
            avatarUrl: user.avatarUrl || `https://api.dicebear.com/6.x/initials/svg?seed=${user.email || 'User'}`
          };
          setProfileData(storedProfile);

          const storedServices = JSON.parse(localStorage.getItem(`userServices_${user.id}`)) || [];
          setServices(storedServices);
        }
      }, [user]);

      const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveProfile = () => {
        localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profileData));
        // Update user in AuthContext. The login function in AuthContext sets the user.
        // If you need a dedicated updateUser function, it should be added to AuthContext.
        // For now, re-using login will update the user state in context if its structure matches.
        updateAuthUser({...user, ...profileData}); 
        toast({ title: "Perfil Actualizado", description: "Tu información ha sido guardada." });
        setIsEditingProfile(false);
      };
      
      const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setCurrentService(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveService = () => {
        let updatedServices;
        if (currentService.id) { 
          updatedServices = services.map(s => s.id === currentService.id ? currentService : s);
        } else { 
          updatedServices = [...services, { ...currentService, id: Date.now().toString() }];
        }
        setServices(updatedServices);
        localStorage.setItem(`userServices_${user.id}`, JSON.stringify(updatedServices));
        toast({ title: "Servicio Guardado", description: `El servicio "${currentService.name}" ha sido guardado.` });
        setIsAddingService(false);
        setCurrentService({ id: null, name: '', description: '', price: '', category: '', images: [] });
      };

      const handleEditService = (service) => {
        setCurrentService(service);
        setIsAddingService(true);
      };
      
      const handleDeleteService = (serviceId) => {
        const serviceToDelete = services.find(s => s.id === serviceId);
        const updatedServices = services.filter(s => s.id !== serviceId);
        setServices(updatedServices);
        localStorage.setItem(`userServices_${user.id}`, JSON.stringify(updatedServices));
        toast({ title: "Servicio Eliminado", description: `El servicio "${serviceToDelete?.name}" ha sido eliminado.` });
      };


      if (!user) {
        return <div className="text-center text-xl text-yellow-300">Por favor, inicia sesión para ver tu perfil.</div>;
      }

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Card className="glassmorphism border-purple-500/50 shadow-xl shadow-purple-500/10">
            <CardHeader className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Avatar className="h-32 w-32 border-4 border-yellow-400 shadow-lg">
                  <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                  <AvatarFallback className="bg-purple-600 text-yellow-300 text-4xl">
                    {profileData.name ? profileData.name[0].toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                {isEditingProfile && (
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 bg-gray-800 hover:bg-gray-700 border-yellow-400 text-yellow-400 rounded-full h-8 w-8">
                    <Edit3 size={16} />
                  </Button>
                )}
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                {isEditingProfile ? (
                  <Input 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleProfileChange} 
                    className="text-3xl font-bold mb-1 bg-purple-900/30 border-purple-600 text-white focus:border-yellow-400"
                  />
                ) : (
                  <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400">
                    {profileData.name}
                  </CardTitle>
                )}
                {isEditingProfile ? (
                  <Input 
                    name="profession" 
                    value={profileData.profession} 
                    onChange={handleProfileChange} 
                    className="text-xl text-purple-300 mb-2 bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                  />
                ) : (
                  <CardDescription className="text-xl text-purple-300">{profileData.profession}</CardDescription>
                )}
                 <p className="text-sm text-indigo-300 flex items-center justify-center md:justify-start mt-1">
                  <Mail size={16} className="mr-2 text-yellow-400" /> {profileData.email}
                </p>
              </div>
              <div>
                {isEditingProfile ? (
                  <Button onClick={handleSaveProfile} className="bg-green-500 hover:bg-green-600 text-white">
                    <Save size={18} className="mr-2" /> Guardar Perfil
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditingProfile(true)} variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-700">
                    <Edit3 size={18} className="mr-2" /> Editar Perfil
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <Textarea 
                  name="description" 
                  value={profileData.description} 
                  onChange={handleProfileChange} 
                  placeholder="Describe tus servicios y experiencia..."
                  className="text-base text-indigo-100 mt-4 min-h-[100px] bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                />
              ) : (
                <p className="text-base text-indigo-100 mt-4">{profileData.description}</p>
              )}
              {isEditingProfile && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="avatarUrl" className="text-indigo-100">URL de Avatar</Label>
                  <Input 
                    id="avatarUrl"
                    name="avatarUrl" 
                    value={profileData.avatarUrl} 
                    onChange={handleProfileChange} 
                    placeholder="https://ejemplo.com/avatar.png"
                    className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glassmorphism border-purple-500/50 shadow-xl shadow-purple-500/10">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold text-yellow-300">Mis Servicios</CardTitle>
              <Button onClick={() => { setCurrentService({ id: null, name: '', description: '', price: '', category: '', images: [] }); setIsAddingService(true); }} className="bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle size={18} className="mr-2" /> Añadir Servicio
              </Button>
            </CardHeader>
            <CardContent>
              {isAddingService && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 border border-purple-600 rounded-lg mb-6 space-y-4 bg-purple-900/20"
                >
                  <h3 className="text-xl font-semibold text-yellow-200">{currentService.id ? 'Editar' : 'Añadir Nuevo'} Servicio</h3>
                  <div>
                    <Label htmlFor="serviceName" className="text-indigo-100">Nombre del Servicio</Label>
                    <Input id="serviceName" name="name" value={currentService.name} onChange={handleServiceChange} className="bg-purple-900/50 border-purple-700 text-white focus:border-yellow-400" />
                  </div>
                  <div>
                    <Label htmlFor="serviceDescription" className="text-indigo-100">Descripción</Label>
                    <Textarea id="serviceDescription" name="description" value={currentService.description} onChange={handleServiceChange} className="bg-purple-900/50 border-purple-700 text-white focus:border-yellow-400" />
                  </div>
                  <div>
                    <Label htmlFor="servicePrice" className="text-indigo-100">Precio (ej: 50 USD, 20 EUR/hora)</Label>
                    <Input id="servicePrice" name="price" value={currentService.price} onChange={handleServiceChange} className="bg-purple-900/50 border-purple-700 text-white focus:border-yellow-400" />
                  </div>
                  <div>
                    <Label htmlFor="serviceCategory" className="text-indigo-100">Categoría</Label>
                    <Input id="serviceCategory" name="category" value={currentService.category} onChange={handleServiceChange} placeholder="Ej: Diseño Gráfico, Traducción" className="bg-purple-900/50 border-purple-700 text-white focus:border-yellow-400" />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveService} className="bg-green-500 hover:bg-green-600 text-white">
                      <Save size={16} className="mr-2" /> {currentService.id ? 'Actualizar' : 'Guardar'} Servicio
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingService(false)} className="border-gray-500 text-gray-300 hover:bg-gray-700">Cancelar</Button>
                  </div>
                </motion.div>
              )}

              {services.length === 0 && !isAddingService ? (
                <p className="text-indigo-200 text-center py-4">Aún no has añadido ningún servicio.</p>
              ) : (
                <div className="space-y-4">
                  {services.map(service => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border border-purple-700 rounded-lg flex justify-between items-center bg-purple-900/30 hover:bg-purple-900/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-lg text-yellow-200">{service.name} <span className="text-sm text-purple-300">({service.category})</span></h4>
                        <p className="text-sm text-indigo-200">{service.description.substring(0,100)}...</p>
                        <p className="text-md font-bold text-green-400 mt-1">{service.price}</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditService(service)} className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                          <Edit3 size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)} className="bg-red-600 hover:bg-red-700">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default ProfilePage;
  