export interface userInfo {
	avatar: string | null;
	status: string | null;
	coutry: string | null;
	id: string;
	registered: number;
	username: string;
	friends: number;
	relation?: 'none' | 'friends' | 'incoming' | 'outgoing' | 'blocked';
	rating: number;
	email?: string;
}

export type ruleset = {
	timelimit: {
		enabled: boolean;
		minutes: number;
		seconds: number;
		addmove: number;
		shared: boolean;
	};
	ranked: boolean;
};

export type userColors = {
	diskA: string;
	diskB: string;
};

export interface userPreferences {
	darkMode?: boolean;
	ruleset?: ruleset;
	userColors?: userColors;
	theme?: string;
}

export interface userGameTotals {
	draw: number;
	games: number;
	lose: number;
	win: number;
}

export type outcome = 'w' | 'l' | 'd';

export interface userGames {
	totals: userGameTotals;
	games: Array<gameInfo>;
}

export interface gameInfo {
	created: number;
	duration: number;
	id: string;
	moves: Array<number>;
	opponent?: userInfo;
	outcome: outcome;
	parent?: string;
	private: boolean;
	rating?: number;
	rating_opponent?: number;
	ruleset: ruleset;
	started: number;
	status: 'finished' | 'in_progress' | 'resign' | 'wait_for_opponent';
}

export interface serverStatus {
	games: number;
	version: {
		commit: string;
		commit_short: string;
		number: string;
	};
}
