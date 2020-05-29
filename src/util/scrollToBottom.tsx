const scrollToBottom = () => {
  const pasteList = document.querySelector("#paste-list")
  pasteList.scrollTo({ top: pasteList.scrollHeight, behavior: "smooth" });
};

export default scrollToBottom;
