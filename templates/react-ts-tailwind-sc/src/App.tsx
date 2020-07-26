import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface AppProps {}

const StyledButton = styled.button.attrs({ className: "btn btn-gray" })`
  ${tw`hover:text-red-400`}
`;

const App: React.FC<AppProps> = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Your most simple react app</h1>
      <div>
        <p>{count}</p>
        <StyledButton onClick={() => setCount((c) => c + 1)}>+</StyledButton>
        <StyledButton onClick={() => setCount((c) => c - 1)}>-</StyledButton>
      </div>
    </div>
  );
};

export default App;
