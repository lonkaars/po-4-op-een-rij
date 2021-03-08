import { Component, CSSProperties, ReactNode } from "react";

import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

export function Vierkant(props: {
	href?: string;
	width?: string;
	height?: string;
	style?: CSSProperties;
	children?: ReactNode;
	className?: string;
	id?: string;
	fullwidth?: boolean;
	onclick?: () => void;
}) {
	return <a style={{
		padding: 24,
		backgroundColor: "var(--background)",
		borderRadius: 8,
		color: "var(--text)",
		margin: 6, // geen margin collapse = 12px marge
		display: "inline-block",
		position: "relative",
		boxSizing: "border-box",
		width:
			props.width ? props.width :
			props.fullwidth ? "calc(100% - 12px)" :
			undefined,
		height: props.height ? props.height : undefined,
		...props.style
	}}
	href={props.href}
	className={props.className}
	id={props.id}
	onClick={props.onclick}
	>{props.children}</a>
}

export function Button(props: {
	text?: string;
	children?: ReactNode;
	style?: CSSProperties;
	href?: string;
	onclick?: (() => void);
	id?: string;
}) {
	return <a onClick={props.onclick} href={props.href} id={props.id} style={{
		padding: props.text ? 8 : 16,
		textAlign: props.text ? "center" : "left",
		borderRadius: 8,
		backgroundColor: "var(--disk-a)",
		cursor: "pointer",
		position: "relative",
		textDecoration: "none",
		display: "block",
		...props.style
	}}>
	{ 
		props.text ?
			<span style={{
				fontWeight: 600,
				userSelect: "none"
			}}>{props.text}</span>
			: undefined
	}
	{ props.children }
	</a>;
}

export function IconLabelButton(props: {
	text: string;
	icon: ReactNode;
	onclick?: () => void;
	style?: CSSProperties;
}) {
	return <Button onclick={props.onclick} style={{
		display: "inline-block",
		verticalAlign: "top",
		padding: 8,
		float: "right",
		marginLeft: 12,
		...props.style
	}}>
		{props.icon}
		<span style={{
			display: "inline-block",
			verticalAlign: "top",
			fontWeight: 500,
			marginLeft: 8,
			marginTop: 3, marginBottom: 3, marginRight: 3
		}}>{props.text}</span>
	</Button>
}

export function Input(props: {
	label?: string;
	style?: CSSProperties;
	type?: string;
	id?: string;
	min?: number;
	max?: number;
	value?: string|number;
	dark?: boolean;
	autocomplete?: string;
}) {
	return <input
	id={props.id}
	type={props.type || "text"}
	min={props.min} max={props.max}
	placeholder={props.label}
	spellCheck={false}
	defaultValue={props.value ? String(props.value) : ""}
	className={props.dark ? "dark" : "light"}
	autoComplete={props.autocomplete}
	style={{
		padding: 12,
		border: 0,
		width: "calc(100% - 24px)",
		fontSize: 14,
		backgroundColor: "var(--page-background)",
		color: "var(--text-alt)",
		borderRadius: 8,
		fontFamily: "Inter",
		...props.style
	}}/>
}

export function SearchBar(props: { label?: string }) {
	return <div style={{
		marginTop: 24,
		borderRadius: 8,
		overflow: "hidden",
		width: "100%"
	}}>
		<Input label={props.label} style={{
			width: "calc(100% - 24px - 41px)",
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0
		}}/>
		<div style={{
			width: 41,
			height: 41,
			backgroundColor: "var(--disk-a)",
			display: "inline-block",
			verticalAlign: "top",
			position: "relative"
		}}>
			<SearchIcon style={{
				position: "absolute",
				top: "50%", left: "50%",
				transform: "translate(-50%, -50%)"
			}}/>
		</div>
	</div>
}

export class CheckBox extends Component<{
	state?: boolean;
	style?: CSSProperties;
	id?: string;
	onclick?: (state: boolean) => void;
}> {
	state = { on: this.props.state || false }
	public toggle = () => {
		this.setState({ on: !this.state.on });
		this.props.onclick && this.props.onclick(!this.state.on);
	}

	render() {
		return <div onClick={this.toggle} id={this.props.id} className={this.state.on ? "on" : "off"} style={{
			...this.props.style,
			display: "inline-block",
			cursor: "pointer"
		}}>
		{
			this.state.on ?
			<CheckBoxIcon/> :
			<CheckBoxOutlineBlankIcon/>
		}
		</div>;
	}
}

export class ColorPicker extends Component<{
	style?: CSSProperties;
}> {
	state: {
		color: string;
		dark: boolean;
	} = {
		color: "#012345",
		dark: true
	}

	render() {
		return <Button style={{
			display: "inline-block",
			verticalAlign: "top",
			padding: 6,
			float: "right",
			marginLeft: 12,
			color: this.state.dark ? "var(--text)" : "var(--text-alt)",
			borderColor: this.state.dark ? "var(--text)" : "var(--text-alt)",
			borderWidth: 2,
			borderStyle: "solid",
			backgroundColor: this.state.color,
			...this.props.style
		}}>
			<div>
				<EditOutlinedIcon/>
				<div style={{
					width: 150,
					height: 24,
					display: "inline-block",
					textAlign: "center",
					verticalAlign: "top",
					position: "relative"
				}}>
					<span style={{
						position: "absolute",
						top: "50%", left: "50%",
						transform: "translate(-50%, -50%)",
						fontWeight: 600,
						fontFeatureSettings: '"tnum", "ss01"'
					}}>{this.state.color}</span>
				</div>
			</div>
		</Button>
	}
}

