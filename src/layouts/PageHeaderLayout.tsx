import { ReactNode, useRef } from "react";

import Flexbox from "$/components/ui/Flexbox";
import PageHeader from "$/components/ui/PageHeader";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  headerText: string;
  handleGoBack?: VoidFunction;
  children?: ReactNode;
  headerRightContent?: ReactNode;
  subtitle?: string;
  containerClassName?: string;
};

const PageHeaderLayout = ({
  headerText,
  handleGoBack,
  children,
  subtitle,
  containerClassName,
  headerRightContent,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flexbox ref={ref} fullWidth fullHeight className={cn(containerClassName)}>
      <PageHeader
        headerText={headerText}
        handleGoBack={handleGoBack}
        rightContent={headerRightContent}
        subtitle={subtitle}
        containerRef={ref}
      />

      <Flexbox
        fullWidth
        fullHeight
        className="h-fit px-4 py-2 mobileScreen:px-2 mobileScreen:pt-5"
      >
        {children}
      </Flexbox>
    </Flexbox>
  );
};

export default PageHeaderLayout;
