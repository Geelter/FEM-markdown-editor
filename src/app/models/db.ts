import Dexie, { Table } from 'dexie';

export interface MarkdownMetadata {
    id: string,
    name: string,
    createdAt: Date
}
export interface MarkdownContent {
    id: string,
    content: string
}

export class MarkdownDB extends Dexie {
    markdownMetadata!: Table<MarkdownMetadata, string>;
    markdownContent!: Table<MarkdownContent, string>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(1).stores({
            markdownMetadata: 'id, name, createdAt',
            markdownContent: 'id, content',
        });
        this.on('populate', () => this.populate());
    }

    async populate() {
      const id = crypto.randomUUID();
        await db.markdownMetadata.bulkAdd([
            {
                id: id,
                name: 'introductory.md',
                createdAt: new Date(),
            },
        ]);
        await db.markdownContent.bulkAdd([
            {
                id: id,
                content: '# Welcome to Markdown\n' +
                  '\n' +
                  'Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n' +
                  '\n' +
                  '## How to use this?\n' +
                  '\n' +
                  '1. Write markdown in the markdown editor window\n' +
                  '2. See the rendered markdown in the preview window\n' +
                  '\n' +
                  '### Features\n' +
                  '\n' +
                  '- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n' +
                  '- Name and save the document to access again later\n' +
                  '- Choose between Light or Dark mode depending on your preference\n' +
                  '\n' +
                  '> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n' +
                  '\n' +
                  '#### Headings\n' +
                  '\n' +
                  'To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You\'ll see in this guide that we\'ve used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n' +
                  '\n' +
                  '##### Lists\n' +
                  '\n' +
                  'You can see examples of ordered and unordered lists above.\n' +
                  '\n' +
                  '###### Code Blocks\n' +
                  '\n' +
                  'This markdown editor allows for inline-code snippets, like this: `<p>I\'m inline</p>`. It also allows for larger code blocks like this:\n' +
                  '\n' +
                  '```\n' +
                  '<main>\n' +
                  '  <h1>This is a larger code block</h1>\n' +
                  '</main>\n' +
                  '```'
            },
        ]);
    }
}

export const db = new MarkdownDB();
