<script>
    import SveltyPicker, { formatDate } from 'svelty-picker';
    import { en } from 'svelty-picker/i18n';


    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    console.log(endDate);
    
    function disableWeekends(date) {
        const boo = [];
        for (const item of blocked) {
            // console.log(item);
            boo.push(item.name)
        }
 
        date = formatDate(date, 'yyyy-mm-dd', en, 'standard');
        console.log(date);
        return boo.includes(date);
    }
    export let data;
    let blocked = [...data.countries];
    console.log(blocked)
</script>

<ul>
    {#each data.countries as country}
        <li>{country.name}</li>
    {/each}
</ul>
<SveltyPicker 
    isRange 
    startDate={String(new Date())}
    endDate={endDate} 
    todayBtn={false} 
    disableDatesFn={disableWeekends}
    autocommit={false}

/>