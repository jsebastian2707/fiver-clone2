import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast.jsx";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Simulate login
        login({ email });
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo!",
        });
      } else {
        // Simulate registration
        register({ name, email, password });
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada.",
        });
      }
      navigate("/profile");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Próximamente",
      description: "El inicio de sesión con Google estará disponible pronto.",
    });
    // Here you would typically initiate Supabase Google OAuth
    // For now, it's just a placeholder
    // Example: const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    // if (error) toast({ variant: "destructive", title: "Error", description: error.message });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Card className="w-full max-w-md glassmorphism border-purple-500/50 shadow-2xl shadow-purple-500/20">
          <CardHeader className="text-center">
            <motion.div
              className="inline-block p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatType: "mirror",
              }}
            >
              {isLogin ? (
                <LogIn className="h-12 w-12 text-yellow-300" />
              ) : (
                <UserPlus className="h-12 w-12 text-yellow-300" />
              )}
            </motion.div>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </CardTitle>
            <CardDescription className="text-indigo-200">
              {isLogin
                ? "Ingresa tus credenciales para acceder."
                : "Completa el formulario para unirte."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-indigo-100 flex items-center"
                  >
                    <User className="mr-2 h-4 w-4 text-purple-400" /> Nombre
                    Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-indigo-100 flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4 text-purple-400" /> Correo
                  Electrónico
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
                <Label
                  htmlFor="password"
                  className="text-indigo-100 flex items-center"
                >
                  <Lock className="mr-2 h-4 w-4 text-purple-400" /> Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-purple-900/30 border-purple-600 placeholder-purple-400/70 text-white focus:border-yellow-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-bold text-lg py-3 shadow-md transform hover:scale-105 transition-transform duration-200"
              >
                {isLogin ? "Ingresar" : "Registrarse"}
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-purple-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-indigo-300 rounded-md">
                    O continuar con
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-purple-600 text-indigo-100 hover:bg-purple-700/50 hover:text-white"
                onClick={handleGoogleSignIn}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 381.7 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.6 244 11.6C381.7 11.6 488 120.5 488 261.8zM100.2 261.8c0 25.4 4.9 49.2 13.6 70.8l124.2-124.2V261.8H100.2zM244 500c36.5 0 70.3-7.8 99.8-21.3L238.6 354.4 176.8 419c-27.3 19.9-60.2 32.3-96.2 32.3-1.3 0-2.7-.1-4-.1 33.7 30.1 76.3 48.7 123.4 48.7zM400.9 374.8c26.7-30.4 42.5-69.3 42.5-113 0-11.3-1.1-22.4-3.2-33.2L289.6 278.6l111.3 96.2zM244 12.9c-36.5 0-70.3 7.8-99.8 21.3L250.4 158.6l61.8-64.8c27.3-19.9 60.2-32.3 96.2-32.3 1.3 0 2.7.1 4 .1-33.7-30.1-76.3-48.7-123.4-48.7z"
                  ></path>
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-300 hover:text-yellow-200"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia Sesión"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
