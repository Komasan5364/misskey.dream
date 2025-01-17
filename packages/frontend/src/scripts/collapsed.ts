/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as Misskey from 'misskey-js';

const scaleRegex = /\$\[scale\.(([xy]=[2345](\.\d)*){1}|([xy]=[12345](\.\d)*){1}(,[xy]=[2345](\.\d)*){1})/;

export function shouldCollapsed(note: Misskey.entities.Note, urls: string[]): boolean {
	const collapsed = note.cw == null && (
		note.text != null && (
			(note.text.includes('$[x3')) ||
			(note.text.includes('$[x4')) ||
			(scaleRegex.test(note.text)) ||
			(note.text.split('\n').length > 9) ||
			(note.text.length > 500) ||
			(urls.length >= 4)
		) || note.files.length >= 5
	);

	return collapsed;
}
