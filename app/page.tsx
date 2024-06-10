import { FC } from "react";
import Card from "./components/Card";

const Home: FC = () => {
  return (
    <main className="px-[30px]">
      <div>
        <div className="h-[100px] flex items-center text-2xl font-medium justify-between lg:px-[120px]">
          <p>Hello, nFactorial!</p>
        </div>
      </div>
      <div>
        <Card />
      </div>
    </main>
  );
};

export default Home;
