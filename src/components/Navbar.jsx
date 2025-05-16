import React from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button, Avatar } from "@radix-ui/themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import {
  LogIn,
  LogOut,
  User,
  Briefcase,
  LayoutDashboard,
  Search,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/userContext.jsx";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
              <Briefcase size={32} className="text-yellow-400" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">
              HorizonteProfesional
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/services">Servicios</NavLink>
            {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar
                      className="cursor-pointer h-10 w-10 border-2 border-yellow-400"
                      src={user.avatarUrl || ""}
                      fallback={user.email ? user.email[0].toUpperCase() : "U"}
                    />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4 mt-2 glassmorphism border-purple-400">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-300" />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="hover:bg-purple-500/20"
                  >
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin")}
                      className="hover:bg-purple-500/20"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-purple-400" />
                      <span>Panel Admin</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-purple-300" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:!text-red-400 hover:!bg-red-500/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/auth")}
                  variant="secondary"
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-semibold"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Ingresar
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-lg font-medium text-yellow-300 hover:text-white transition-colors duration-200 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
  </Link>
);

export default Navbar;
