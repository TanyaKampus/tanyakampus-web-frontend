import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileForm from "./components/ProfileForm";
import { getMeService } from "@/services/user.service";

const ProfileIndex = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMeService();
        setUser(res.data);
      } catch (err) {
        console.error("Gagal ambil data user", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return (
      <p className="text-red-500">
        Data profil tidak tersedia. Silakan login ulang.
      </p>
    );
  }

  return (
    <>
      <ProfileHeader user={user} />
      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>
      <ProfileForm />
    </>
  );
};

export default ProfileIndex;
