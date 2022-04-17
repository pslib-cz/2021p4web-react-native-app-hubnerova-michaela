
import { StyleSheet, Text, View, Vibration, Image, Button, Linking } from "react-native";
import { useState, useEffect } from "react";

import Gyros from "./components/Gyros";
import Accel from "./components/Accel";
import Batter from "./components/Batter";

import * as Speech from "expo-speech";

export default function App() {
	const [sound, setSound] = useState(true);
	const [cookieState, setCookieState] = useState();
	const [fortuneMessage, setFortuneMessage] = useState("");

	const [speed, setSpeed] = useState(0);
	const [battery, setBattery] = useState(0);

	const switchSound = () => {
		setSound(!sound);
	}

	const openRecipe = () => {
		Linking.openURL("https://www.igurmet.cz/recepty/chutovky-predkrmy/cinske-susenky-stesti-6082/");
	}

	const shakeDetected = () => {
		setCookieState(true);
	}

	useEffect(() => {
		if (cookieState === true) {
			openFortune();
		}
	}, [cookieState]);

	const speedChanged = (_speed) => {
		setSpeed(_speed);
	}

	const batteryChanged = (_battery) => {
		setBattery(_battery);
	}

	const openFortune = () => {
		if (sound === true) Speech.speak("Křup");
		Vibration.vibrate();

		const order = (Math.floor(battery * 100) + Math.floor(speed * 100)) % fortunes.length - 1;

		setFortuneMessage(fortunes[order]);
		if (sound === true) Speech.speak(fortunes[order]);
	}

	const closeFortune = () => {
		setCookieState(false);
		setFortuneMessage("");
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<View style={styles.button}>
					<Button title="Recept" color={"black"} onPress={openRecipe}></Button>
				</View>
				<View style={styles.button}>
					<Button title={sound ? "Vypnout zvuk" : "Zapnout zvuk"} color={sound ? "black" : "gray"} onPress={switchSound}></Button>
				</View>
			</View>

			<View style={styles.fortune}>
				{cookieState
					? <Image style={styles.fortuneImage} source={require(`./assets/fortunecookie_broken.png`)} />
					: <Image style={styles.fortuneImage} source={require(`./assets/fortunecookie_whole.png`)} />
				}
				<Text style={styles.cookieText}>{fortuneMessage}</Text>
			</View>

			<View style={styles.footer}>
				<View style={styles.button}>
					<Button title="Nová sušenka" color={"black"} onPress={closeFortune}></Button>
				</View>
				<Text style={styles.footerText}>Zatřeste telefonem</Text>
			</View>


			<Accel shakeDetected={shakeDetected}></Accel>
			<Batter batteryChanged={batteryChanged}></Batter>
			<Gyros speedChanged={speedChanged}></Gyros>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "space-between",
	},

	buttons: {
		paddingTop: 50,
		backgroundColor: "#fcb559",
		width: "100%",
		height: 100,

		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	button: {
		width: 150,
	},

	fortune: {
		alignItems: "center"
	},
	fortuneImage: {
		width: 380,
		height: 250,
		marginBottom: 20,
	},
	cookieText: {
		fontSize: 20,
		padding: 20,
		textAlign: "center",
	},

	footer: {
		padding: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fcb559",
		width: "100%",
	},
	footerText: {
		fontSize: 25,
		textAlign: "center",
		marginTop: 10,
	}
});



const fortunes = [
	"Kdo se bojí smrti, už přišel o život.",
	"Ti, kteří přemýšlejí o nepohodlí povinnosti jsou zbabělci.",
	"I tisícimílová cesta začíná prvním krokem.",
	"V trpělivosti a harmonii je skutečná síla.",
	"Když se tě ptají, neprozradíš nic, ale sám od sebe řekneš vše.",
	"Výchova znamená více než původ.",
	"Trpělivost je nejdůležitější vlastnost.",
	"Letní oblohou a lidským srdcem se nikdy nemůžeš být jist.",
	"Lezeš-li vysoko, začni lézt odzdola.",
	"Prostořekost, toť pramen mnoha neshod.",
	"Neptej se na věk, ptej se na zkušenosti.",
	"Co bys rád řekl dnes, řekni raději zítra.",
	"Štěstí přichází tam, kde nechybí smích.",
	"I v pokoji o tisíci rohožích potřebuješ k přespání jen jednu rohož.",
	"Kdo se směje, místo aby zuřil, je vždycky silnější.",
	"Peníze si zamykej, ženu ne!",
	"Jednou sám vidět je lepší než stokrát slyšet.",
	"Zbytečná věc - zbytečná starost.",
	"Nahatí nic neztratí.",
	"Mnozí přátelé se nehodí ani k pití čaje.",
	"Ani nejlepší sokol ničeho neuloví, když se mu nedovolí vzlétnout.",
	"Kočka, která často mňouká, chytí málo myší.",
	"Bohatí nejsou milosrdní, a milosrdní nejsou bohatí.",
	"Milované dítě vyprav do světa na zkušenou.",
	"Slibuj pomalu, ale sliby plň hned.",
	"Štěstí se nečekaně samo oznámí.",
	"Lidský život je jako svíčka ve větru.",
	"Zlé skutky se vracejí zpět k tomu, kdo je spáchal.",
	"Kdo dobře zná sám sebe, nebojí se jiných.",
	"Ke mletí potřebuješ kámen, k vydělávání peněz trpělivost."
];