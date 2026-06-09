'use client';

import { MapPinIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import FadeIn from '@/components/FadeIn';

const locations = [
  {
    title: 'Straitgate Nursery & Primary School, Magodo',
    coords: [6.6235553, 3.3744507] as [number, number],
    address: '69 Alh. Bashiru Shittu, Magodo, Lagos',
  },
  {
    title: 'Straitgate Nursery & Primary School, Magboro',
    coords: [6.7029369, 3.4039485] as [number, number],
    address: 'Road D, Forthright Gardens Estate, Magboro, Ogun State',
  },
  {
    title: 'Straitgate College',
    coords: [6.7029319, 3.4008986] as [number, number],
    address: 'Road D, Forthright Gardens Estate, Magboro, Ogun State',
  },
  {
    title: 'Straitgate High School',
    coords: [6.6169311, 3.3695676] as [number, number],
    address: '14 Robert Street, Magodo',
  },
];

const getDirectionsUrl = (coords: [number, number]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
const googleMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  'Straitgate Schools Magodo Magboro Ogun State Lagos Nigeria'
)}&output=embed`;

export default function MapSection() {
  return (
    <section className="bg-[#f8f7f4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-serif text-4xl font-bold leading-tight text-dark sm:text-5xl">
            Visit Our <span className="text-primary">Campuses</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Our schools are spread across Lagos and Ogun State, each offering a warm,
            welcoming environment for learning. Use the map or location cards for directions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <FadeIn direction="left">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {locations.map((loc, i) => (
                <a
                  key={i}
                  href={getDirectionsUrl(loc.coords)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl"
                >
                  <span className="mt-1.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-6 text-dark">{loc.title}</h3>
                    <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-gray-600">
                      <MapPinIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{loc.address}</span>
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-primary transition-colors group-hover:text-primary-dark">
                      Get Directions
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" className="h-[420px] lg:h-full">
            <div className="h-full overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
              <iframe
                title="Google map showing Straitgate Schools campuses"
                src={googleMapSrc}
                className="h-full min-h-[420px] w-full rounded-xl border-0 lg:min-h-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
