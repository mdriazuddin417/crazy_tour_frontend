import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Heart, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About LocalGuide - Connecting Travelers with Local Experts',
  description:
    'Learn about our mission to connect travelers with passionate local guides for authentic experiences.',
};

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-linear-to-b from-teal-50 to-white'>
      {/* Hero Section */}
      <section className='relative px-4 py-20 sm:py-28 overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-r from-teal-600/10 to-purple-600/10' />
        <div className='max-w-6xl mx-auto relative z-10'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-center'>
            Our Story:{' '}
            <span className='text-teal-600'>Authentic Travel Experiences</span>
          </h1>
          <p className='text-lg text-gray-600 text-center max-w-2xl mx-auto'>
            We believe travel should be more than just visiting landmarks.
            It&apos;s about connecting with local communities, understanding
            different cultures, and creating memories that last a lifetime.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className='px-4 py-16 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Mission */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Our Mission
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                To democratize travel experiences by connecting passionate local
                guides with curious travelers around the world. We empower
                locals to monetize their knowledge while enabling travelers to
                discover authentic, off-the-beaten-path experiences.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Every tour is a bridge between cultures—where locals share their
                expertise and travelers gain genuine insights into the
                destinations they explore.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Our Vision
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                A world where every traveler can experience authentic local
                perspectives, and every passionate local can share their
                knowledge with the world.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                We&apos;re building a platform where geography becomes
                irrelevant, and human connection transcends borders. Through
                LocalGuide, wanderlust meets expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className='px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Our Core Values
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                icon: <Heart className='w-8 h-8' />,
                title: 'Authenticity',
                desc: 'We prioritize genuine, unfiltered experiences over commercialized tourism',
              },
              {
                icon: <Users className='w-8 h-8' />,
                title: 'Community',
                desc: 'We believe in building meaningful connections between travelers and locals',
              },
              {
                icon: <Award className='w-8 h-8' />,
                title: 'Quality',
                desc: 'Every guide is verified and committed to delivering exceptional experiences',
              },
              {
                icon: <MapPin className='w-8 h-8' />,
                title: 'Accessibility',
                desc: 'Travel experiences should be accessible to everyone, regardless of budget',
              },
            ].map((value) => (
              <Card
                key={value.title}
                className='text-center border-teal-100 hover:border-teal-300 transition'
              >
                <CardContent className='pt-8'>
                  <div className='flex justify-center mb-4 text-teal-600'>
                    {value.icon}
                  </div>
                  <h3 className='font-bold text-lg mb-2 text-gray-900'>
                    {value.title}
                  </h3>
                  <p className='text-sm text-gray-600'>{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className='px-4 py-16 bg-teal-600 text-white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Our Impact</h2>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {[
              { number: '50K+', label: 'Travelers Connected' },
              { number: '10K+', label: 'Local Guides' },
              { number: '200+', label: 'Cities Worldwide' },
              { number: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-4xl font-bold mb-2'>{stat.number}</div>
                <p className='text-teal-100'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='px-4 py-16 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Meet Our Team
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                name: 'Sarah Chen',
                role: 'Co-Founder & CEO',
                desc: 'Former travel journalist passionate about authentic storytelling and cultural exchange.',
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Co-Founder & CTO',
                desc: 'Tech entrepreneur dedicated to building platforms that empower local communities.',
              },
              {
                name: 'Aisha Patel',
                role: 'Head of Community',
                desc: 'Community builder and guide advocate working to ensure fair treatment and support for all guides.',
              },
            ].map((member) => (
              <Card key={member.name} className='text-center'>
                <CardContent className='p-6'>
                  <div className='w-20 h-20 rounded-full bg-linear-to-br from-teal-400 to-teal-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg text-gray-900'>
                    {member.name}
                  </h3>
                  <p className='text-teal-600 font-medium mb-3'>
                    {member.role}
                  </p>
                  <p className='text-sm text-gray-600'>{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            Join Our Community
          </h2>
          <p className='text-lg text-gray-600 mb-8'>
            Whether you&apos;re a traveler seeking authentic experiences or a
            local wanting to share your city, we&apos;d love to have you on
            board.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/register?role=tourist'>
              <Button size='lg' className='bg-teal-600 hover:bg-teal-700 px-8'>
                Start Exploring
              </Button>
            </Link>
            <Link href='/register?role=guide'>
              <Button
                size='lg'
                variant='outline'
                className='px-8 bg-transparent'
              >
                Become a Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
