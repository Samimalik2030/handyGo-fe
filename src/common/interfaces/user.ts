export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  profileImage: FileDto | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;

}

export interface FileDto{
  fileId:string
  url:string
}
