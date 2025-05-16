import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@radix-ui/themes';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/userContext.jsx';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
        toast.success("Inicio de sesión exitoso", {
          description: "Bienvenido de nuevo",
        });
      } else {
        await register({ email, password });
        toast.success("Registro exitoso", {
          description: "Tu cuenta ha sido creada. Revisa tu correo para confirmar.",
        });
      }
      //navigate('/profile');
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        description: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Card className="w-full max-w-md glassmorphism border-purple-500/50 shadow-2xl shadow-purple-500/20">
          <CardHeader className="text-center">
            <motion.div 
              className="inline-block p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
            >
              {isLogin ? <LogIn className="h-12 w-12 text-yellow-300" /> : <UserPlus className="h-12 w-12 text-yellow-300" />}
            </motion.div>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </CardTitle>
            <CardDescription className="text-indigo-200">
              {isLogin ? 'Ingresa tus credenciales para acceder.' : 'Completa el formulario para unirte.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-indigo-100 flex items-center">
                    <User className="mr-2 h-4 w-4 text-purple-400" /> Nombre Completo
                  </Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Tu Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-100 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-purple-400" /> Correo Electrónico
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo-100 flex items-center">
                  <Lock className="mr-2 h-4 w-4 text-purple-400" /> Contraseña
                </Label>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                />
              </div>
              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-bold text-lg py-3 shadow-md transform hover:scale-105 transition-transform duration-200">
                {isLogin ? 'Ingresar' : 'Registrarse'}
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-purple-600" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-yellow-300 hover:text-yellow-200">
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
