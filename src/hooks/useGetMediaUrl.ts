import { useEffect, useState } from "react";

export default function useGetMediaUrl(
  media: string | File | null | undefined,
) {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!media) return;

    if (media instanceof File) {
      const innerUrl = URL.createObjectURL(media);
      setMediaUrl(innerUrl);

      return () => {
        URL.revokeObjectURL(innerUrl);
      };
    }

    const isValidUrl = media.startsWith("http") && !!new URL(media);

    if (isValidUrl) {
      setMediaUrl(media);
    }

    if (media.startsWith("blob:")) {
      setMediaUrl(media);
    }
  }, [media]);

  return mediaUrl;
}
