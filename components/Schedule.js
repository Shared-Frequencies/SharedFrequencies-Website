import styles from '../styles/Home.module.css'
import { parse } from 'date-format-parse';

export default function Schedule({schedule}) {
    const formattedSchedule = Object.values(schedule)
        .flat()
        .splice(0, Object.values(schedule).flat().length-1)

    return (
        <div className={styles.calendar}>
            <ol className={styles.names}>
                {formattedSchedule.map((ele) => (
                    <li>
                        {ele.name}
                    </li>
                ))}
            </ol>
            <ol className={styles.dates}>
                {formattedSchedule.map((ele) => (
                    <li>
                        {parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').toDateString()}
                    </li>
                ))}
            </ol>
        </div>
    )
}
