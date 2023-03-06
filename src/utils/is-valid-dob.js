const isValidDob = (dateOfBirth) => {
  try {
    if (isNaN(Date.parse(dateOfBirth))) {
      return false;
    }

    const dobComponents = dateOfBirth.split('-')
    const year = parseInt(dobComponents[0])
    const month = parseInt(dobComponents[1])
    const day = parseInt(dobComponents[2])

    const now = new Date()
    const age = now.getFullYear() - year - ((now.getMonth() < month || (now.getMonth() === month && now.getDate() < day)) ? 1 : 0)
    return age > 0
  } catch (error) {
    console.log(error);
  }
}

export default isValidDob