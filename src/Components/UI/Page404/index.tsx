import { NotFound } from "../../../Icons/Backgrounds";
import { Container } from "../../Container";

export const Page404 = () => {
  return (
    <Container numCols={1}>
      <div className="w-2/5 mx-auto">
        <NotFound />
        <h3 className="font-black text-5xl text-center mt-10 mb-5">
          Oh No! Error 404
        </h3>
        <p className="text-xl text-gray-700 text-center">
          We can´t seem to find the page you are looking for
        </p>
      </div>
    </Container>
  );
};
