
export default function formatTime(time) {
    const mins = Math.floor(time / 60);
        let secs = time % 60;
        if (secs < 10) {
            secs = '0' + secs;
        }
        return `${mins}:${secs}`;
}