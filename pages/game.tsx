import { CSSProperties, Component } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { userInfo } from '../api/api';
import * as cookies from 'react-cookies';

var socket = io("http://localhost:2080/api/game/socket/");

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { VoerBord } from '../components/voerBord';
import { DialogBox } from '../components/dialogBox';
import { CurrentGameSettings } from '../components/gameSettings';
import { Button, SearchBar } from '../components/ui';
import { GameBar } from '../components/gameBar';

import WifiTetheringRoundedIcon from '@material-ui/icons/WifiTetheringRounded';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';

var InviteButtonStyle: CSSProperties = {
	backgroundColor: "var(--page-background)",
	height: 160,
	padding: 12
}

var InviteButtonIconStyle: CSSProperties = {
	fontSize: 100,
	position: "absolute",
	top: 12,
	left: "50%",
	transform: "translateX(-50%)"
}

var InviteButtonLabelStyle: CSSProperties = {
	position: "absolute",
	bottom: 12,
	left: "50%",
	transform: "translateX(-50%)",
	textAlign: "center",
	color: "var(--text-alt)",
	width: 136,
	fontSize: 20,
	userSelect: "none"
}

interface VoerGameProps {

}

class VoerGame extends Component<VoerGameProps> {
	constructor(props: VoerGameProps) {
		super(props);
	}

	board = [...Array(7 * 6)].map(() => 0);
	userID = "";

	move(column: number) {
		console.log(column)
		if(this.userID == "") {
			axios.request<userInfo>({
				method: "get",
				url: `/api/user/info`,
				headers: {"content-type": "application/json"}
			})
			.then(request => this.setState({ userID: request.data.id }))
			.catch(() => {});
		}
		socket.emit("new_move", {
			move: column,
			token: cookies.load("token"),
			gameID: "fortnite"
		})
	}

	render() {
		return <div style={{
			position: "relative",
			top: "50%",
			transform: "translateY(-50%)",
			maxWidth: "100vh",
			margin: "0 auto"
		}}>
			<VoerBord width={7} height={6} onMove={m => this.move(Number(m))}/>
			<GameBar/>
		</div>
	}
}

export default function GamePage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={900} style={{ height: "100vh" }}>
				<VoerGame/>
				{false && <DialogBox title="Nieuw spel">
					<CurrentGameSettings/>
					<div style={{
						marginTop: 24,
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridGap: 24
					}}>
						<Button style={InviteButtonStyle}>
							<WifiTetheringRoundedIcon style={{
								color: "var(--disk-b)",
								...InviteButtonIconStyle
							}}/>
							<h2 style={InviteButtonLabelStyle}>Willekeurige speler</h2>
						</Button>
						<Button style={InviteButtonStyle}>
							<LinkRoundedIcon style={{
								color: "var(--disk-a)",
								...InviteButtonIconStyle
							}}/>
							<h2 style={InviteButtonLabelStyle}>Uitnodigen via link</h2>
						</Button>
					</div>
					<SearchBar label="Zoeken in vriendenlijst"/>
				</DialogBox>}
			</CenteredPage>
		</div>
	);
}

