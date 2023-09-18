import Form from "./form";
import Router from "next/router";

export default function Home() {
    const handleButtonClick = () => {
        // Use Router.push to navigate to the "Form" component
        Router.push("/form");
    };

    return (
        <>
            <div>
                <button onClick={handleButtonClick}>Best of Three</button>
            </div>
            
            <div>
                <button onClick={handleButtonClick}>Infinite Game</button>
            </div>
        </>
    );
}
