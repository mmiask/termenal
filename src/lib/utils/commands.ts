import { outputHistory } from '$lib/stores/outputHistory';

export const commands: Record<
	string,
	(args: string[]) => Promise<string | string[]> | string | string[]
> = {
	help: function () {
		return ['<div style="color: red">Available commands:</div>', ...Object.keys(commands)];
	},
	about: function () {
		return 'Michał Miąskowski, software developer';
	},
	joke: function () {
		return "Vim is for people who don't want to learn keyboard shortcuts in a normal IDE";
	},
	clear: () => {
		outputHistory.set([]);

		return '';
	},
	welcome: function () {
		return "Type 'help' to see list of available commands.";
	}
};
