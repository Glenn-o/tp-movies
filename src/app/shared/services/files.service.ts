import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, from } from "rxjs";
import { FileUpload } from "src/app/models/file-upload.model";
import { User } from "./users.service";

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private readonly db: AngularFirestore, private readonly storage: AngularFireStorage) {}

  uploadFile(fileUpload: FileUpload, user: User) {
    const filePath = `/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, user);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  saveFileData(file: FileUpload, user: User) {
    from(this.db.collection<User>('users').doc(user.userId).update({ avatar: file.url }))
  }
}
