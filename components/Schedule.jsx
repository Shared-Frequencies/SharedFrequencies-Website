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
    const heightRef = useRef(null);

    const formattedSchedule = useMemo(
        () => schedule ? Object.values(schedule)
            .flat()
            .splice(0, Object.values(schedule).flat().length - 1) : [],
        [schedule]
    );

    const dates = useMemo(
        () => schedule ? _.map(formattedSchedule, ele => parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').toDateString()) : [],
        [formattedSchedule]
    );

    const times = useMemo(
        () => schedule ? _.map(formattedSchedule, ele =>
            `${parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getHours() % 12 === 0 ? 12 : 
                parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getHours() }:${parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes() < 10 ?
                "0" + parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes():parse(ele.starts, 'YYYY-MM-DD HH:mm:ss').getMinutes()} CST`) : [],
        [formattedSchedule]
    );

    const shows = useMemo(
        () => schedule ? _.map(formattedSchedule, ele => ele.name) : [],
        [formattedSchedule]
    );

    const uniqueDates = useMemo(
        () => _.uniq(dates),
        [dates]
    );

    const zippedDatesShows = useMemo(
        () => _.zip(shows, dates, times),
        [shows, dates, times]
    );

    const shortDates = useMemo(
        () => {
            if (!schedule) return [];
            
            const today = new Date();
            const nextWeek = [];
            
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                nextWeek.push(date.toDateString());
            }
            
            const datesWithContent = nextWeek.filter(date => {
                const dayShows = zippedDatesShows
                    .filter(shows => shows[1] === date)
                    .filter(shows => shows[0] !== "Shared Frequencies Rotation" && shows[0] !== "SFR");
                return dayShows.length > 0;
            });
            
            // Return only the first 3 days with content
            return datesWithContent.slice(0, 3);
        },
        [zippedDatesShows]
    );

    useEffect(() => {
        if(heightRef && heightRef.current && heightRef.current.clientHeight){
            setTimeout(() => {
                setHeight(heightRef.current.clientHeight)
            }, 1000)
        }
    },[size, setHeight]);

    if (!schedule) {
        return (
            <div className={styles.calendarContainer} ref={heightRef}>
                <p className={styles.calendarTitle}> Schedule </p>
                <hr className={styles.horizontalRule} />
                <div className={styles.calendar}>
                    <p>No schedule available at this time.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.calendarContainer} ref={heightRef}>
            <p className={styles.calendarTitle}> Schedule </p>
            <hr className={styles.horizontalRule} />
            <div className={styles.calendar}>
                <ol className={styles.days}>
                    {
                        shortDates.map((day) => {
                            // Filter shows for this day first
                            const dayShows = zippedDatesShows
                                .filter((shows) => shows[1] === day)
                                .filter((shows) => (shows[0] !== "Shared Frequencies Rotation") && (shows[0] !== "SFR"));
                            
                            // Only render the day if it has shows
                            return dayShows.length > 0 ? (
                                <li key={day} className={styles.uniqueDays}>
                                    <b>
                                        {day.toString().slice(0, day.toString().length - 4)}
                                    </b>
                                    <ol className={styles.dailyShows}>
                                        {
                                            dayShows.map((show) => (
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
                            ) : null;
                        })
                    }
                </ol>
            </div>
        </div>
    )
}
