import { TabsContent } from "../ui/tabs";

interface IndexTabImageProps {
  value: string;
  src: string;
}

export const IndexTabImage = ({ value, src }: IndexTabImageProps) => {
  return (
    <TabsContent value={value} className="flex items-center justify-center">
      <div className="h-full w-full rounded-md">
        <div className="aspect-[16/9] w-full">
          <img src={src} alt={value} className="h-full w-full object-contain" />
        </div>
      </div>
    </TabsContent>
  );
};
