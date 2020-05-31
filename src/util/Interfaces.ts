interface IUpdateUserParams {
  email?: string;
  password?: string;
  syncSettings: boolean;
  autoClipboardWrite: boolean;
  autoClipboardRead: boolean;
}

export default IUpdateUserParams;
