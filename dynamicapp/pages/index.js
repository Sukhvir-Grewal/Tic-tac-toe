import { Card, CardGroup } from "react-bootstrap";
import Router from "next/router";
import Link from "next/link";

export default function Home() {
    const handleButtonClick = () => {
        // Use Router.push to navigate to the "Form" component
        Router.push("/form");
    };

    return (
        <>
            <div>
                <CardGroup style={{ alignItems: "center", justifyContent:"center", position:"relative", top:"10vh" }}>
                    <Link href="/form" gameMode="BOT">
                        <Card style={{ width: "300px", height: "400px", marginRight:"5px" }}>
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                <Card.Text>Best of Three</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link href="/form" gameMode="IG">
                        <Card style={{ width: "300px", height: "400px", marginLeft:"5px" }}>
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                <Card.Text>Infinite Game</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </CardGroup>
            </div>
        </>
    );
}
