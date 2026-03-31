import BoxesLayout from "$/components/common/BoxesLayout";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import Flexbox from "$/components/ui/Flexbox";
import PriceIcon from "$/icons/Ui/PriceIcon";

const ArticlePricesBox = () => {
  return (
    <BoxesLayout
      className="w-full min-w-[300px] flex-grow tabletScreen:min-w-[unset] smallTabletScreen:flex-grow"
      icon={<PriceIcon />}
      title="Prix"
    >
      <Flexbox fullWidth row className="flex-col gap-x-2 gap-y-4">
        <Flexbox
          fullWidth
          row
          className="gap-x-2 gap-y-4 mobileScreen:flex-col"
        >
          <FormStyledTextinput
            name="purchasePriceWithoutTVA"
            label="Prix d’Achat (HT)"
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] mobileScreen:flex-grow mobileScreen:w-full"
            className="bg-[#FFE4F3]"
            labelClassName="text-[#43454E] font-normal"
            type="number"
          />
          <FormStyledTextinput
            label="HS Code"
            name="HSCode"
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] mobileScreen:flex-grow mobileScreen:w-full"
          />
        </Flexbox>

        <FormStyledTextinput
          name="marginRate"
          label="Taux de Marge"
          type="number"
          labelWrapperClassName="!min-w-unset w-full"
        />
        <FormStyledTextinput
          name="sellingPriceWithoutTVA"
          label="Prix de Vente (HT)"
          className="bg-[#D1FFD3]"
          labelClassName="text-[#43454E] font-normal"
          labelWrapperClassName="!min-w-unset w-full"
          type="number"
        />
        <FormStyledTextinput
          name="sellingPriceWithTVA"
          label="Prix de Vente (TTC)"
          type="number"
          labelWrapperClassName="!min-w-unset w-full"
        />
        <FormStyledTextinput
          name="purchasePriceWithTVA"
          label="Prix d’Achat (TTC)"
          type="number"
          labelWrapperClassName="!min-w-unset w-full"
        />
      </Flexbox>
    </BoxesLayout>
  );
};

export default ArticlePricesBox;
