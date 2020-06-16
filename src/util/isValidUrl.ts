// OFFLOAD TO BACKEND

const isValidUrl = (string: string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}

export default isValidUrl;
