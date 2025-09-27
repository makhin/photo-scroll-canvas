import { Photo } from '@/types/photo';

// Используем placeholder изображения для демонстрации
const sampleImages = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2', 
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4'
];

const mockPhotos: Photo[] = Array.from({ length: 1000 }, (_, index) => {
  const sampleImage = sampleImages[index % 4];
  
  const sampleCaptions = [
    'Beautiful sunset over the mountain lake',
    'Urban life in the golden hour',
    'Macro details of nature\'s beauty',
    'Modern architecture meets the sky',
    'Street photography at its finest',
    'Serene landscape composition',
    'Abstract architectural patterns',
    'Natural light and shadows',
    'Colorful urban environment',
    'Peaceful nature scene'
  ];

  const sampleTags = [
    ['landscape', 'sunset', 'nature'],
    ['street', 'urban', 'people'],
    ['macro', 'butterfly', 'flower'],
    ['architecture', 'modern', 'glass'],
    ['portrait', 'studio', 'professional'],
    ['travel', 'vacation', 'memories'],
    ['wildlife', 'outdoor', 'adventure'],
    ['food', 'delicious', 'cooking'],
    ['technology', 'gadget', 'modern'],
    ['art', 'creative', 'inspiration']
  ];

  const samplePeople = [
    ['John Doe', 'Jane Smith'],
    ['Alice Johnson'],
    [],
    ['Bob Wilson', 'Carol Brown', 'David Lee'],
    ['Emma Davis'],
    ['Frank Miller', 'Grace Taylor'],
    [],
    ['Henry Clark', 'Ivy Lewis'],
    ['Jack Hall'],
    ['Kate Young', 'Liam King']
  ];

  const sampleFlags = [
    ['favorite', 'edited'],
    ['private'],
    ['public', 'featured'],
    ['draft'],
    ['favorite', 'shared'],
    ['archived'],
    ['favorite', 'public'],
    ['private', 'edited'],
    ['featured'],
    ['shared', 'favorite']
  ];

  const baseDate = new Date('2024-01-01');
  const randomDays = Math.floor(Math.random() * 365);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  
  const takenDate = new Date(baseDate);
  takenDate.setDate(baseDate.getDate() + randomDays);
  takenDate.setHours(randomHours, randomMinutes);

  return {
    id: `photo-${index + 1}`,
    thumbnail: sampleImage,
    path: `/photos/2024/${String(index + 1).padStart(4, '0')}_IMG_${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}.jpg`,
    caption: sampleCaptions[index % sampleCaptions.length],
    takenDate,
    tags: sampleTags[index % sampleTags.length],
    peoples: samplePeople[index % samplePeople.length],
    flags: sampleFlags[index % sampleFlags.length],
  };
});

export { mockPhotos };