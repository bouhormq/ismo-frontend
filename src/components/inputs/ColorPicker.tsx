import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useOutsideClick from "$/hooks/useOutsideClick";
import { cn } from "$/utils/functions/misc.functions";

import Flexbox from "../ui/Flexbox";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const ColorPicker = ({ value, onChange, disabled }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [showPicker, setShowPicker] = useState(false);

  useOutsideClick(ref, () => setShowPicker(false));

  return (
    <Flexbox ref={ref} className={cn("relative")}>
      <div
        className={cn("h-6 w-6 cursor-pointer rounded-md", {
          "!cursor-not-allowed opacity-70": disabled,
        })}
        style={{ backgroundColor: value ?? "#00000050" }}
        onClick={() => (disabled ? undefined : setShowPicker((prev) => !prev))}
      />

      {showPicker && (
        <div className="absolute top-full z-[100] mt-1 mobileScreen:-left-[300%]">
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </Flexbox>
  );
};
