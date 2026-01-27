import Button from "@/components/Button";

interface Props {
  user: any;
}

const ProfileHeader = ({ user }: Props) => {
  if (!user || !user.profile) return null;

  const profile = user.profile;

  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Profile Saya</h1>
      <p className="text-lg text-[#BDBDBD] mt-4">
        Pastikan identitas sesuai dengan dirikamu yaa
      </p>

      <p className="font-semibold text-2xl mt-8">Photo Profile</p>

      <div className="mt-8 flex items-center gap-5">
        <img
          src={
            profile.foto_profil
              ? profile.foto_profil
              : "https://placehold.co/200x200/png?text=Avatar"
          }
          alt="profile"
          className="w-[168px] h-[168px] rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-lg">
            {profile.nama || "-"}
          </p>
          <Button label="Edit Profile" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
