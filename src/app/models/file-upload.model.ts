export class FileUpload {
  name = '';
  url = '';
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
