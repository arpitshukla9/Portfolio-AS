import React from "react";

const Skills = () => {
  const skillsData = [
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/javascript.png",
      title: "JavaScript",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/react.png",
      title: "React",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/typescript.png",
      title: "TypeScript",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/node_js.png",
      title: "Node.js",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/express.png",
      title: "Express",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/redux.png",
      title: "Redux",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/next_js.png",
      title: "Next.js",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/java.png",
      title: "Java",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/python.png",
      title: "Python",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/postgresql.png",
      title: "PostgreSQL",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/mysql.png",
      title: "MySQL",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/redis.png",
      title: "Redis",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/mongodb.png",
      title: "MongoDB",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/docker.png",
      title: "Docker",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/kubernetes.png",
      title: "Kubernetes",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/gcp.png",
      title: "Google Cloud",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/kafka.png",
      title: "Kafka",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/git.png",
      title: "Github",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
            My Lab
          </h2>
          <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-lg sm:text-xl text-gray-800">
            Tools I use to build exceptional products
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
          {skillsData.map((skill) => (
            <div
              key={skill.title}
              className="group relative h-28 sm:h-32 md:h-36 lg:h-40 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/30 hover:backdrop-blur-xl"
            >
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full flex flex-col items-center justify-center p-2 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={skill.icon}
                    alt={skill.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-medium sm:font-semibold text-gray-800 text-center">
                  {skill.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;