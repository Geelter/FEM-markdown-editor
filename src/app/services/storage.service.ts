import { Injectable } from '@angular/core';
import { liveQuery } from "dexie";
import { db } from "../models/db";
import {BehaviorSubject, from, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private currentFileID = new BehaviorSubject<string | undefined>(undefined);
  private currentFileID$ = this.currentFileID.asObservable();

  currentFileName = new BehaviorSubject<string | undefined>(undefined);
  currentFileContent = new BehaviorSubject<string | undefined>(undefined);

  markdownAllMetadata$ = from(liveQuery(
      () => db.markdownMetadata.toArray()
  ));

  currentFileContent$ = this.currentFileID$.pipe(
      switchMap(id =>
          from(liveQuery(() => db.markdownContent
              .get(id ?? '')
          ))
      ),
      tap(content => this.currentFileContent.next(content?.content))
  );

  currentFileMetadata$ = this.currentFileID$.pipe(
      switchMap(id =>
          from(liveQuery(() => db.markdownMetadata
              .get(id ?? '')
          ))
      ),
      tap(meta => this.currentFileName.next(meta?.name))
  );

  changeCurrentFile(id: string | undefined = undefined) {
    this.currentFileID.next(id);
  }

  async createFile(
      markdownMetadata: { id: string; name: string; createdAt: Date },
      markdownContent: { id: string; content: string }
  ): Promise<void> {
    await db.markdownMetadata.put(markdownMetadata);
    await db.markdownContent.put(markdownContent);

    this.currentFileID.next(markdownMetadata.id);
  }

  async updateCurrentFile(): Promise<void> {
      await this.updateCurrentMetadata();
      await this.updateCurrentContent();
  }

  async updateCurrentMetadata() {
    if (!this.currentFileID.value) return;
    if (this.currentFileName.value == undefined) return;

    const id = this.currentFileID.value;
    const name = this.currentFileName.value;

    await db.markdownMetadata.update(id, { name });
  }

  async updateCurrentContent() {
    if (!this.currentFileID.value) return;
    if (this.currentFileContent.value == undefined) return;

    const id = this.currentFileID.value;
    const content = this.currentFileContent.value;

    await db.markdownContent.update(id, { content });
  }

  async deleteCurrentFile(): Promise<void> {
      if (!this.currentFileID.value) return;

      const id = this.currentFileID.value;

      try {
          await db.markdownMetadata.delete(id);
          await db.markdownContent.delete(id);
          this.currentFileID.next(undefined);
      } catch {
          alert('Error deleting file');
      }
  }
}
