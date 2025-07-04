export default function About() {
  const team = [
    {
      name: "Eli Stitt",
      role: "CEO",
      description: "Former sharp bettor with 8+ years of experience. Built Sharp Shot to solve his own betting data problems."
    },
    {
      name: "Rowen Solway",
      role: "COO",
      description: "Operations expert focused on scaling systems and ensuring data reliability across all sportsbook integrations."
    },
    {
      name: "Joseph Arbiser",
      role: "CTO",
      description: "Blockchain and fintech veteran. Architected Sharp Shot's high-performance calculation engine and real-time data infrastructure."
    }
  ];

  const values = [
    {
      icon: "fas fa-bullseye",
      title: "Edge",
      description: "Everything we build is designed to give you an advantage."
    },
    {
      icon: "fas fa-crosshairs",
      title: "Precision",
      description: "Accurate data and calculations you can trust."
    },
    {
      icon: "fas fa-shield-check",
      title: "Proof",
      description: "Transparent methodologies and verifiable results."
    },
    {
      icon: "fas fa-users",
      title: "Community",
      description: "Sharps helping sharps get better together."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl tungsten-style mb-6">Built by Sharps, <span className="text-gold">for Sharps</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sharp Shot was built by sharps, for sharps. We were tired of broken tools, fake signals, and half-baked data. So we built a clean, proof-first platform to help you win like a pro.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <i className="fas fa-user text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gold font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-gold text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-charcoal text-white rounded-lg flex items-center justify-center hover:bg-charcoal/80 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
