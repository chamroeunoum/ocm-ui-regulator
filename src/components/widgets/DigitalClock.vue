<template>
    <!-- Start Widget -->
    <div class="digital-clock ">
        <p class="time">{{ clock.time }}</p>
    </div>
    <!-- End widget -->
</template>
<script>
import { ref, reactive, computed } from 'vue'
export default {
    props: [
        'size'
    ],
    components: {
        
    },
    setup(){
        const clock = reactive({
            time: '',
            date: ''
        })

        const week = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ៍', 'ពុធ', 'ព្រហស្បត៍', 'សុក្រ', 'សៅរ៍'];
        const timerID = setInterval(updateTime, 1000);

        function updateTime() {
            var cd = new Date();
            clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        };

        function zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }

        updateTime()

        return {
            clock ,
            updateTime ,
            zeroPadding
        };
    },
    data() {
        return {
            icon: {
                size: this.size
            }
        }
    },
    computed: {

    },
    mounted() {
        
    },
    methods: {
        /** Get total documents of the user */
    },
}
</script>
<style scoped >
    .digital-clock {
        @apply border border-gray-400 py-2 px-4 rounded-lg bg-gray-200;
    }
    .time {
        @apply text-xl font-bold text-gray-700 ;
    }
</style>