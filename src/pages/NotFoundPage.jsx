
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Link } from 'react-router-dom';
    import { AlertTriangle, Home } from 'lucide-react';

    const NotFoundPage = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            <AlertTriangle className="h-32 w-32 text-yellow-400 mx-auto mb-8" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl font-semibold text-indigo-100 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            ¡Ups! Página no encontrada.
          </motion.p>
          
          <motion.p 
            className="text-lg text-indigo-200 mb-10 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Parece que te has perdido en el ciberespacio. No te preocupes, podemos guiarte de regreso.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-bold text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Volver al Inicio
              </Link>
            </Button>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;
  