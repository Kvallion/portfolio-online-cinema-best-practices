import { CommonHead, store } from "application"
import NextProgressBar from "application/components/NextProgressBar"
import ReduxToast from "application/components/ReduxToast"
import { Provider } from "react-redux"
import "./globals.css"

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<CommonHead />
			<body>
				<NextProgressBar />
				<Provider store={store}>
					<ReduxToast />
					{children}
				</Provider>
			</body>
		</html>
	)
}
