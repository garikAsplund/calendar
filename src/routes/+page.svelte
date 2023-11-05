<script>
    import SveltyPicker, { formatDate } from 'svelty-picker';
    import { en } from 'svelty-picker/i18n';
    // import { supabase } from '$lib/supabaseClient';

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
    let value;
    function handleSubmit() {
        // Convert dates to ISO strings before inserting into the database
        const formattedStartDate = String(value).split(',')[0];
        const formattedEndDate = String(value).split(',')[1];

        console.log(formattedStartDate, formattedEndDate);

        // Insert dates into your Supabase table
        supabase.from('countries').insert([
            { start_date: formattedStartDate, end_date: formattedEndDate }
        ]).then(response => {
            console.log('Dates inserted successfully:', response.data);
        }).catch(error => {
            console.error('Error inserting dates:', error);
        });
    }
</script>

<ul>
    {#each data.countries as country}
        <li>{country.name}</li>
    {/each}
</ul>
<form on:submit|preventDefault={handleSubmit}>
    <SveltyPicker 
    isRange 
    pickerOnly
    startDate={String(new Date())}
    endDate={endDate} 
    todayBtn={false} 
    disableDatesFn={disableWeekends}
    autocommit={false}
    displayFormat="dd M yyyy"
    bind:value
    />
    <br>
    <button style="width: 33rem; height: 2rem; margin: 1rem" type="submit">Submit dates</button>
</form>
<br>
{value}
