import ProfileHeader from "./components/ProfileHeader";
import ProfileForm from "./components/ProfileForm";

const ProfileIndex = () => {
  return (
    <>
      <ProfileHeader />
      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>
      <ProfileForm />
    </>
  );
};

export default ProfileIndex;
