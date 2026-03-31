import Flexbox from "$/components/ui/Flexbox";
import CalendarIcon from "$/icons/Ui/CalendarIcon";
import { format } from "$/utils/functions/date.functions";

type Props = {
  createdAt: string;
  updatedAt: string;
};

const ShowPageHeaderRightComponent = ({ createdAt, updatedAt }: Props) => {
  const createdAtFormattedDate = format(new Date(createdAt), "dd MMM yyyy");
  const updatedAtFormattedDate = format(new Date(updatedAt), "dd MMM yyyy");

  return (
    <Flexbox
      row
      align="center"
      className="gap-2 tabletScreen:w-full mobileScreen:justify-center"
    >
      <Flexbox
        row
        align="center"
        justify="center"
        className="mobileScreen:custom-10 gap-1 text-xs mobileScreen:items-start"
      >
        <CalendarIcon className="h-3 w-3 shrink-0" />
        <Flexbox row className="flex-wrap gap-1">
          <span className="font-bold">Date Création</span>
          <span className="font-medium text-[#43454E]">
            {createdAtFormattedDate}
          </span>
        </Flexbox>
      </Flexbox>

      <Flexbox className="h-5 w-[1px] bg-[#B4B4B4]" />

      <Flexbox
        row
        align="center"
        justify="center"
        className="mobileScreen:custom-10 gap-1 text-xs mobileScreen:items-start"
      >
        <CalendarIcon className="h-3 w-3 shrink-0" />
        <Flexbox row className="flex-wrap gap-1">
          <span className="font-bold">Dernière modification</span>
          <span className="font-medium text-[#43454E]">
            {updatedAtFormattedDate}
          </span>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default ShowPageHeaderRightComponent;
