import { Shield, Users, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All listings go through a verification process to ensure authenticity and safety.",
    },
    {
      icon: Users,
      title: "No Brokers",
      description: "Direct contact between students and owners. No middlemen, no commission.",
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find PGs near your college with our advanced location-based search.",
    },
    {
      icon: Heart,
      title: "Student-Focused",
      description: "Built by students, for students. We understand your needs and budget constraints.",
    },
  ];

  const team = [
    {
      name: "Harshit Saxena",
      role: "Co-Founder & CEO",
      description: "The visionary mind behind the idea and the core developer of our platform, leading innovation and transforming challenges into impactful solutions for students.",
      image: "/founders/owner.jpg", // Add your founder photo here
      linkedin: "https://www.linkedin.com/in/harshit-saxena-8540b5367", // Optional
    },
    {
      name: "Aryan Parmar",
      role: "Chief business analyst",
      description: "Strategic thinker shaping data-driven decisions, turning insights into opportunities and helping craft impactful solutions that truly serve students.",
      image: "/founders/Aryan photo.jpg", // Add your founder photo here
      linkedin: "https://linkedin.com/in/founder3", // Optional
    },
    {name: "Snehal Chetry",
      role: "Financier",
      description: "Financial strategist empowering sustainable growth, providing essential guidance and support to drive scalable and high-impact solutions for students.",
      image: "/founders/snehal photo.jpg", // Add your founder photo here
      linkedin: "https://www.linkedin.com/in/harshit-saxena-8540b5367", // Optional
    },
    {
     name: "Zishan Ahmad",
      role: "Co-Founder & Manager",
      description: "Dedicated to making student life easier and more affordable.",
      image: "/founders/zishan photo.jpg", // Add your founder photo here
      linkedin: "https://linkedin.com/in/founder2", // Optional 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GharKaAdda</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We're on a mission to make finding the perfect student accommodation easy, safe, and affordable.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                GharKaAdda was born out of a simple observation: finding a PG or room as a student
                is unnecessarily complicated, expensive, and often involves dealing with brokers
                who charge hefty commissions.
              </p>
              <p>
                We set out to change that by creating a platform that connects students directly
                with PG owners, eliminating the middleman and making the process transparent,
                affordable, and stress-free.
              </p>
              <p>
                Our platform ensures that all listings are verified, making it safe for students
                to find their perfect stay. We believe every student deserves a comfortable,
                safe, and affordable place to call home during their college years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-xl mb-8 text-gray-200">
            Whether you're a student looking for a place or an owner with a property to list,
            we'd love to have you on board.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="bg-accent text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Find Your Stay
            </Link>
            <Link
              href="/auth/signup?role=owner"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your PG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

