import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { useState } from "react";
import illustration6 from "../../assets/illustrations/illustration6.svg";
import illustration7 from "../../assets/illustrations/illustration7.svg";
import illustration8 from "../../assets/illustrations/illustration8.svg";
import { IndexTab } from "./index-tab";
import { IndexTabImage } from "./index-tab-image";

const tabsContent = [
  {
    title: "Inbox",
    text: "When it’s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
    img: illustration6,
  },
  {
    title: "Boards",
    text: 'Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!"',
    img: illustration7,
  },
  {
    title: "Planner",
    text: "Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.",
    img: illustration8,
  },
];

export const IndexTabList = () => {
  const [cardState, setCardState] = useState(tabsContent[0].title);
  const handleCardChange = (currentCard: string) => {
    setCardState(currentCard);
  };

  return (
    <div className="bg-secondary xl:bg-white">
      <Tabs
        defaultValue={tabsContent[0].title}
        className="bg-secondary container mx-auto mt-14 box-border flex max-w-6xl flex-col-reverse justify-between space-y-6 rounded-lg py-8 sm:px-12 lg:flex-row lg:space-y-0 xl:mb-12 xl:px-0"
      >
        <TabsList className="flex flex-col space-y-6 lg:max-w-sm">
          {tabsContent.map((tab, i) => (
            <IndexTab
              key={i}
              text={tab.text}
              title={tab.title}
              cardState={cardState}
              handleCardChange={handleCardChange}
            ></IndexTab>
          ))}
        </TabsList>
        <div className="flex w-full justify-center lg:justify-end">
          {tabsContent.map((tab, i) => (
            <IndexTabImage value={tab.title} key={i} src={tab.img} />
          ))}
        </div>
      </Tabs>
    </div>
  );
};
