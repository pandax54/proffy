// aula 02 1:44:00
export default function convertHourToMinute(time: string) {
    // 8:00
    // Number -> converte string em number
    // const array = time.split(':').map(Number)
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes; // total in minutes

    return timeInMinutes

}