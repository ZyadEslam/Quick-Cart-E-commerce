"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { team, values } from "../utils/staticData";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <motion.span className="text-orange-500">Our</motion.span> Story
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Crafting exceptional shopping experiences since 2025
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/downloaded/d5.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 underlined-header after:mx-auto"
          >
            Our Mission
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-foreground leading-relaxed text-lg font-medium">
                We&apos;re on a <span className="text-orange font-bold">mission</span> to revolutionize online shopping by
                providing a <span className="italic">seamless, personalized experience</span> that connects
                customers with the products they love.
              </p>
              <p className="text-foreground leading-relaxed text-lg mt-4 font-medium">
                Our commitment to <span className="text-orange">quality</span>, 
                <span className="text-orange"> innovation</span>, and 
                <span className="text-orange"> customer satisfaction</span> 
                drives everything we do.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/downloaded/teamwork.svg"
                alt="Our Mission"
                fill
                className="object-fit object-bottom"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 underlined-header after:mx-auto"
          >
            Our Values
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-4 relative">
                  <Image
                    src={value.icon}
                    alt={value.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 underlined-header after:mx-auto"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeIn} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-orange-500 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for passionate individuals to join our
            team and help shape the future of e-commerce.
          </p>
          <Link
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            href="/contact"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
