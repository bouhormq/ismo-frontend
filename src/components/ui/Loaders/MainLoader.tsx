import Flexbox from "../Flexbox";

const MainLoader = () => {
  return (
    <Flexbox
      fullWidth
      fullHeight
      row
      justify="center"
      className="gap-[50px]"
      align="center"
    >
      <div className="main_loader"></div>
    </Flexbox>
  );
};

export default MainLoader;
