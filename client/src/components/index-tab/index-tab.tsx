import { TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface IndexTabProps {
  handleCardChange: (title: string) => void;
  text: string;
  title: string;
  cardState: string;
}

export const IndexTab = ({
  handleCardChange,
  title,
  text,
  cardState,
}: IndexTabProps) => {
  return (
    <TabsTrigger value={title} onClick={() => handleCardChange(title)}>
      <Card
        className={`relative mx-4 flex flex-col items-baseline -space-y-4 overflow-hidden rounded-lg sm:ml-2 ${
          cardState === title && "shadow-xl"
        }`}
      >
        {cardState === title && (
          <div className="bg-primary absolute top-0 left-0 h-full w-2" />
        )}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-left text-sm">{text}</p>
        </CardContent>
      </Card>
    </TabsTrigger>
  );
};
