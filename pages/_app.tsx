import Head from 'next/head';
import { PreferencesContextWrapper } from '../components/preferencesContext';
import { SocketContextWrapper } from '../components/socketContext';
import { ToastContextWrapper } from '../components/toast';

import '../styles/disk.css';
import '../styles/footer.css';
import '../styles/global.css';
import '../styles/issues.css';
import '../styles/navbar.css';
import '../styles/notifications.css';
import '../styles/recentGames.css';
import '../styles/themepicker.css';
import '../styles/toast.css';
import '../styles/ui.css';
import '../styles/utility.css';

import '../styles/blog.css';
import '../styles/game.css';
import '../styles/gameSettings.css';
import '../styles/index.css';
import '../styles/loginregister.css';
import '../styles/search.css';
import '../styles/settings.css';
import '../styles/user.css';

export default function VierOpEenRijWebsite({ Component, pageProps }) {
	return <div>
		<Head>
			<title>4 op een rij</title>

			<link rel='stylesheet' href='/font/stylesheet.css' />
			<link rel='stylesheet' id='theme' href='/themes/default.css' />

			<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
			<link rel='icon' href='/favicon.png' type='image/png' />

			<meta property='og:site_name' content='4 op een rij' />
			<meta property='og:url' content='http://connect4.pipeframe.xyz/' />
			<meta property='og:title' content="Loek's epische vier op een rij website" />
			<meta property='og:description' content='Kom vier op een rij spelen NU' />
			<meta property='og:type' content='website' />
			<meta name='og:image' itemProp='image' content='/favicon.png' />
			<meta name='theme-color' content='#e16d82' />
		</Head>
		<PreferencesContextWrapper>
			<ToastContextWrapper>
				<SocketContextWrapper>
					<Component {...pageProps} />
				</SocketContextWrapper>
			</ToastContextWrapper>
		</PreferencesContextWrapper>
	</div>;
}
