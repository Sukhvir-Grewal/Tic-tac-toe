import Head from "next/head";
import { Inter } from "next/font/google";
// I am gonna to use this for my main styling for future
import styles from "@/styles/Home.module.css";

//This will be used by form
import { useForm } from "react-hook-form";
import Game from "@/components/game";
import { useState } from "react";
import { Button } from "react-bootstrap";

const inter = Inter({ subsets: ["cyrillic"] });

export default function Home() {
    const [isSubmitted, setIsSubmitted] = useState(true);
    const [data, setData] = useState({});

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            Player1: "",
            Player2: "",
        },
    });

    function submitForm(data) {
        setData(data);
        setIsSubmitted(true);
    }
    return (
        <>
            <Head>
                <title>Tic Tac Toe</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1 , maximum-scale=1"
                />
            </Head>

            {isSubmitted ? (
                <Game Player1={data.Player1} Player2={data.Player2} setIsSubmitted={setIsSubmitted} setValue={setValue}></Game>
            ) : (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className={styles.touchAnimation}>
                            Player 1 :{" "}
                            <input {...register("Player1")} required></input>
                        </div>
                        <br />

                        <div className={styles.touchAnimation}>
                            Player 2 :{" "}
                            <input {...register("Player2")} required></input>
                        </div>
                        <br />

                        <div className={styles.playButton}>
                            <Button type="submit">Play</Button>
                        </div>
                        <br />
                    </form>
                </div>
            )}
        </>
    );
}
