export class FileUpload {
  name = '';
  url = '';
  file: File | null;

  constructor(file: File | null) {
    this.file = file;
  }
}
