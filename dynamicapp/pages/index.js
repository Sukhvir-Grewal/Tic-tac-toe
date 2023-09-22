import { Card, CardGroup } from "react-bootstrap";
import Router from "next/router";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <div
                    // style={{
                    //     position: "relative",
                    //     top: "4vh",
                    //     fontSize:"20px"
                    // }}
                >
                    Select A Game Mode
                </div>
                <CardGroup 
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "10vh",
                    }}
                >
                    <Link href="/form" gameMode="BOT">
                        <Card className="SelectGameModeCard">
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                <Card.Text>Best of Three</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link href="/form" gameMode="IG">
                        <Card className="SelectGameModeCard">
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
