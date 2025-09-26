import React, { useState, useCallback } from 'react';
import { PhotoGalleryTable } from '@/components/PhotoGalleryTable';
import { mockPhotos } from '@/data/mockPhotos';
import { Photo } from '@/types/photo';

const BATCH_SIZE = 50;

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos.slice(0, BATCH_SIZE));
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(BATCH_SIZE);

  const loadMore = useCallback(async () => {
    if (isLoading || currentIndex >= mockPhotos.length) return;
    
    setIsLoading(true);
    
    // Simulate network delay for realistic loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextBatch = mockPhotos.slice(currentIndex, currentIndex + BATCH_SIZE);
    setPhotos(prev => [...prev, ...nextBatch]);
    setCurrentIndex(prev => prev + BATCH_SIZE);
    setIsLoading(false);
  }, [isLoading, currentIndex]);

  const hasNextPage = currentIndex < mockPhotos.length;

  return (
    <div className="h-screen w-screen overflow-hidden">
      <PhotoGalleryTable
        photos={photos}
        onLoadMore={loadMore}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
