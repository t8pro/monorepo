const MAX_DIMENSION = 1600; // Reduced from 2000 for faster processing

const SUPPORTED_EXPORT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const readerUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(readerUrl);
      resolve(image);
    };

    image.onerror = error => {
      URL.revokeObjectURL(readerUrl);
      reject(
        error instanceof Error ? error : new Error('Could not load image'),
      );
    };

    image.src = readerUrl;
  });
};

const getExportType = (originalType: string) => {
  if (SUPPORTED_EXPORT_TYPES.includes(originalType)) {
    return originalType;
  }

  return 'image/jpeg';
};

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality = 0.7, // Further reduced quality for faster uploads
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Image compression failed.'));
        }
      },
      type,
      quality,
    );
  });
};

export const processPhotoForUpload = async (file: File) => {
  const image = await loadImageFromFile(file);
  const { width, height } = image;
  const largestSide = Math.max(width, height);

  // Skip processing if already small enough
  if (largestSide <= MAX_DIMENSION && file.size <= 2 * 1024 * 1024) {
    return {
      file,
      width,
      height,
    } as const;
  }

  // Always compress for size reduction, even if dimensions are OK
  const scale = Math.min(MAX_DIMENSION / largestSide, 1);
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Could not get canvas context.');
  }

  // Optimize canvas settings for better performance
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'medium';

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  const exportType = getExportType(file.type);
  const blob = await canvasToBlob(canvas, exportType);

  const compressedFile = new File([blob], file.name, {
    type: exportType,
    lastModified: Date.now(),
  });

  return {
    file: compressedFile,
    width: targetWidth,
    height: targetHeight,
  } as const;
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file data.'));
    reader.readAsDataURL(file);
  });
};

export const MAX_IMAGE_DIMENSION = MAX_DIMENSION;
