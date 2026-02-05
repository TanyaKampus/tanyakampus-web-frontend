import { useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Button from "@/components/Button";
import { updateMeService } from "@/services/user.service";
import { toastError, toastSuccess } from "@/components/Toast";
import { getCroppedImg } from "@/utils/cropImage";

interface Props {
  user: any;
}

const ProfileHeader = ({ user }: Props) => {
  if (!user || !user.profile) return null;
  const profile = user.profile;

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const onCropComplete = useCallback((_: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const openPicker = () => fileRef.current?.click();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setSaving(true);
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
      );

      await updateMeService({ foto_profil: croppedFile });

      toastSuccess("Foto profil berhasil disimpan!");
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toastError("Gagal menyimpan foto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile Saya</h1>

      <div className="mt-8 flex gap-6 items-center">
        <img
          src={
            profile.foto_profil ||
            "https://placehold.co/200x200/png?text=Avatar"
          }
          className="w-[168px] h-[168px] rounded-full object-cover"
        />

        <Button
          label="Edit Foto Profil"
          type="button"
          onClick={openPicker}
        />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onSelectFile}
      />

      {imageSrc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-5 w-[380px]">
            <h2 className="font-semibold mb-3">Atur Foto</h2>

            <div className="relative w-full h-[300px] bg-black rounded-lg overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(+e.target.value)}
              className="w-full mt-4"
            />

            <div className="flex gap-3 mt-4 w-full">
              <Button
                label="Batal"
                variant="outline-dark"
                type="button"
                onClick={() => setImageSrc(null)}
                className="w-full"
              />
              <Button
                label={saving ? "Menyimpan..." : "Simpan"}
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
