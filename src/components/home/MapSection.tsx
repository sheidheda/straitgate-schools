'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/FadeIn';

const locations = [
  {
    title: 'Straitgate Nursery & Primary School',
    coords: [6.6235553, 3.3744507] as [number, number],
    address: '69 Alh. Bashiru Shittu, Magodo, Lagos',
  },
  {
    title: 'Straitgate Nursery & Primary School',
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

export default function MapSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="h-[450px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </section>
    );
  }

  return (
    <section>
      <FadeIn>
        <div className="relative">
          <MapInner />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white pointer-events-none" />
        </div>
      </FadeIn>
    </section>
  );
}

function MapInner() {
  const [leaflet, setLeaflet] = useState<{
    MapContainer: typeof import('react-leaflet').MapContainer;
    TileLayer: typeof import('react-leaflet').TileLayer;
    Marker: typeof import('react-leaflet').Marker;
    Popup: typeof import('react-leaflet').Popup;
  } | null>(null);

  useEffect(() => {
    import('react-leaflet').then((mod) => {
      setLeaflet({
        MapContainer: mod.MapContainer,
        TileLayer: mod.TileLayer,
        Marker: mod.Marker,
        Popup: mod.Popup,
      });
    });

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    });
  }, []);

  if (!leaflet) return <div className="h-[450px] bg-gray-100" />;

  const { MapContainer, TileLayer, Marker, Popup } = leaflet;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <MapContainer
        center={[6.66, 3.39]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: '450px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.coords}>
            <Popup>
              <strong>{loc.title}</strong>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
