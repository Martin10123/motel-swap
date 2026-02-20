import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

interface Room360ViewerProps {
  imageUrl: string;
  autoRotate?: boolean;
  className?: string;
  onLoad?: () => void;
}

export function Room360Viewer({ 
  imageUrl, 
  autoRotate = true,
  className = '',
  onLoad
}: Room360ViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const psvInstance = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Crear instancia del visor
    psvInstance.current = new Viewer({
      container: viewerRef.current,
      panorama: imageUrl,
      navbar: [
        'zoom',
        'move',
        'fullscreen',
      ],
      defaultZoomLvl: 50,
      mousewheel: true,
      mousemove: true,
      fisheye: true,
      lang: {
        zoom: 'Zoom',
        zoomOut: 'Alejar',
        zoomIn: 'Acercar',
        move: 'Mover',
        fullscreen: 'Pantalla completa',
      },
    });

    // Auto-rotación
    if (autoRotate) {
      psvInstance.current.animate({
        yaw: '2rpm',
        speed: '2rpm'
      });
    }

    // Callback cuando carga
    psvInstance.current.addEventListener('ready', () => {
      onLoad?.();
    });

    // Cleanup
    return () => {
      if (psvInstance.current) {
        psvInstance.current.destroy();
        psvInstance.current = null;
      }
    };
  }, [imageUrl, autoRotate, onLoad]);

  return (
    <div 
      ref={viewerRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '500px' }}
    />
  );
}
