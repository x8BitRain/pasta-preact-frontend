/* eslint-disable */
import { FunctionalComponent, h } from "preact";
import Testing from "./testing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

const App: FunctionalComponent = () => {
	let currentUrl: string;

    return (
        <div id="app">
            <p>TEST</p>
						<Testing />
        </div>
    );
};

export default App;
