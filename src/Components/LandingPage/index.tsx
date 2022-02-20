import { Link } from "wouter";
import { Background1 } from "../../Icons/Backgrounds";
import { Container } from "../Container";

export const LandingPage = () => {
  return (
    <Container numCols={2}>
      <div className="col-span-2 lg:col-span-1 h-full flex justify-center text-center lg:text-left items-center flex-col">
        <div className="w-9/12 space-y-5">
          <h1 className="text-6xl font-black text-black">J-MarkEditor</h1>
          <h2 className="text-4xl font-black text-black">
            Unmatched typing experience
          </h2>

          <p className="text-2xl text-gray-500">
            Save your own markdown drafts without registering, without having an
            account. Totally open source!
          </p>
        </div>
        <div className="w-9/12 flex justify-center lg:justify-start">
          <Link
            href="/new"
            className="inline-block mt-20 cursor-pointer transition easy-in-out duration-300 bg-blue-400 hover:bg-blue-600 text-white font-medium p-4 rounded-full"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 h-full flex justify-center items-center">
        <div className="w-3/5">
          <Background1 />
        </div>
      </div>
    </Container>
  );
};
