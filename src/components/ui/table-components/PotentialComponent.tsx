import { CompanyPotential } from "$/types/models/company.types";
import { POTENTIALS } from "$/utils/constants/company.constants";
import { cn } from "$/utils/functions/misc.functions";

import Flexbox from "../Flexbox";

type Props = {
  value: CompanyPotential;
  colorClassnames?: {
    textNormal: string;
    bgLight: string;
  };
};

const PotentialComponent = ({ value, colorClassnames }: Props) => {
  const potential = POTENTIALS[value];

  return (
    <Flexbox
      className={cn(
        "w-full min-w-44 rounded-[100px] px-2.5 py-1",
        colorClassnames?.bgLight,
        potential.bgColor,
      )}
    >
      <p
        className={cn(
          "w-full text-center text-sm font-medium mobileScreen:text-xs",
          colorClassnames?.textNormal,
          potential.textColor,
        )}
      >
        {potential.displayText}
      </p>
    </Flexbox>
  );
};

export default PotentialComponent;
