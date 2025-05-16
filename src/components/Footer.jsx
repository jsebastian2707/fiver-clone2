
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Briefcase, Facebook, Twitter, Instagram } from 'lucide-react';

    const Footer = () => {
      return (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 text-gray-300 py-12"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase size={28} className="text-purple-400" />
                  <span className="text-xl font-bold text-white">HorizonteProfesional</span>
                </div>
                <p className="text-sm">Conectando profesionales con oportunidades.</p>
                <p className="text-sm mt-2">&copy; {new Date().getFullYear()} HorizonteProfesional. Todos los derechos reservados.</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre Nosotros</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Servicios</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidad</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white mb-4">Síguenos</h5>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Facebook size={24} /></a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Twitter size={24} /></a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Instagram size={24} /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      );
    };

    export default Footer;
  