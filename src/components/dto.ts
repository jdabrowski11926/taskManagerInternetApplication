export default interface User {
  id: number;
  username: string;
  password: string;
}

export default interface Category {
  id: number;
  name: string;
  description: string;
  user: User;
}

export default interface Task {
  id: number;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  active: boolean;
  notification: boolean;
}

export default interface UserEditPassword {
  oldPassword: string;
  newPassword: string;
}
