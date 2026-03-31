import { useEffect, useMemo, useState } from "react";

import TickIcon from "$/icons/Ui/TickIcon";
import { cn } from "$/utils/functions/misc.functions";

import { darkenColor } from "../../utils/functions/colors.functions";

type CustomCheckboxProps = {
  color?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  allowColorToDarken?: boolean;
  label?: string;
  isExternallyControlled?: boolean;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  color = "#082559",
  checked = false,
  allowColorToDarken = false,
  label,
  isExternallyControlled,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (onChange) onChange(newCheckedState);
  };

  const newColor = useMemo(
    () => (allowColorToDarken ? darkenColor(color, 25) : color),
    [color, allowColorToDarken],
  );

  useEffect(() => {
    if (!isExternallyControlled) {
      setIsChecked(checked);
    }
  }, [checked, isExternallyControlled]);

  return (
    <label className="flex cursor-pointer items-center justify-center gap-x-2">
      <div
        className={cn(
          "flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-2",
        )}
        style={{
          backgroundColor: isChecked ? newColor : "white",
          borderColor: newColor,
        }}
        onClick={handleCheckboxChange}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
      >
        {isChecked && (
          <TickIcon
            width={14}
            height={14}
            color={color.includes("#000") ? "black" : "white"}
          />
        )}
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};
