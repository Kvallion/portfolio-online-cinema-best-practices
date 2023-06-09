import Head from "next/head"
import Favicons from "./FavIcons"

const CommonHead: React.FC = () => {
	return (
		<Head>
			<meta charSet="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=5.0"
			/>

			<Favicons />

			<meta name="theme-color" content={"#181B1E"} />
			<meta name="msapplication-navbutton-color" content={"#181B1E"} />
			<meta
				name="apple-mobile-web-app-status-bar-style"
				content={"#181B1E"}
			/>

			<link rel="manifest" href="/manifest.json" />
		</Head>
	)
}

export { CommonHead }
