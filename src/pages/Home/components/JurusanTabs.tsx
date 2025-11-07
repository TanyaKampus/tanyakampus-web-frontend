import Button from "@/components/Button";

interface JurusanTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const JurusanTabs: React.FC<JurusanTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10 bg-[#F0F4F7] w-fit m-auto items-center p-2 rounded-xl">
      {tabs.map((tab) => (
        <Button
          key={tab}
          label={tab}
          variant="neutral"
          active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        />
      ))}
    </div>
  );
};

export default JurusanTabs;
