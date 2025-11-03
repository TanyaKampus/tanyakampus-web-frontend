import LogoItem from "./LogoItem";

const Footer = () => {
  return (
    <footer className="w-full py-6 px-8 bg-gradient-to-tr from-primary-300 to-primary-100 flex items-center justify-between text-neutral-white text-sm">
      <LogoItem />
      <p className="font-semibold">© 2025 TanyaKampus</p>
    </footer>
  );
};

export default Footer;
