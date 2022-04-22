var app = new Vue ( {
    el: '#app', 
    data: {
        today: this.formatDate,
        events: [
            {
              title: 'Vacation',
              details: 'Going to the beach!',
              date: '2019-07-30',
              open: false
            },
            {
              title: 'Vacation',
              details: 'Going to the beach!',
              date: '2019-07-31',
              open: false
            },
            {
              title: 'Vacation',
              details: 'Going to the beach!',
              date: '2019-07-01',
              open: false
            },
            {
              title: 'Meeting',
              details: 'Spending time on how we do not have enough time',
              date: '2019-07-07',
              open: false
            },
            {
              title: '30th Birthday',
              details: 'Celebrate responsibly',
              date: '2019-07-03',
              open: false
            },
            {
              title: 'New Year',
              details: 'Eat chocolate until you pass out',
              date: '2019-07-01',
              open: false
            },
            {
              title: 'Conference',
              details: 'Mute myself the whole time and wonder why I am on this call',
              date: '2019-07-21',
              open: false
            },
            {
              title: 'Hackathon',
              details: 'Code like there is no tommorrow',
              date: '2019-07-01',
              open: false
            }
          ]
    },
    
    methods: {
        open: function (event) {
        alert(event.title)
      },
        formatDate: function() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        },
        
    },
    computed: {
        eventsMap: function () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      },
        
    },
    
})