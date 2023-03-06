const emailValidate = (email) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
  } catch (e) {
    console.log(e);
    return false
  }
}

export default emailValidate