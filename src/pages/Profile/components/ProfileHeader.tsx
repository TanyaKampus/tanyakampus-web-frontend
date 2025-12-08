import Button from "@/components/Button";

const ProfileHeader = () => {
  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Profile Saya</h1>
      <p className="text-lg text-[#BDBDBD] mt-4">
        Pastikan identitas sesuai dengan dirikamu yaa
      </p>

      <p className="font-semibold text-2xl mt-8">Photo Profile</p>

      <div className="mt-8 flex items-center gap-5">
        <img
          src="https://placehold.co/200x200/png?text=Avatar"
          alt="profile"
          className="w-[168px] h-[168px] rounded-full object-cover"
        />
        <Button label="Edit Profile"/>
      </div>
    </div>
  );
};

export default ProfileHeader;
