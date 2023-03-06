// vietnamese's phone number

const isVnPhonenumber = (number) => {
  try {
    const phoneVnRegex = /^(?:(\+84)|0)(?:\d){8,9}$/

    return phoneVnRegex.test(number)
  } catch (e) {
    console.log(e)
    return false
  }
}

export default isVnPhonenumber