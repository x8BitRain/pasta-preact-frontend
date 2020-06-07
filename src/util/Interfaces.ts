interface IUpdateUserParams {
  email?: string;
  password?: string;
  syncSettings: boolean;
  autoClipboardWrite: boolean;
  autoClipboardRead: boolean;
  clickableLinks: boolean;
}

export default IUpdateUserParams;
