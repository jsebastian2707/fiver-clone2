import { Button } from "@radix-ui/themes";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router";
import { ArrowRight, Search, Users, Briefcase } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="space-y-16">
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="text-center py-20 px-6 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-700 to-blue-700 shadow-2xl"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Bienvenido a HorizonteProfesional
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Conecta con profesionales talentosos o muestra tus habilidades al
          mundo. Encuentra y ofrece servicios de calidad.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-x-4"
        >
          <Button
            size="lg"
            onClick={() => navigate("/services")}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Explorar Servicios <Search className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-700 font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Únete Ahora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Search size={48} className="text-purple-400" />,
            title: "Encuentra Expertos",
            description:
              "Busca entre una amplia gama de servicios y profesionales calificados.",
          },
          {
            icon: <Briefcase size={48} className="text-green-400" />,
            title: "Ofrece Tus Servicios",
            description:
              "Crea tu perfil, publica tus servicios y alcanza nuevos clientes.",
          },
          {
            icon: <Users size={48} className="text-blue-400" />,
            title: "Comunidad Confiable",
            description:
              "Valoraciones y comentarios para asegurar la calidad y confianza.",
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-8 rounded-xl glassmorphism border-purple-500/30 shadow-xl hover:shadow-purple-500/30 transition-shadow duration-300"
          >
            <div className="flex justify-center mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-center text-yellow-300 mb-3">
              {feature.title}
            </h3>
            <p className="text-center text-indigo-200">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="text-center py-16">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 mb-8">
          ¿Listo para empezar?
        </h2>
        <img
          class="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-8"
          alt="Collage de profesionales trabajando"
          src="https://images.unsplash.com/photo-1492448497576-45b1efcdc02c"
        />
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-lg px-10 py-6 shadow-lg transform hover:scale-105 transition-transform duration-200"
        >
          Regístrate Gratis
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
