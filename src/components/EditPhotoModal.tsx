import Cropper from "react-easy-crop";
import { useState } from "react";
import Button from "@/components/Button";

interface Props {
  image: string;
  onCancel: () => void;
  onSave: (file: File) => void;
}

const EditPhotoModal = ({ image, onCancel, onSave }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });

  const getCroppedImg = async () => {
    const img = await createImage(image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        resolve(new File([blob], "profile.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    const file = await getCroppedImg();
    onSave(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px]">
        <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4 flex items-center justify-center w-full gap-3">
          <Button label="Batal" variant="outline-dark" onClick={onCancel} className="w-full"/>
          <Button label="Simpan" variant="solid-dark" onClick={handleSave} className="w-full"/>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoModal;
