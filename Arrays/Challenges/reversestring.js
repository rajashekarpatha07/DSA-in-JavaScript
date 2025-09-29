function reverse(string) {
  let rev = "";
  for (let i = string.length - 1; i >= 0; i--) {
    rev += string[i]
  }
  return rev
}

console.log(reverse("Hello"))
