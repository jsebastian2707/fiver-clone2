
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { Users, Briefcase, DollarSign, AlertTriangle } from 'lucide-react';

    const AdminDashboardPage = () => {
      // Placeholder data
      const stats = [
        { title: "Usuarios Registrados", value: "1,250", icon: <Users className="h-8 w-8 text-blue-400" />, color: "blue" },
        { title: "Servicios Activos", value: "870", icon: <Briefcase className="h-8 w-8 text-green-400" />, color: "green" },
        { title: "Ingresos Totales (Mes)", value: "$12,500", icon: <DollarSign className="h-8 w-8 text-yellow-400" />, color: "yellow" },
        { title: "Reportes Pendientes", value: "5", icon: <AlertTriangle className="h-8 w-8 text-red-400" />, color: "red" },
      ];

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 mb-8">
            Panel de Administración
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className={`glassmorphism border-${stat.color}-500/50 shadow-lg shadow-${stat.color}-500/20`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium text-${stat.color}-300`}>{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold text-${stat.color}-200`}>{stat.value}</div>
                    <p className={`text-xs text-${stat.color}-400`}>+20.1% desde el último mes</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glassmorphism border-purple-500/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-yellow-300">Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-200">Aquí podrás ver, editar y gestionar todos los usuarios registrados. (Funcionalidad en desarrollo)</p>
                {/* Placeholder for user list or management tools */}
              </CardContent>
            </Card>
            <Card className="glassmorphism border-purple-500/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-yellow-300">Gestión de Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-200">Visualiza, aprueba o elimina servicios ofrecidos por los usuarios. (Funcionalidad en desarrollo)</p>
                {/* Placeholder for service list or management tools */}
              </CardContent>
            </Card>
          </div>
           <p className="text-center text-indigo-300 text-lg mt-8">
            Más funcionalidades del panel de administración, como la gestión de pagos y disputas, se implementarán próximamente.
          </p>
        </motion.div>
      );
    };

    export default AdminDashboardPage;
  