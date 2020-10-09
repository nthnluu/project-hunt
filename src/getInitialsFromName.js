export default function (name) {
    if (!name) return null
    const nameArray = name.split(' ')
    if (nameArray.length >= 2) {
        return (nameArray[0])[0] + (nameArray[1])[0]
    } else if (nameArray.length === 1) {
        return (nameArray[0])[0]
    } else {
        return ""
    }
}