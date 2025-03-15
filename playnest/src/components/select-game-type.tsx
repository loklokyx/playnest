import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const GAME_TYPES = ["Mahjong", "Uno"];

type GameTypeProps = {
  selectedType: string | undefined;
  onChange: (role: string) => void;
  className?: string;
};

export function SelectGameType({
  selectedType,
  onChange,
  className,
}: GameTypeProps) {
  const onValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      value={selectedType ? selectedType.toString() : ""}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Game Type" />
      </SelectTrigger>
      <SelectContent>
        {GAME_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
