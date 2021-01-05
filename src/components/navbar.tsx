import {CSSProperties} from "react";

import { LogoDark } from "../components/logo";

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


var NavBarStyle: CSSProperties = {
	width: 48,
	height: "100%",

	lineHeight: 0,

	backgroundColor: "var(--background)",
	display: "inline-block",

	position: "fixed",
	top: 0,
	left: 0,

	overflow: "hidden",
	whiteSpace: "nowrap",
}

var NavBarItemStyle: CSSProperties = {
	margin: 12,
	marginBottom: 16,
	display: "block"
}

var NavBarSettingsAreaStyle: CSSProperties = {
	position: "absolute",
	bottom: -4,
	left: 0
}

export function NavBar() {
	return (
		<div className="navbar" style={NavBarStyle}>
			<div style={NavBarItemStyle}><LogoDark/></div>
			<a href="/" style={NavBarItemStyle}><Home/></a>
			<a href="/" style={NavBarItemStyle}><VideogameAssetIcon/></a>
			<a href="/" style={NavBarItemStyle}><ExtensionIcon/></a>
			<a href="/" style={NavBarItemStyle}><SearchIcon/></a>

			<div style={NavBarSettingsAreaStyle}>
				<a href="/" style={NavBarItemStyle}><SettingsIcon/></a>
			</div>
		</div>
	);
}
