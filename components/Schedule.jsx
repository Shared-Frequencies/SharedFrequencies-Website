import styles from '../styles/Home.module.css';
import { parse } from 'date-format-parse';
import {decode} from 'html-entities';
import _ from 'lodash';
import {useContext, useEffect, useMemo, useRef} from "react";
import HeightContext from "./HeightProvider";
import {useWindowSize} from "./TwitchVideo";

export default function Schedule({schedule}) {
    const {setHeight} = useContext(HeightContext);

    const size = useWindowSize();

    const heightRef = useRef(null)

    const formattedSchedule = useMemo(
        () => Object.values(schedule)
            .flat()
            .splice(0, Object.values(schedule).flat().length - 1),
        [schedule]
    )

    const dates = useMemo(
        () => _.map(formattedSchedule, ele => parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').toDateString()),
        [formattedSchedule]
    )

    const times = useMemo(
        () =>  _.map(formattedSchedule, ele =>
            `${parse(ele.starts, 'YYYY-MM-DD hh:mm:ss').getHours()}:${parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes() < 10 ?
            "0" + parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes(): parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes()} CST`),
        [formattedSchedule]
    )

    const shows = useMemo(
        () => _.map(formattedSchedule, ele => ele.name),
        [formattedSchedule]
    )

    const uniqueDates = useMemo(
        () => _.uniq(dates),
        [dates]
    )

    const zippedDatesShows = useMemo(
        () => _.zip(shows, dates, times),
        [shows, dates, times]
    )

    const today = new Date().getDay()

    const shortDates = useMemo(
        () => uniqueDates.slice(today - 1 === -1 ? 7 : today - 1, today -1 === -1 ? 13 : today + 3),
        [uniqueDates, today]
    )

    useEffect(() => {
        if(heightRef.current.clientHeight){
            setTimeout(() => {
                setHeight(heightRef.current.clientHeight)
            }, 1000)
        }
    },[size, setHeight])

    return (
        <div className={styles.calendarContainer} ref={heightRef}>
            <p className={styles.calendarTitle}> Schedule </p>
            <hr className={styles.horizontalRule}/>
            <div className={styles.calendar}>
                <ol className={styles.days}>
                    {
                        shortDates.map((day) => (
                            <li key={day} className={styles.uniqueDays}>
                                <b>
                                    {day.toString().slice(0, day.toString().length - 4)}
                                </b>
                                <ol className={styles.dailyShows}>
                                    {
                                        zippedDatesShows
                                            .filter((shows) => shows[1] === day)
                                            .map((show) => (
                                                <li key={show} className={styles.show}>
                                                    <div className={styles.names}>
                                                        {decode(show[0])}
                                                    </div>
                                                    <div className={styles.times}>
                                                        {show[2]}
                                                    </div>
                                                </li>
                                            ))
                                    }
                                </ol>
                                <br/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}
