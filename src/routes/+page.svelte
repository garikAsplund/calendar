<script>
    import AirDatepicker from 'air-datepicker';
    import localeEn from 'air-datepicker/locale/en';
    import 'air-datepicker/air-datepicker.css';
    import isWithinInterval  from 'date-fns/isWithinInterval';
    import isEqual  from 'date-fns/isEqual';
    import { afterUpdate, onMount } from 'svelte';

    const disabledDate = new Date('2023-11-13T00:00:00');

    // Check if disabled date is in the range
    const isDisabledDateIsInRange = ({date, datepicker}) => {
        const selectedDate = datepicker.selectedDates[0];
        if (selectedDate && datepicker.selectedDates.length === 1) {
            const sortedDates = [selectedDate, date].toSorted((a, b) => {
                if (a.getTime() > b.getTime()) {
                    return 1;
                }
                return -1;
            })

            return (isWithinInterval(disabledDate, {
                start: sortedDates[0],
                end: sortedDates[1]
            }))
        }
    }

    afterUpdate(() => {
        new AirDatepicker('#calendar', {
            locale: localeEn,
            inline: true,
            selectedDates: [new Date()],
            range: true,
            multipleDatesSeparator: ' - ',
            navTitles: {
                days: '<strong>MMMM</strong> <i>yyyy</i>',
                months: 'Select month of <strong>yyyy</strong>'    
            },
            minDate: new Date(),
            onBeforeSelect: ({date, datepicker}) => {
                // Dont allow user to select date, if disabled date is in the range
                return !isDisabledDateIsInRange({date, datepicker});
            },
            onFocus: ({date, datepicker}) => {
                console.log("onFocus");
                if (isDisabledDateIsInRange({date, datepicker}) || isEqual(date, disabledDate)) {
                datepicker.$datepicker.classList.add('-disabled-range-')
                console.log(`${datepicker.$datepicker.classList}`);
                } else {
                datepicker.$datepicker.classList.remove('-disabled-range-')
                console.log(`${datepicker.$datepicker.classList}`);
                }
            },
            onRenderCell: ({date}) => {
                if (date.toLocaleDateString() === disabledDate.toLocaleDateString()) {
                    return {
                        disabled: true
                    }
                }
            }
        })
    });
    export let data;
</script>

<ul>
    {#each data.countries as country}
        <li>{country.name}</li>
    {/each}
</ul>

<div id="calendar"></div>

<style>
    .air-datepicker.-disabled-range- {
        --adp-cell-background-color-in-range: #eeeeee;
        --adp-cell-background-color-selected: #d0d0d0;
    }

    #calendar {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
