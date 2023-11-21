export interface MarkdownFile {
  name: string,
  content: string,
  id: string,
  createdAt: Date,
}

export type MarkdownFileMetadata = Omit<MarkdownFile, "content">;

export type MarkdownFileContent = Pick<MarkdownFile, "id" | "content">;
