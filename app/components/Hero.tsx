'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="Home" className="relative py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          &lt; Yaksh /&gt;
        </motion.h1>

        <motion.p
          className="max-w-xl mx-auto text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A Full-Stack Developer with a backend brain and product-focused heart. I craft fast, intelligent tools and thrive in early-stage chaos with clarity, ownership, and speed.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="mailto:yakshp008@gmail.com">
            <Button size="lg">Contact Me</Button>
          </Link>
          <Link href="/Assets/Engineer_Yaksh.pdf" target="_blank">
            <Button variant="outline" size="lg">
              Resume
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="overflow-hidden rounded-2xl shadow-2xl w-full max-w-4xl"
        >
          <Image
            src="/Assets/dev.png"
            alt="Developer"
            width={1200}
            height={500}
            className="w-full h-auto object-cover object-top max-h-[350px]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
